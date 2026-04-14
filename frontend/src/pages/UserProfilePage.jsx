import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const EditIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

/* ── Recent Activity ────────────────────────── */
const recentActivity = [
  { action:"Logged in",             time:"Today, 09:12 AM",    icon:"🔐" },
  { action:"Created task TSK-9902", time:"Today, 09:30 AM",    icon:"📋" },
  { action:"Updated role for USR-004", time:"Yesterday, 03:15 PM", icon:"👤" },
  { action:"Uploaded Q3_Report.pdf",   time:"Yesterday, 11:00 AM", icon:"📁" },
  { action:"Deactivated USR-007",      time:"2 days ago, 02:10 PM",icon:"⚡" },
];

/* ── Component ──────────────────────────────── */
export default function UserProfilePage() {
  const { adminInfo } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(false);
  const [form, setForm]       = useState({
    fullName:    adminInfo?.name  || "Super Admin",
    email:       adminInfo?.email || "admin@notivo.edu",
    phone:       "+1 (555) 012-3456",
    department:  "Administration",
    staffId:     adminInfo?.staffId || "ADM-001",
    joinDate:    "January 15, 2021",
    role:        adminInfo?.role  || "Admin",
  });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = form.fullName
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Layout>
      <div className="profile-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">User Profile</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">User Profile</h1>
            <p className="tasks-subtitle">Manage your personal information and account settings.</p>
          </div>
          {!editing
            ? <button className="edit-profile-btn" onClick={() => setEditing(true)}>
                <EditIcon /> Edit Profile
              </button>
            : <button className="save-profile-btn" onClick={handleSave}>
                <SaveIcon /> Save Changes
              </button>
          }
        </div>

        {saved && <div className="rm-global-success">✅ Profile updated successfully!</div>}

        <div className="profile-layout">
          {/* ── Left: Avatar card ── */}
          <div className="profile-avatar-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-circle">
                {initials}
              </div>
              <button className="avatar-camera-btn" title="Change photo">
                <CameraIcon />
              </button>
            </div>
            <h2 className="profile-name">{form.fullName}</h2>
            <div className="profile-role-badge">
              <ShieldIcon />
              <span>{form.role}</span>
            </div>
            <div className="profile-meta-list">
              <div className="profile-meta-item">
                <MailIcon />
                <span>{form.email}</span>
              </div>
              <div className="profile-meta-item">
                <PhoneIcon />
                <span>{form.phone}</span>
              </div>
            </div>
            <div className="profile-stats-row">
              <div className="profile-stat">
                <div className="ps-value">124</div>
                <div className="ps-label">Tasks Assigned</div>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <div className="ps-value">89%</div>
                <div className="ps-label">Completion</div>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <div className="ps-value">3</div>
                <div className="ps-label">Yrs Experience</div>
              </div>
            </div>
          </div>

          {/* ── Right: Details + Activity ── */}
          <div className="profile-right-col">
            {/* Details card */}
            <div className="profile-details-card">
              <h3 className="profile-section-title">Personal Information</h3>
              <div className="profile-form-grid">
                {[
                  { label:"Full Name",   field:"fullName",   type:"text"  },
                  { label:"Staff ID",    field:"staffId",    type:"text"  },
                  { label:"Email",       field:"email",      type:"email" },
                  { label:"Phone",       field:"phone",      type:"tel"   },
                  { label:"Department",  field:"department", type:"text"  },
                  { label:"Join Date",   field:"joinDate",   type:"text"  },
                ].map(({ label, field, type }) => (
                  <div className="rm-field" key={field}>
                    <label className="rm-label">{label}</label>
                    {editing
                      ? <input type={type}
                          className="rm-input"
                          value={form[field]}
                          onChange={e => setForm({ ...form, [field]: e.target.value })} />
                      : <div className="profile-field-value">{form[field]}</div>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="profile-details-card">
              <h3 className="profile-section-title">Recent Activity</h3>
              <ul className="profile-activity-list">
                {recentActivity.map((a, i) => (
                  <li key={i} className="profile-activity-item">
                    <div className="pa-icon">{a.icon}</div>
                    <div className="pa-info">
                      <div className="pa-action">{a.action}</div>
                      <div className="pa-time">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
