import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import OtpVerificationPage from "../pages/OtpVerificationPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import AssignedTasksPage from "../pages/AssignedTasksPage";
import PendingTasksPage from "../pages/PendingTasksPage";
import CompletedTasksPage from "../pages/CompletedTasksPage";
import FileUploadPage from "../pages/FileUploadPage";
import ReminderManagementPage from "../pages/ReminderManagementPage";
import IncompleteTasksPage from "../pages/IncompleteTasksPage";
import RoleManagementPage from "../pages/RoleManagementPage";
import AuditLogPage from "../pages/AuditLogPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import UserProfilePage from "../pages/UserProfilePage";
import NotificationsPage from "../pages/NotificationsPage";
import DocumentReviewPage from "../pages/DocumentReviewPage";
import IDCardDesignerPage from "../pages/IDCardDesignerPage";
import EventSubmissionsPage from "../pages/EventSubmissionsPage";
import DepartmentManagementPage from "../pages/DepartmentManagementPage";
import SendNotificationPage from "../pages/SendNotificationPage";
import ContentMonitorPage from "../pages/ContentMonitorPage";
import InvitationDetailPage from "../pages/InvitationDetailPage";
import PrivateRoute from "../components/PrivateRoutes";
import { SubmissionProvider } from "./SubmissionContext";

function App() {
  return (
    <SubmissionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<OtpVerificationPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/dashboard"        element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/tasks/assigned"   element={<PrivateRoute><AssignedTasksPage /></PrivateRoute>} />
          <Route path="/tasks/pending"    element={<PrivateRoute><PendingTasksPage /></PrivateRoute>} />
          <Route path="/tasks/completed"  element={<PrivateRoute><CompletedTasksPage /></PrivateRoute>} />
          <Route path="/tasks/incomplete" element={<PrivateRoute><IncompleteTasksPage /></PrivateRoute>} />
          <Route path="/files"            element={<PrivateRoute><FileUploadPage /></PrivateRoute>} />
          <Route path="/reminders"        element={<PrivateRoute><ReminderManagementPage /></PrivateRoute>} />
          <Route path="/roles"            element={<PrivateRoute><RoleManagementPage /></PrivateRoute>} />
          <Route path="/audit-log"        element={<PrivateRoute><AuditLogPage /></PrivateRoute>} />
          <Route path="/analytics"        element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
          <Route path="/profile"          element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path="/notifications"    element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
          <Route path="/documents"        element={<PrivateRoute><DocumentReviewPage /></PrivateRoute>} />
          <Route path="/designer"         element={<PrivateRoute><IDCardDesignerPage /></PrivateRoute>} />
          <Route path="/submissions"      element={<PrivateRoute><EventSubmissionsPage /></PrivateRoute>} />
          <Route path="/departments"      element={<PrivateRoute><DepartmentManagementPage /></PrivateRoute>} />
          <Route path="/compose"          element={<PrivateRoute><SendNotificationPage /></PrivateRoute>} />
          <Route path="/content-monitor"  element={<PrivateRoute><ContentMonitorPage /></PrivateRoute>} />
          <Route path="/invitation-detail" element={<PrivateRoute><InvitationDetailPage /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </SubmissionProvider>
  );
}

export default App;