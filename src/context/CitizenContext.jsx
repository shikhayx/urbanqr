import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockComplaints, mockAssets, mockCitizenProfile } from '../data/citizenData';
import { mockWorkers, mockOfficerProfile, mockAdminStats } from '../data/adminData';
import { assetApi, complaintApi, workerApi, healthApi } from '../services/api';

const CitizenContext = createContext();

export function CitizenProvider({ children }) {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [assets, setAssets] = useState(mockAssets);
  const [workers, setWorkers] = useState(mockWorkers);
  const [officerProfile, setOfficerProfile] = useState(mockOfficerProfile);
  const [citizenProfile, setCitizenProfile] = useState(mockCitizenProfile);
  const [adminStats, setAdminStats] = useState(mockAdminStats);
  const [userConfirmedComplaints, setUserConfirmedComplaints] = useState(new Set());
  
  // API loading & connectivity states
  const [isLoading, setIsLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Initial fetch from MongoDB backend API
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        // 1. Check health
        await healthApi.check();
        setBackendConnected(true);

        // 2. Fetch assets
        const assetsRes = await assetApi.getAssets();
        if (assetsRes?.data && assetsRes.data.length > 0) {
          // Merge API assets with telemetry formatting
          const formatted = assetsRes.data.map(a => ({
            id: a.assetId,
            name: `${a.type} #${a.assetId}`,
            type: a.type,
            category: getCategoryForType(a.type),
            location: a.location,
            ward: 'Ward 12 - Mira Bhayandar',
            department: getDepartmentForType(a.type),
            status: a.status,
            statusColor: a.status === 'Operational' ? 'emerald' : 'amber',
            lastMaintenance: a.installationDate ? new Date(a.installationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent',
            installationDate: a.installationDate,
            coordinates: `${a.latitude || 19.2812}° N, ${a.longitude || 72.8561}° E`,
            qrCodeString: `https://urbanqr.gov.in/asset/${a.assetId}`,
            healthScore: a.status === 'Operational' ? 95 : 55,
            activeComplaintId: null,
            specifications: [
              { label: 'Asset ID', value: a.assetId },
              { label: 'GPS Latitude', value: `${a.latitude || 19.2812}° N` },
              { label: 'GPS Longitude', value: `${a.longitude || 72.8561}° E` },
              { label: 'Responsible Dept', value: getDepartmentForType(a.type) },
            ],
            recentComplaints: []
          }));
          
          // Combine API assets with fallback defaults
          setAssets(prev => {
            const apiIds = new Set(formatted.map(f => f.id));
            const remaining = prev.filter(p => !apiIds.has(p.id));
            return [...formatted, ...remaining];
          });
        }

        // 3. Fetch complaints
        const complaintsRes = await complaintApi.getComplaints();
        if (complaintsRes?.data && complaintsRes.data.length > 0) {
          const apiComplaints = complaintsRes.data.map(c => ({
            id: c.complaintId,
            assetId: c.assetId,
            assetName: `${c.issueType} on ${c.assetId}`,
            assetCategory: 'Civic Utility',
            assetType: 'Urban Asset',
            location: 'Mira Road, Ward 12',
            ward: 'Ward 12 - Mira Bhayandar',
            department: 'Municipal Division',
            issue: c.issueType,
            issueCategory: c.issueType,
            description: c.description,
            reportedBy: 'Citizen',
            reportedContact: '+91 98200 •••••',
            reportedDate: new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: c.status,
            priority: c.priority,
            confirmations: c.confirmations || 1,
            assignedWorker: c.assignedWorker || null,
            estimatedResolution: 'Within 4 Hours (SLA Active)',
            slaTimeRemaining: c.status === 'Resolved' ? 'Closed' : '2h 15m remaining',
            photoUrl: c.photo || 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
            resolvedPhotoUrl: c.status === 'Resolved' ? 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' : null,
            timeline: [
              { stage: 'Submitted', title: 'Complaint Registered', subtitle: 'GPS Verified', timestamp: new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true, officer: 'System Auto-Triage', notes: `Asset: ${c.assetId}.` },
              { stage: 'Assigned', title: 'Dispatched to Field Crew', subtitle: c.assignedWorker || 'Pending', timestamp: c.status !== 'Submitted' ? 'Dispatched' : 'Pending', completed: c.status !== 'Submitted', officer: c.assignedWorker || 'Ward Desk', notes: 'Work order allocated.' },
              { stage: 'In Progress', title: 'Field Crew On-Site', subtitle: 'Diagnostics', timestamp: c.status === 'In Progress' || c.status === 'Resolved' ? 'On-Site' : 'Pending', completed: c.status === 'In Progress' || c.status === 'Resolved', officer: c.assignedWorker || 'Field Tech', notes: 'Repair execution.' },
              { stage: 'Resolved', title: 'Resolution Verification', subtitle: 'Photo Proof', timestamp: c.status === 'Resolved' ? 'Closed' : 'Pending', completed: c.status === 'Resolved', officer: 'Supervising Engineer', notes: 'Closed.' },
            ]
          }));

          setComplaints(prev => {
            const apiIds = new Set(apiComplaints.map(a => a.id));
            const remaining = prev.filter(p => !apiIds.has(p.id));
            return [...apiComplaints, ...remaining];
          });
        }

      } catch (err) {
        console.warn('[UrbanQR API Note]: Backend server not currently reachable, running in offline fallback mode.');
        setBackendConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Helper functions
  const getDepartmentForType = (type) => {
    const map = {
      'Streetlight': 'Municipal Electrical Division',
      'Garbage Bin': 'Solid Waste Management',
      'Bus Stop': 'Urban Transport Authority',
      'Public Toilet': 'Public Health Department',
      'Park Equipment': 'Horticulture & Parks Div.',
      'Water Point': 'Water Supply & Sewerage Board',
    };
    return map[type] || 'General Municipal Works';
  };

  const getCategoryForType = (type) => {
    const map = {
      'Streetlight': 'Electrical & Power',
      'Garbage Bin': 'Sanitation',
      'Bus Stop': 'Public Transit',
      'Public Toilet': 'Public Health',
      'Park Equipment': 'Urban Greenery',
      'Water Point': 'Water & Utilities',
    };
    return map[type] || 'Civic Infrastructure';
  };

  // 1. Admin creates urban asset -> calls POST /api/assets
  const addAsset = async (newAssetData) => {
    const cleanId = newAssetData.id.toUpperCase().trim();
    const assetType = newAssetData.type || 'Streetlight';

    const formattedAsset = {
      id: cleanId,
      name: `${assetType} #${cleanId}`,
      type: assetType,
      category: getCategoryForType(assetType),
      location: newAssetData.location || 'Mira Road, Ward 12',
      ward: newAssetData.area || 'Ward 12 - Mira Bhayandar',
      department: getDepartmentForType(assetType),
      status: newAssetData.status || 'Operational',
      statusColor: newAssetData.status === 'Operational' ? 'emerald' : 'amber',
      lastMaintenance: 'Today (New Install)',
      installationDate: newAssetData.installationDate || '01 Sep 2026',
      coordinates: `${newAssetData.latitude || '19.2812'}° N, ${newAssetData.longitude || '72.8561'}° E`,
      qrCodeString: `https://urbanqr.gov.in/asset/${cleanId}`,
      healthScore: 100,
      activeComplaintId: null,
      specifications: [
        { label: 'Asset ID', value: cleanId },
        { label: 'Area / Zone', value: newAssetData.area || 'Ward 12' },
        { label: 'GPS Latitude', value: `${newAssetData.latitude || '19.2812'}° N` },
        { label: 'GPS Longitude', value: `${newAssetData.longitude || '72.8561'}° E` },
        { label: 'Installation Date', value: newAssetData.installationDate || '01 Sep 2026' },
        { label: 'Department', value: getDepartmentForType(assetType) },
      ],
      recentComplaints: []
    };

    try {
      // Send to Express/MongoDB backend
      await assetApi.createAsset({
        assetId: cleanId,
        type: assetType,
        location: newAssetData.location,
        latitude: Number(newAssetData.latitude) || 19.2812,
        longitude: Number(newAssetData.longitude) || 72.8561,
        status: newAssetData.status || 'Operational',
        installationDate: newAssetData.installationDate,
      });
    } catch (err) {
      console.warn('[Asset API]: Saved locally in state. Backend note:', err.message);
    }

    setAssets([formattedAsset, ...assets]);
    setAdminStats(prev => ({
      ...prev,
      totalAssets: prev.totalAssets + 1,
      assetsTaggedThisMonth: prev.assetsTaggedThisMonth + 1,
    }));

    return formattedAsset;
  };

  // 2. Citizen submits complaint -> calls POST /api/complaints with Duplicate Detection
  const addComplaint = async (newComplaintData) => {
    const cleanAssetId = newComplaintData.assetId.toUpperCase().trim();
    const cleanIssue = newComplaintData.issue || newComplaintData.issueCategory;

    // First, try sending to backend for duplicate detection
    try {
      const apiResponse = await complaintApi.createComplaint({
        assetId: cleanAssetId,
        issueType: cleanIssue,
        description: newComplaintData.description,
        priority: newComplaintData.priority || 'Medium',
        photo: newComplaintData.photoUrl,
      });

      // If backend detected duplicate
      if (apiResponse?.duplicate) {
        const existingId = apiResponse.data?.existingComplaintId;
        const matchingExisting = complaints.find(c => c.id === existingId) || {
          id: existingId,
          assetName: `${cleanIssue} on ${cleanAssetId}`,
          assetId: cleanAssetId,
          issue: cleanIssue,
          status: apiResponse.data?.existingComplaintStatus || 'In Progress',
          confirmations: apiResponse.data?.confirmations || 14,
          location: apiResponse.data?.asset?.location || 'Mira Road, Ward 12',
        };

        return {
          duplicate: true,
          message: apiResponse.message || 'This issue has already been reported.',
          existingComplaint: matchingExisting,
          asset: apiResponse.data?.asset,
        };
      }
    } catch (err) {
      console.warn('[Complaint API Note]: Using internal duplicate detection engine.');
    }

    // Fallback/Local duplicate check
    const activeStatuses = ['Submitted', 'Assigned', 'In Progress'];
    const existingDuplicate = complaints.find(
      c => c.assetId.toUpperCase() === cleanAssetId &&
           activeStatuses.includes(c.status)
    );

    if (existingDuplicate) {
      const asset = assets.find(a => a.id === cleanAssetId) || assets[0];
      return {
        duplicate: true,
        message: 'This issue has already been reported.',
        existingComplaint: existingDuplicate,
        asset: asset,
      };
    }

    // Create new complaint
    const complaintId = `UQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const asset = assets.find(a => a.id === cleanAssetId) || assets[0];

    const newComplaint = {
      id: complaintId,
      assetId: asset.id,
      assetName: asset.name,
      assetCategory: asset.category,
      assetType: asset.type,
      location: asset.location,
      ward: asset.ward,
      department: asset.department,
      issue: cleanIssue || 'Reported Issue',
      issueCategory: newComplaintData.issueCategory || cleanIssue,
      description: newComplaintData.description || 'Citizen reported issue via UrbanQR portal.',
      reportedBy: `${citizenProfile.name}`,
      reportedContact: citizenProfile.phone,
      reportedDate: 'Just now (Today)',
      status: 'Submitted',
      priority: newComplaintData.priority || 'Medium',
      confirmations: 1,
      assignedWorker: null,
      estimatedResolution: 'Within 4 Hours (SLA Active)',
      slaTimeRemaining: '3h 59m remaining',
      photoUrl: newComplaintData.photoUrl || 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
      resolvedPhotoUrl: null,
      timeline: [
        { stage: 'Submitted', title: 'Complaint Registered via QR Scan', subtitle: 'GPS auto-verified', timestamp: 'Just now', completed: true, officer: 'System Auto-Triage', notes: `Asset verified: ${asset.id}.` },
        { stage: 'Assigned', title: `Dispatched to ${asset.department}`, subtitle: 'Pending officer review', timestamp: 'Pending Dispatch', completed: false, officer: 'Ward Dispatch System', notes: 'Automated work order creation.' },
        { stage: 'In Progress', title: 'Field Crew On-Site', subtitle: 'Pending crew dispatch', timestamp: 'Pending', completed: false, officer: 'Pending', notes: 'Technician will update on arrival.' },
        { stage: 'Resolved', title: 'Resolution Verification & Closure', subtitle: 'Mandatory photo proof', timestamp: 'Pending', completed: false, officer: 'Pending', notes: 'SMS notification dispatched upon closure.' }
      ]
    };

    setComplaints([newComplaint, ...complaints]);
    
    setAssets(prev => prev.map(a => {
      if (a.id === asset.id) {
        return {
          ...a,
          status: 'Faulty',
          activeComplaintId: complaintId,
          recentComplaints: [
            { id: complaintId, issue: newComplaint.issue, reportedBy: newComplaint.reportedBy, reportedDate: 'Just now', status: 'Submitted', priority: newComplaint.priority, confirmations: 1 },
            ...a.recentComplaints
          ]
        };
      }
      return a;
    }));

    setCitizenProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalReported: prev.stats.totalReported + 1,
        activeComplaints: prev.stats.activeComplaints + 1,
      }
    }));

    return {
      duplicate: false,
      data: newComplaint,
      message: 'Complaint registered successfully',
    };
  };

  // 3. Citizen confirms existing complaint -> calls POST /api/complaints/:id/confirm
  const confirmComplaint = async (complaintId) => {
    if (userConfirmedComplaints.has(complaintId)) {
      return {
        alreadyConfirmed: true,
        message: 'You have already confirmed this existing complaint.',
      };
    }

    try {
      await complaintApi.confirmComplaint(complaintId, 'citizen-shikha');
    } catch (err) {
      console.warn('[Confirm API]: Synchronized in local context.');
    }

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return { ...c, confirmations: c.confirmations + 1 };
      }
      return c;
    }));

    setUserConfirmedComplaints(new Set([...userConfirmedComplaints, complaintId]));

    setCitizenProfile(prev => ({
      ...prev,
      stats: { ...prev.stats, confirmationsUpvoted: prev.stats.confirmationsUpvoted + 1 }
    }));

    return {
      alreadyConfirmed: false,
      message: 'Complaint confirmed successfully. Community priority elevated.',
    };
  };

  // 4. Officer assigns worker & updates complaint status
  const updateComplaintDetails = async (complaintId, updates) => {
    const { status, workerId, priority, officerNotes } = updates;
    const worker = workers.find(w => w.id === workerId);

    try {
      if (worker) {
        await complaintApi.assignWorker(complaintId, worker.name);
      }
      if (status) {
        await complaintApi.updateStatus(complaintId, status);
      }
    } catch (err) {
      console.warn('[Update Complaint API]: Synced in state.');
    }

    setComplaints(prev => prev.map(comp => {
      if (comp.id === complaintId) {
        const currentStageIndex = ['Submitted', 'Assigned', 'In Progress', 'Resolved'].indexOf(status || comp.status);

        const updatedTimeline = comp.timeline.map((step, idx) => {
          if (idx <= currentStageIndex) {
            return {
              ...step,
              completed: true,
              timestamp: step.timestamp.includes('Pending') ? 'Just now (Updated)' : step.timestamp,
              officer: worker ? `${worker.name} (${worker.role})` : step.officer,
              notes: officerNotes && idx === currentStageIndex ? officerNotes : step.notes
            };
          }
          return { ...step, completed: false };
        });

        return {
          ...comp,
          status: status || comp.status,
          priority: priority || comp.priority,
          assignedWorker: worker ? worker.name : comp.assignedWorker,
          resolvedPhotoUrl: status === 'Resolved' && !comp.resolvedPhotoUrl 
            ? 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' 
            : comp.resolvedPhotoUrl,
          timeline: updatedTimeline,
        };
      }
      return comp;
    }));

    if (workerId) {
      setWorkers(prev => prev.map(w => {
        if (w.id === workerId) {
          return {
            ...w,
            status: status === 'In Progress' ? 'On-Site' : status === 'Assigned' ? 'En Route' : 'Available',
            activeTicketId: status === 'Resolved' ? null : complaintId
          };
        }
        return w;
      }));
    }
  };

  return (
    <CitizenContext.Provider value={{
      complaints,
      assets,
      workers,
      officerProfile,
      citizenProfile,
      adminStats,
      userConfirmedComplaints,
      isLoading,
      backendConnected,
      addAsset,
      addComplaint,
      confirmComplaint,
      updateComplaintDetails,
    }}>
      {children}
    </CitizenContext.Provider>
  );
}

export function useCitizen() {
  const context = useContext(CitizenContext);
  if (!context) {
    throw new Error('useCitizen must be used within a CitizenProvider');
  }
  return context;
}
