import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CitizenLayout from './layouts/CitizenLayout';
import AdminLayout from './layouts/AdminLayout';
import WorkerLayout from './layouts/WorkerLayout';

// Public & Citizen Pages
import LandingPage from './pages/LandingPage';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import ScanQrPage from './pages/citizen/ScanQrPage';
import AssetDetailsPage from './pages/citizen/AssetDetailsPage';
import ReportIssuePage from './pages/citizen/ReportIssuePage';
import MyComplaintsPage from './pages/citizen/MyComplaintsPage';
import ComplaintDetailsPage from './pages/citizen/ComplaintDetailsPage';

// Municipal Officer / Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage';
import AdminAssetsPage from './pages/admin/AdminAssetsPage';
import AdminWorkersPage from './pages/admin/AdminWorkersPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminComplaintDetailsPage from './pages/admin/AdminComplaintDetailsPage';

// Field Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerTasksPage from './pages/worker/WorkerTasksPage';
import WorkerTaskDetailsPage from './pages/worker/WorkerTaskDetailsPage';

import { CitizenProvider } from './context/CitizenContext';

export default function App() {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <CitizenProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Public Landing Page */}
          <Route
            path="/"
            element={
              <MainLayout
                onOpenScanModal={() => setIsScanModalOpen(true)}
                onOpenLoginModal={() => setIsLoginModalOpen(true)}
              >
                <LandingPage
                  isScanModalOpen={isScanModalOpen}
                  setIsScanModalOpen={setIsScanModalOpen}
                  isLoginModalOpen={isLoginModalOpen}
                  setIsLoginModalOpen={setIsLoginModalOpen}
                />
              </MainLayout>
            }
          />

          {/* 2. Citizen Portal Routes */}
          <Route
            path="/citizen"
            element={
              <CitizenLayout>
                <CitizenDashboard />
              </CitizenLayout>
            }
          />
          <Route
            path="/citizen/scan"
            element={
              <CitizenLayout>
                <ScanQrPage />
              </CitizenLayout>
            }
          />
          <Route
            path="/citizen/asset/:id"
            element={
              <CitizenLayout>
                <AssetDetailsPage />
              </CitizenLayout>
            }
          />
          <Route
            path="/citizen/report"
            element={
              <CitizenLayout>
                <ReportIssuePage />
              </CitizenLayout>
            }
          />
          <Route
            path="/citizen/my-complaints"
            element={
              <CitizenLayout>
                <MyComplaintsPage />
              </CitizenLayout>
            }
          />
          <Route
            path="/citizen/complaint/:id"
            element={
              <CitizenLayout>
                <ComplaintDetailsPage />
              </CitizenLayout>
            }
          />

          {/* 3. Municipal Officer / Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/complaints"
            element={
              <AdminLayout>
                <AdminComplaintsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/assets"
            element={
              <AdminLayout>
                <AdminAssetsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/workers"
            element={
              <AdminLayout>
                <AdminWorkersPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <AdminAnalyticsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminLayout>
                <AdminSettingsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/complaint/:id"
            element={
              <AdminLayout>
                <AdminComplaintDetailsPage />
              </AdminLayout>
            }
          />

          {/* 4. Field Worker Dashboard Routes */}
          <Route
            path="/worker"
            element={
              <WorkerLayout>
                <WorkerDashboard />
              </WorkerLayout>
            }
          />
          <Route
            path="/worker/tasks"
            element={
              <WorkerLayout>
                <WorkerTasksPage />
              </WorkerLayout>
            }
          />
          <Route
            path="/worker/task/:id"
            element={
              <WorkerLayout>
                <WorkerTaskDetailsPage />
              </WorkerLayout>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CitizenProvider>
  );
}
