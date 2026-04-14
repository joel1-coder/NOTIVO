import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const SortIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const RetryIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-4.45"/>
  </svg>
);
const XCircleIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

/* ── Stat Cards ──────────────────────────────── */
const statCards = [
  {
    label: "Total Incomplete",
    value: "156",
    change: "-5.2%",
    positive: false,
    bg: "#7F1D1D",
    textColor: "#fff",
    subColor: "rgba(255,255,255,0.7)",
    sub: "This month",
  },
  {
    label: "Failed",
    value: "48",
    change: "-2.1%",
    positive: false,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#EF4444",
    sub: "Could not be done",
    bar: { color: "#EF4444", pct: 31 },
  },
  {
    label: "Cancelled",
    value: "63",
    change: "+1.4%",
    positive: false,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#F97316",
    sub: "By admin or staff",
    bar: { color: "#F97316", pct: 40 },
  },
  {
    label: "Not Started",
    value: "45",
    change: "-0.9%",
    positive: false,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#6B7280",
    sub: "Unassigned or idle",
    bar: { color: "#6B7280", pct: 29 },
  },
];

/* ── Task Data ───────────────────────────────── */
const incompleteTasks = [
  {
    id: "TSK-3312",
    name: "Annual Data Backup",
    assignee: "Kevin Hart",
    dept: "IT",
    initials: "KH",
    avatarBg: "#6B7280",
    reason: "Failed",
    deadline: "Oct 10, 2023",
    note: "Server downtime prevented execution",
  },
  {
    id: "TSK-3490",
    name: "Vendor Contract Renewal",
    assignee: "Nina Patel",
    dept: "Legal",
    initials: "NP",
    avatarBg: "#8B5CF6",
    reason: "Cancelled",
    deadline: "Oct 12, 2023",
    note: "Vendor withdrew from agreement",
  },
  {
    id: "TSK-3751",
    name: "Staff Training Session",
    assignee: "Omar Hassan",
    dept: "HR",
    initials: "OH",
    avatarBg: "#F59E0B",
    reason: "Not Started",
    deadline: "Oct 15, 2023",
    note: "No trainer assigned yet",
  },
  {
    id: "TSK-3884",
    name: "Product Changelog Documentation",
    assignee: "Grace Liu",
    dept: "Product",
    initials: "GL",
    avatarBg: "#3B82F6",
    reason: "Failed",
    deadline: "Oct 17, 2023",
    note: "Missing required access permissions",
  },
  {
    id: "TSK-4002",
    name: "Office Equipment Inventory",
    assignee: "Samuel Osei",
    dept: "Admin",
    initials: "SO",
    avatarBg: "#10B981",
    reason: "Cancelled",
    deadline: "Oct 18, 2023",
    note: "Postponed to next quarter",
  },
  {
    id: "TSK-4115",
    name: "Website Performance Audit",
    assignee: "Rachel Kim",
    dept: "Engineering",
    initials: "RK",
    avatarBg: "#EF4444",
    reason: "Not Started",
    deadline: "Oct 19, 2023",
    note: "Pending tool procurement",
  },
  {
    id: "TSK-4230",
    name: "Q4 Sales Forecast Report",
    assignee: "David Mensah",
    dept: "Finance",
    initials: "DM",
    avatarBg: "#F97316",
    reason: "Failed",
    deadline: "Oct 20, 2023",
    note: "Insufficient data from regional teams",
  },
];

const reasonClass = {
  "Failed":      "reason-failed",
  "Cancelled":   "reason-cancelled",
  "Not Started": "reason-notstarted",
};

/* ── Component ───────────────────────────────── */
export default function IncompleteTasksPage() {
  const [search, setSearch]     = useState("");
  const [reasonFilter, setReason] = useState("All");
  const [deptFilter, setDept]   = useState("All");

  const filtered = incompleteTasks.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchReason = reasonFilter === "All" || t.reason === reasonFilter;
    const matchDept   = deptFilter   === "All" || t.dept   === deptFilter;
    return matchSearch && matchReason && matchDept;
  });

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Work Didn't Complete</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Work Didn't Complete</h1>
            <p className="tasks-subtitle">
              Review failed, cancelled, and unstarted tasks for reassignment or follow-up.
            </p>
          </div>
          <div className="incomplete-badge-summary">
            <XCircleIcon />
            <span>{incompleteTasks.length} tasks need attention</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="tasks-stat-grid">
          {statCards.map((c) => (
            <div
              key={c.label}
              className="tasks-stat-card"
              style={{ background: c.bg, color: c.textColor }}
            >
              <div className="tsc-top">
                <span className="tsc-label"
                  style={{ color: c.bg !== "#fff" ? "rgba(255,255,255,0.75)" : "#6B7280" }}>
                  {c.label}
                </span>
                <span
                  className={`tsc-change ${c.positive ? "tsc-pos" : "tsc-neg"}`}
                  style={c.bg !== "#fff" ? { background: "rgba(255,255,255,0.15)", color: "#fff" } : {}}
                >
                  {c.change}
                </span>
              </div>
              <div className="tsc-value" style={{ color: c.textColor }}>{c.value}</div>
              <div className="tsc-sub" style={{ color: c.subColor }}>{c.sub}</div>
              {c.bar && (
                <div className="tsc-bar-track">
                  <div className="tsc-bar-fill" style={{ width: `${c.bar.pct}%`, background: c.bar.color }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="tasks-filter-bar">
          <div className="tasks-search">
            <FilterIcon />
            <input
              type="text"
              placeholder="Search by task name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tasks-search-input"
            />
          </div>
          <select className="tasks-select" value={reasonFilter}
            onChange={(e) => setReason(e.target.value)}>
            <option value="All">Reason: All</option>
            <option>Failed</option>
            <option>Cancelled</option>
            <option>Not Started</option>
          </select>
          <select className="tasks-select" value={deptFilter}
            onChange={(e) => setDept(e.target.value)}>
            <option value="All">Department: All</option>
            <option>IT</option><option>Legal</option><option>HR</option>
            <option>Product</option><option>Admin</option>
            <option>Engineering</option><option>Finance</option>
          </select>
          <button className="sort-btn"><SortIcon /> Sort by: Deadline</button>
        </div>

        {/* Table */}
        <div className="tasks-table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>TASK DETAILS</th>
                <th>ASSIGNED TO</th>
                <th>REASON</th>
                <th>DEADLINE</th>
                <th>NOTE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-results">No incomplete tasks found.</td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="incomplete-row">
                    <td>
                      <div className="task-name-col">
                        <span className="task-row-name">{t.name}</span>
                        <span className="task-row-id">#{t.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="assignee-cell">
                        <div className="assignee-avatar" style={{ background: t.avatarBg }}>
                          {t.initials}
                        </div>
                        <div>
                          <div className="assignee-name">{t.assignee}</div>
                          <div className="assignee-dept">{t.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`task-status-badge ${reasonClass[t.reason]}`}>
                        {t.reason}
                      </span>
                    </td>
                    <td className="deadline-overdue">{t.deadline}</td>
                    <td className="note-cell">{t.note}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="view-details-btn">
                          <EyeIcon /> View
                        </button>
                        <button className="retry-btn">
                          <RetryIcon /> Retry
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="table-footer">
            <span className="showing-text">
              Showing {filtered.length} of {incompleteTasks.length} incomplete tasks
            </span>
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
