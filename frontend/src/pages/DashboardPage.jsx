import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

/* ── Icons ─────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const AssignIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const TasksIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 5 19 12"/>
  </svg>
);

/* ── Static Data ────────────────────────────────────────── */
const stats = [
  {
    label: "Work completed by Staff",
    value: "1,284",
    change: "+12.5%",
    positive: true,
    color: "#22c55e",
    bg: "#f0fdf4",
    barColor: "#22c55e",
    barWidth: "78%",
    icon: <CheckIcon />,
    link: "/tasks/completed",
  },
  {
    label: "Work didn't Completed",
    value: "156",
    change: "-5.2%",
    positive: false,
    color: "#ef4444",
    bg: "#fef2f2",
    barColor: "#ef4444",
    barWidth: "20%",
    icon: <XIcon />,
    link: "/tasks/incomplete",
  },
  {
    label: "Work Assigned to Staff",
    value: "432",
    change: "+8.1%",
    positive: true,
    color: "#3b82f6",
    bg: "#eff6ff",
    barColor: "#3b82f6",
    barWidth: "52%",
    icon: <AssignIcon />,
    link: "/tasks/assigned",
  },
  {
    label: "Pending Task",
    value: "1,872",
    change: "+15%",
    positive: true,
    color: "#1e3a5f",
    bg: "#f0f4ff",
    barColor: "#1e3a5f",
    barWidth: "90%",
    icon: <TasksIcon />,
    link: "/tasks/pending",
  },
];

const activities = [
  {
    id: 1,
    task: "UI Design System",
    assignee: "Alex Rivera",
    initials: "AR",
    avatarBg: "#f97316",
    status: "Completed",
    statusClass: "badge-completed",
    date: "Oct 24, 2023",
  },
  {
    id: 2,
    task: "API Integration",
    assignee: "Sarah Chen",
    initials: "SC",
    avatarBg: "#8b5cf6",
    status: "In Progress",
    statusClass: "badge-inprogress",
    date: "Oct 26, 2023",
  },
  {
    id: 3,
    task: "User Testing",
    assignee: "Mike Johnson",
    initials: "MJ",
    avatarBg: "#06b6d4",
    status: "Pending",
    statusClass: "badge-pending",
    date: "Oct 28, 2023",
  },
];

/* ── Component ──────────────────────────────────────────── */
export default function DashboardPage() {
  const { admin } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="dashboard-page">
        {/* Page Header */}
        <div className="dash-header-row">
          <div>
            <h1 className="dash-title">Dashboard Overview</h1>
            <p className="dash-subtitle">Monitor your team's performance and task progress.</p>
          </div>
          <button className="upload-task-btn" onClick={() => navigate("/files")}>
            <UploadIcon />
            Upload Task
          </button>
        </div>

        {/* Stat Cards */}
        <div className="dash-cards-grid">
          {stats.map((s) => (
            <div
                className="dash-stat-card"
                key={s.label}
                onClick={() => s.link && navigate(s.link)}
                style={{ cursor: s.link ? "pointer" : "default" }}
              >
              <div className="stat-card-top">
                <div className="stat-icon-wrap" style={{ background: s.bg }}>
                  {s.icon}
                </div>
                <span className={`stat-change ${s.positive ? "stat-pos" : "stat-neg"}`}>
                  {s.change}
                </span>
              </div>
              <p className="stat-label">{s.label}</p>
              <h2 className="stat-value">{s.value}</h2>
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{ width: s.barWidth, background: s.barColor }}
                />
              </div>
              {s.link && (
                <span className="card-nav-hint">View details →</span>
              )}
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <div className="activity-header">
            <h3 className="activity-title">Recent Activity</h3>
            <button className="view-all-btn" onClick={() => navigate("/tasks/assigned")}>
              View all
            </button>
          </div>

          <table className="activity-table">
            <thead>
              <tr>
                <th>TASK NAME</th>
                <th>ASSIGNED TO</th>
                <th>STATUS</th>
                <th>DUE DATE</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id}>
                  <td className="task-name-cell">{a.task}</td>
                  <td>
                    <div className="assignee-cell">
                      <div
                        className="assignee-avatar"
                        style={{ background: a.avatarBg }}
                      >
                        {a.initials}
                      </div>
                      <span>{a.assignee}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${a.statusClass}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="date-cell">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}