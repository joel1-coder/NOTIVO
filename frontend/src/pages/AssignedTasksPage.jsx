import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ViewModal from "../components/ViewModal";

/* ── Icons ─────────────────────────────────── */
const FilterIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const SortIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ── Stat card data ─────────────────────────── */
const statCards = [
  {
    label: "Total Assigned",
    value: "124",
    change: "+12%",
    positive: true,
    bg: "#1E3A5F",
    textColor: "#fff",
    subColor: "rgba(255,255,255,0.7)",
    sub: "Tasks this month",
  },
  {
    label: "In Progress",
    value: "64",
    change: "+8.1%",
    positive: true,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#6B7280",
    sub: "Active tasks",
    bar: { color: "#3B82F6", pct: 52 },
  },
  {
    label: "Overdue",
    value: "8",
    change: "-3",
    positive: false,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#EF4444",
    sub: "Require action",
    bar: { color: "#EF4444", pct: 8 },
  },
  {
    label: "Completed (MoM)",
    value: "84%",
    change: "+2.4%",
    positive: true,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#10B981",
    sub: "High performance",
    bar: { color: "#10B981", pct: 84 },
  },
];

/* ── Task data ─────────────────────────────── */
const tasks = [
  {
    id: "TSK-7812",
    name: "Annual Report Generation",
    assignee: "Michael Foster",
    dept: "Finance",
    initials: "MF",
    avatarBg: "#F59E0B",
    priority: "Critical",
    status: "STAGING",
    due: "Nov 5, 2023",
  },
  {
    id: "TSK-8834",
    name: "Database Migration Phase 2",
    assignee: "Sarah Jenkins",
    dept: "Engineering",
    initials: "SJ",
    avatarBg: "#8B5CF6",
    priority: "High",
    status: "IN PROGRESS",
    due: "Nov 8, 2023",
  },
  {
    id: "TSK-9901",
    name: "UI/UX Redesign for Portal",
    assignee: "Robert Chen",
    dept: "Design",
    initials: "RC",
    avatarBg: "#06B6D4",
    priority: "Medium",
    status: "YET TO SEEN",
    due: "Nov 10, 2023",
  },
  {
    id: "TSK-6643",
    name: "Content Management System Update",
    assignee: "David Miller",
    dept: "Marketing",
    initials: "DM",
    avatarBg: "#10B981",
    priority: "High",
    status: "BACKLOG",
    due: "Nov 12, 2023",
  },
  {
    id: "TSK-5521",
    name: "Security Audit Implementation",
    assignee: "Emily Zhang",
    dept: "Security",
    initials: "EZ",
    avatarBg: "#EF4444",
    priority: "Critical",
    status: "TESTING",
    due: "Nov 15, 2023",
  },
];

/* ── Helper badge styles ───────────────────── */
const priorityClass = {
  Critical: "priority-critical",
  High:     "priority-high",
  Medium:   "priority-medium",
};
const statusClass = {
  "STAGING":     "status-staging",
  "IN PROGRESS": "status-inprogress",
  "YET TO SEEN": "status-yettoseen",
  "BACKLOG":     "status-backlog",
  "TESTING":     "status-testing",
};

/* ── Component ─────────────────────────────── */
export default function AssignedTasksPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [staffFilter, setStaffFilter] = useState("All Members");
  const [modalItem, setModalItem] = useState(null);

  const filtered = tasks.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || t.dept === deptFilter;
    const matchStaff = staffFilter === "All Members" || t.assignee === staffFilter;
    return matchSearch && matchDept && matchStaff;
  });

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Assigned Tasks</span>
        </nav>

        {/* Page Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Assigned Tasks</h1>
            <p className="tasks-subtitle">Monitor and track staff productivity and task assignments.</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="tasks-stat-grid">
          {statCards.map((c) => (
            <div
              className="tasks-stat-card"
              key={c.label}
              style={{ background: c.bg, color: c.textColor }}
            >
              <div className="tsc-top">
                <span className="tsc-label" style={{ color: c.bg === "#1E3A5F" ? "rgba(255,255,255,0.75)" : "#6B7280" }}>
                  {c.label}
                </span>
                <span className={`tsc-change ${c.positive ? "tsc-pos" : "tsc-neg"}`} style={c.bg === "#1E3A5F" ? {background:"rgba(255,255,255,0.15)", color:"#fff"} : {}}>
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
              placeholder="Search tasks by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tasks-search-input"
            />
          </div>
          <select
            className="tasks-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All">Department: All</option>
            <option>Finance</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Security</option>
          </select>
          <select
            className="tasks-select"
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
          >
            <option value="All Members">Staff: All Members</option>
            {tasks.map((t) => (
              <option key={t.assignee}>{t.assignee}</option>
            ))}
          </select>
          <button className="sort-btn"><SortIcon /> Sort by: Newest</button>
        </div>

        {/* Task Table */}
        <div className="tasks-table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>TASK DETAILS</th>
                <th>ASSIGNED TO</th>
                <th>PRIORITY</th>
                <th>STATUS</th>
                <th>DUE DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-results">No tasks found.</td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id}>
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
                      <span className={`priority-badge ${priorityClass[t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`task-status-badge ${statusClass[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="date-cell">{t.due}</td>
                    <td>
                      <button className="view-details-btn" onClick={() => setModalItem(t)}>
                        <EyeIcon /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="table-footer">
            <span className="showing-text">
              Showing 1–{filtered.length} of {tasks.length} tasks
            </span>
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-ellipsis">…</span>
              <button className="page-btn">25</button>
            </div>
          </div>
        </div>
      </div>
      {modalItem && <ViewModal item={modalItem} type="task" onClose={() => setModalItem(null)} />}
    </Layout>
  );
}
