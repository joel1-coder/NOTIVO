import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ViewModal from "../components/ViewModal";
import axiosInstance from "../api/axiosInstance";

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
const AlertIcon = () => (
  <svg width="14" height="14" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

/* ── Stat Cards ─────────────────────────────── */
const statCards = [
  {
    label: "Total Pending",
    value: "47",
    change: "+5",
    positive: false,
    bg: "#7C3AED",
    textColor: "#fff",
    subColor: "rgba(255,255,255,0.7)",
    sub: "Awaiting action",
  },
  {
    label: "Overdue",
    value: "12",
    change: "+3",
    positive: false,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#EF4444",
    sub: "Immediate action required",
    bar: { color: "#EF4444", pct: 25 },
  },
  {
    label: "Due This Week",
    value: "19",
    change: "+7",
    positive: false,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#F59E0B",
    sub: "Upcoming deadlines",
    bar: { color: "#F59E0B", pct: 40 },
  },
  {
    label: "Avg. Delay (days)",
    value: "3.2",
    change: "-0.8",
    positive: true,
    bg: "#fff",
    textColor: "#111827",
    subColor: "#10B981",
    sub: "Improving",
    bar: { color: "#10B981", pct: 32 },
  },
];

/* ── Task Data ──────────────────────────────── */
const pendingTasks = [
  {
    id: "TSK-4421",
    name: "Q4 Budget Review",
    assignee: "Priya Sharma",
    dept: "Finance",
    initials: "PS",
    avatarBg: "#8B5CF6",
    priority: "Critical",
    deadline: "Oct 20, 2023",
    daysOverdue: 8,
    overdue: true,
  },
  {
    id: "TSK-4832",
    name: "Server Infrastructure Upgrade",
    assignee: "James Wilson",
    dept: "Engineering",
    initials: "JW",
    avatarBg: "#3B82F6",
    priority: "High",
    deadline: "Oct 22, 2023",
    daysOverdue: 6,
    overdue: true,
  },
  {
    id: "TSK-5103",
    name: "Employee Onboarding Docs",
    assignee: "Aisha Patel",
    dept: "HR",
    initials: "AP",
    avatarBg: "#F97316",
    priority: "Medium",
    deadline: "Oct 30, 2023",
    daysOverdue: 0,
    overdue: false,
  },
  {
    id: "TSK-5289",
    name: "Marketing Campaign Assets",
    assignee: "Carlos Rivera",
    dept: "Marketing",
    initials: "CR",
    avatarBg: "#10B981",
    priority: "High",
    deadline: "Nov 1, 2023",
    daysOverdue: 0,
    overdue: false,
  },
  {
    id: "TSK-5374",
    name: "Compliance Audit Documentation",
    assignee: "Sarah Nguyen",
    dept: "Legal",
    initials: "SN",
    avatarBg: "#EF4444",
    priority: "Critical",
    deadline: "Oct 18, 2023",
    daysOverdue: 10,
    overdue: true,
  },
  {
    id: "TSK-5490",
    name: "Product Roadmap Presentation",
    assignee: "Tom Bradley",
    dept: "Product",
    initials: "TB",
    avatarBg: "#06B6D4",
    priority: "Medium",
    deadline: "Nov 5, 2023",
    daysOverdue: 0,
    overdue: false,
  },
];

const priorityClass = {
  Critical: "priority-critical",
  High:     "priority-high",
  Medium:   "priority-medium",
};

/* ── Component ──────────────────────────────── */
export default function PendingTasksPage() {
  const [search, setSearch]       = useState("");
  const [deptFilter, setDept]     = useState("All");
  const [showOverdue, setOverdue] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/tasks/status/Pending");
      setPendingTasks(data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch pending tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = pendingTasks.filter((t) => {
    const matchSearch =
      (t.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.id || "").toLowerCase().includes(search.toLowerCase());
    const matchDept   = deptFilter === "All" || t.department === deptFilter;
    const matchOver   = !showOverdue || (t.dueDate && new Date(t.dueDate) < new Date());
    return matchSearch && matchDept && matchOver;
  });

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Pending Tasks</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Pending Tasks</h1>
            <p className="tasks-subtitle">Track and resolve overdue and upcoming task deadlines.</p>
          </div>
          <button
            className={`overdue-toggle-btn ${showOverdue ? "active" : ""}`}
            onClick={() => setOverdue(!showOverdue)}
          >
            <AlertIcon />
            {showOverdue ? "Show All" : "Show Overdue Only"}
          </button>
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
                <span className="tsc-label" style={{ color: c.bg !== "#fff" ? "rgba(255,255,255,0.75)" : "#6B7280" }}>
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
              placeholder="Search pending tasks by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tasks-search-input"
            />
          </div>
          <select
            className="tasks-select"
            value={deptFilter}
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="All">Department: All</option>
            <option>Finance</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Marketing</option>
            <option>Legal</option>
            <option>Product</option>
          </select>
          <button className="sort-btn"><SortIcon /> Sort by: Urgency</button>
        </div>

        {/* Table */}
        <div className="tasks-table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>TASK DETAILS</th>
                <th>ASSIGNED TO</th>
                <th>PRIORITY</th>
                <th>DEADLINE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-results">No pending tasks found.</td>
                </tr>
              ) : (
                filtered.map((t) => {
                  const isOverdue = t.dueDate && new Date(t.dueDate) < new Date();
                  const daysOverdue = isOverdue ? Math.floor((new Date() - new Date(t.dueDate)) / (1000 * 60 * 60 * 24)) : 0;
                  return (
                  <tr key={t._id} className={isOverdue ? "overdue-row" : ""}>
                    <td>
                      <div className="task-name-col">
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {isOverdue && <AlertIcon />}
                          <span className="task-row-name">{t.title}</span>
                        </div>
                        <span className="task-row-id">#{t.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="assignee-cell">
                        <div className="assignee-avatar" style={{ background: t.avatarBg }}>
                          {t.initials}
                        </div>
                        <div>
                          <div className="assignee-name">{t.assignedTo}</div>
                          <div className="assignee-dept">{t.department}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`priority-badge ${priorityClass[t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <div className="deadline-cell">
                        <span className={isOverdue ? "deadline-overdue" : "deadline-normal"}>
                          {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'N/A'}
                        </span>
                        {isOverdue && (
                          <span className="overdue-chip">
                            {daysOverdue}d overdue
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`task-status-badge ${isOverdue ? "status-overdue" : "status-pending-badge"}`}>
                        {isOverdue ? "OVERDUE" : "PENDING"}
                      </span>
                    </td>
                    <td>
                      <button className="view-details-btn" onClick={() => setModalItem(t)}>
                        <EyeIcon /> View Details
                      </button>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="table-footer">
            <span className="showing-text">
              Showing {filtered.length} of {pendingTasks.length} pending tasks
              {showOverdue && <span className="overdue-filter-note"> • Filtered: Overdue only</span>}
            </span>
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
            </div>
          </div>
        </div>
      </div>
      {modalItem && <ViewModal item={modalItem} type="task" onClose={() => setModalItem(null)} />}
    </Layout>
  );
}
