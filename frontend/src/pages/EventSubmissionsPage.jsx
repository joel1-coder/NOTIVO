import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useSubmission } from "../context/SubmissionContext";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const STATUS_STYLES = {
  "Pending Review": { bg: "#FEF3C7", color: "#92400E" },
  Approved:         { bg: "#DCFCE7", color: "#166534" },
  Rejected:         { bg: "#FEE2E2", color: "#B91C1C" },
  "Under Review":   { bg: "#DBEAFE", color: "#1D4ED8" },
};

const FILTERS = ["All", "Pending Review", "Under Review", "Approved", "Rejected"];
const DEPTS = [
  "All Departments",
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Physics",
  "Physical Education",
  "Arts & Humanities",
];

export default function EventSubmissionsPage() {
  const navigate = useNavigate();
  const { submissions, setSelectedSubmission } = useSubmission();
  const [filter, setFilter] = useState("All");
  const [dept, setDept]     = useState("All Departments");
  const [search, setSearch] = useState("");

  const filtered = submissions.filter((s) => {
    const matchFilter = filter === "All" || s.status === filter;
    const matchDept   = dept === "All Departments" || s.dept === dept;
    const matchSearch =
      s.eventName.toLowerCase().includes(search.toLowerCase()) ||
      s.dept.toLowerCase().includes(search.toLowerCase()) ||
      s.hod.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchDept && matchSearch;
  });

  const counts = {
    total:    submissions.length,
    pending:  submissions.filter((s) => s.status === "Pending Review").length,
    approved: submissions.filter((s) => s.status === "Approved").length,
    rejected: submissions.filter((s) => s.status === "Rejected").length,
  };

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    navigate("/invitation-detail");
  };

  return (
    <Layout>
      <div className="tasks-page">
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Event Submissions</span>
        </nav>

        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Event Submissions</h1>
            <p className="tasks-subtitle">All event documents submitted by departments for admin review.</p>
          </div>
          <Link to="/documents" className="es-review-btn">📋 Open Document Review</Link>
        </div>

        {/* Stats */}
        <div className="es-stats-grid">
          {[
            { label: "Total Submissions", value: counts.total,    color: "#2563EB", bg: "#DBEAFE", icon: "📁" },
            { label: "Pending Review",    value: counts.pending,  color: "#92400E", bg: "#FEF3C7", icon: "⏳" },
            { label: "Approved",          value: counts.approved, color: "#166534", bg: "#DCFCE7", icon: "✅" },
            { label: "Rejected",          value: counts.rejected, color: "#B91C1C", bg: "#FEE2E2", icon: "❌" },
          ].map((c) => (
            <div key={c.label} className="es-stat-card">
              <div className="es-stat-icon" style={{ background: c.bg }}>{c.icon}</div>
              <div>
                <div className="es-stat-value" style={{ color: c.color }}>{c.value}</div>
                <div className="es-stat-label">{c.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="es-filter-bar">
          <div className="es-filter-tabs">
            {FILTERS.map((f) => (
              <button key={f} className={`notif-filter-tab ${filter === f ? "notif-tab-active" : ""}`}
                onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="es-filter-right">
            <select className="es-dept-select" value={dept} onChange={(e) => setDept(e.target.value)}>
              {DEPTS.map((d) => <option key={d}>{d}</option>)}
            </select>
            <div className="es-search-wrap">
              <SearchIcon />
              <input className="es-search-input" placeholder="Search events…"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="tasks-table-card">
          <table className="tasks-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["#", "Event Name", "Department", "HOD", "Submitted", "Event Date", "Status", "Action"].map((h) => (
                  <th key={h} className="es-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="es-empty-row">No submissions found.</td></tr>
              )}
              {filtered.map((s) => {
                const badge = STATUS_STYLES[s.status] || STATUS_STYLES["Pending Review"];
                return (
                  <tr key={s.id} className="es-tr" onClick={() => handleView(s)} style={{ cursor: "pointer" }}>
                    <td className="es-td es-id-cell">{s.id}</td>
                    <td className="es-td">
                      <div className="es-event-name-cell">
                        <span className="es-event-icon">{s.icon}</span>
                        <div>
                          <div className="es-event-name">{s.eventName}</div>
                          <div className="es-file-name">{s.file}</div>
                        </div>
                      </div>
                    </td>
                    <td className="es-td es-dept-cell">{s.dept}</td>
                    <td className="es-td es-hod-cell">{s.hod}</td>
                    <td className="es-td es-date-cell">{s.submitted}</td>
                    <td className="es-td es-date-cell">{s.eventDate}</td>
                    <td className="es-td">
                      <span className="task-status-badge" style={{ background: badge.bg, color: badge.color }}>
                        {s.status}
                      </span>
                    </td>
                    <td className="es-td" onClick={(e) => e.stopPropagation()}>
                      <button className="es-view-btn" onClick={() => handleView(s)}>
                        <EyeIcon /> Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="es-footer-row">
          Showing <strong>{filtered.length}</strong> of <strong>{submissions.length}</strong> submissions
        </div>
      </div>
    </Layout>
  );
}
