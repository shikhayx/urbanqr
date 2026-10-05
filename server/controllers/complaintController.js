import { Complaint } from '../models/Complaint.js';
import { Asset } from '../models/Asset.js';

// @desc    Create a new citizen complaint with Duplicate Complaint Detection
// @route   POST /api/complaints
// @access  Public / Citizen
export const createComplaint = async (req, res, next) => {
  try {
    const { assetId, userId, issueType, description, photo, priority } = req.body;

    if (!assetId || !issueType) {
      res.status(400);
      throw new Error('Please provide assetId and issueType');
    }

    const cleanAssetId = assetId.toUpperCase().trim();
    const cleanIssueType = issueType.trim();

    // 1. Check if an ACTIVE complaint already exists for the same assetId and issueType
    const activeStatuses = ['Submitted', 'Assigned', 'In Progress'];
    
    const existingComplaint = await Complaint.findOne({
      assetId: cleanAssetId,
      issueType: { $regex: new RegExp(`^${cleanIssueType}$`, 'i') },
      status: { $in: activeStatuses },
    });

    // 2. If an active duplicate exists, DO NOT create a new complaint
    if (existingComplaint) {
      // Lookup asset details
      const assetDetails = await Asset.findOne({ assetId: cleanAssetId });

      return res.status(200).json({
        success: true,
        duplicate: true,
        message: 'This issue has already been reported.',
        data: {
          existingComplaintId: existingComplaint.complaintId,
          existingComplaintStatus: existingComplaint.status,
          assetId: existingComplaint.assetId,
          issueType: existingComplaint.issueType,
          description: existingComplaint.description,
          confirmations: existingComplaint.confirmations,
          reportedDate: existingComplaint.createdAt,
          asset: assetDetails ? {
            id: assetDetails.assetId,
            name: `${assetDetails.type} #${assetDetails.assetId}`,
            type: assetDetails.type,
            location: assetDetails.location,
            status: assetDetails.status,
          } : {
            id: cleanAssetId,
            location: 'Ward 12 Municipal Infrastructure',
          }
        },
      });
    }

    // 3. If no matching active complaint exists: create new complaint normally
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const complaintId = req.body.complaintId || `UQ-${currentYear}-${randomSuffix}`;

    const userIdentifier = userId || req.headers['x-user-id'] || req.ip || 'anonymous-citizen';

    const complaint = await Complaint.create({
      complaintId: complaintId.toUpperCase(),
      assetId: cleanAssetId,
      userId: userId || undefined,
      issueType: cleanIssueType,
      description: description || '',
      photo: photo || '',
      priority: priority || 'Medium',
      status: 'Submitted',
      confirmations: 1,
      confirmedUsers: [userIdentifier],
    });

    // Mark asset status as Faulty
    await Asset.findOneAndUpdate(
      { assetId: cleanAssetId },
      { status: 'Faulty' }
    );

    res.status(201).json({
      success: true,
      duplicate: false,
      data: complaint,
      message: 'Complaint registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm / Upvote existing complaint (+1 Duplicate Shield)
// @route   POST /api/complaints/:id/confirm
// @access  Public / Citizen
export const confirmComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Identify the user by userId, custom header, or client IP
    const userIdentifier = userId || req.body.userEmail || req.headers['x-user-id'] || req.ip || 'citizen-user';

    let complaint = await Complaint.findOne({ complaintId: id.toUpperCase() });
    if (!complaint && id.match(/^[0-9a-fA-F]{24}$/)) {
      complaint = await Complaint.findById(id);
    }

    if (!complaint) {
      res.status(404);
      throw new Error(`Complaint not found with ID: ${id}`);
    }

    // Prevent the same authenticated user from confirming multiple times
    if (complaint.confirmedUsers && complaint.confirmedUsers.includes(userIdentifier)) {
      return res.status(400).json({
        success: false,
        alreadyConfirmed: true,
        message: 'You have already confirmed this existing complaint.',
        data: {
          complaintId: complaint.complaintId,
          confirmations: complaint.confirmations,
          status: complaint.status,
        },
      });
    }

    // Add user identifier and increment confirmation count
    complaint.confirmedUsers.push(userIdentifier);
    complaint.confirmations += 1;

    // If confirmation count reaches 10 or more, automatically elevate priority
    if (complaint.confirmations >= 10 && complaint.priority === 'Medium') {
      complaint.priority = 'High';
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      alreadyConfirmed: false,
      message: `Confirmed issue. Total citizen confirmations: ${complaint.confirmations}`,
      data: {
        complaintId: complaint.complaintId,
        confirmations: complaint.confirmations,
        status: complaint.status,
        priority: complaint.priority,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints (with filters by status, priority, assetId, and search)
// @route   GET /api/complaints
// @access  Public / Admin
export const getComplaints = async (req, res, next) => {
  try {
    const { status, priority, assetId, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (assetId) {
      query.assetId = assetId.toUpperCase();
    }

    if (search) {
      query.$or = [
        { complaintId: { $regex: search, $options: 'i' } },
        { assetId: { $regex: search, $options: 'i' } },
        { issueType: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single complaint by Complaint ID (e.g. UQ-2026-1024) or Mongo _id
// @route   GET /api/complaints/:id
// @access  Public
export const getComplaintById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let complaint = await Complaint.findOne({ complaintId: id.toUpperCase() });

    if (!complaint && id.match(/^[0-9a-fA-F]{24}$/)) {
      complaint = await Complaint.findById(id);
    }

    if (!complaint) {
      res.status(404);
      throw new Error(`Complaint not found with ID: ${id}`);
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint details
// @route   PUT /api/complaints/:id
// @access  Admin / Officer
export const updateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;

    let complaint = await Complaint.findOne({ complaintId: id.toUpperCase() });
    if (!complaint && id.match(/^[0-9a-fA-F]{24}$/)) {
      complaint = await Complaint.findById(id);
    }

    if (!complaint) {
      res.status(404);
      throw new Error(`Complaint not found with ID: ${id}`);
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaint._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedComplaint,
      message: 'Complaint updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign worker to complaint
// @route   PUT /api/complaints/:id/assign
// @access  Admin / Officer
export const assignWorker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { workerName } = req.body;

    if (!workerName) {
      res.status(400);
      throw new Error('Please provide assigned worker name');
    }

    let complaint = await Complaint.findOne({ complaintId: id.toUpperCase() });
    if (!complaint && id.match(/^[0-9a-fA-F]{24}$/)) {
      complaint = await Complaint.findById(id);
    }

    if (!complaint) {
      res.status(404);
      throw new Error(`Complaint not found with ID: ${id}`);
    }

    complaint.assignedWorker = workerName;
    if (complaint.status === 'Submitted') {
      complaint.status = 'Assigned';
    }
    await complaint.save();

    res.status(200).json({
      success: true,
      data: complaint,
      message: `Assigned to worker ${workerName}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint status (Submitted, Assigned, In Progress, Resolved)
// @route   PUT /api/complaints/:id/status
// @access  Officer / Worker
export const updateComplaintStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Submitted', 'Assigned', 'In Progress', 'Resolved'];
    if (!status || !validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    let complaint = await Complaint.findOne({ complaintId: id.toUpperCase() });
    if (!complaint && id.match(/^[0-9a-fA-F]{24}$/)) {
      complaint = await Complaint.findById(id);
    }

    if (!complaint) {
      res.status(404);
      throw new Error(`Complaint not found with ID: ${id}`);
    }

    complaint.status = status;
    await complaint.save();

    // If resolved, update asset status back to Operational
    if (status === 'Resolved') {
      await Asset.findOneAndUpdate(
        { assetId: complaint.assetId },
        { status: 'Operational' }
      );
    }

    res.status(200).json({
      success: true,
      data: complaint,
      message: `Status updated to ${status}`,
    });
  } catch (error) {
    next(error);
  }
};
