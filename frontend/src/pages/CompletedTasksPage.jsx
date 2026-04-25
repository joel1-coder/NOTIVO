import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axiosInstance from "../api/axiosInstance";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const BackIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const TrendUpIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

/* ── Static Data ────────────────────────────── */
const completedTasks = [
  {
    id: "TSK-8821",
    name: "Q3 Financial Audit Preparation",
    assignee: "Michael Vance",
    dept: "Finance",
    initials: "MV",
    avatarBg: "#F59E0B",
    dateCompleted: "Oct 24, 2023",
  },
  {
    id: "TSK-9754",
    name: "Update Onboarding Manual",
    assignee: "Sarah Jenkins",
    dept: "Human Resources",
    initials: "SJ",
    avatarBg: "#10B981",
    dateCompleted: "Oct 23, 2023",
  },
  {
    id: "TSK-9902",
    name: "Product Launch Social Media Campaign",
    assignee: "Robert Chen",
    dept: "Marketing",
    initials: "RC",
    avatarBg: "#8B5CF6",
    dateCompleted: "Oct 22, 2023",
  },
  {
    id: "TSK-8441",
    name: "Database Migration Phase 1",
    assignee: "David Miller",
    dept: "Engineering",
    initials: "DM",
    avatarBg: "#3B82F6",
    dateCompleted: "Oct 21, 2023",
  },
  {
    id: "TSK-8312",
    name: "Annual Compliance Report",
    assignee: "Linda Torres",
    dept: "Legal",
    initials: "LT",
    avatarBg: "#EF4444",
    dateCompleted: "Oct 20, 2023",
  },
  {
    id: "TSK-7988",
    name: "Design System Documentation",
    assignee: "Priya Nair",
    dept: "Design",
    initials: "PN",
    avatarBg: "#06B6D4",
    dateCompleted: "Oct 19, 2023",
  },
  {
    id: "TSK-7741",
    name: "Staff Performance Reviews Q3",
    assignee: "James Okafor",
    dept: "Human Resources",
    initials: "JO",
    avatarBg: "#F97316",
    dateCompleted: "Oct 18, 2023",
  },
];

/* ── Component ──────────────────────────────── */
export default function CompletedTasksPage() {
  const navigate = useNavigate();
  const [search, setSearch]       = useState("");
  const [deptFilter, setDept]     = useState("All");
  const [staffFilter, setStaff]   = useState("All Members");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/tasks/status/Completed");
      setCompletedTasks(data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch completed tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = completedTasks.filter((t) => {
    const matchSearch =
      (t.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.id || "").toLowerCase().includes(search.toLowerCase());
    const matchDept  = deptFilter  === "All"         || t.department     === deptFilter;
    const matchStaff = staffFilter === "All Members"  || t.assignedTo === staffFilter;
    return matchSearch && matchDept && matchStaff;
  });

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard"       className="bc-link">Dashboard</Link>
          <ChevronRight />
          <Link to="/tasks/assigned"  className="bc-link">Assigned Tasks</Link>
          <ChevronRight />
          <span className="bc-current">Completed Tasks</span>
        </nav>

        {/* Page Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Completed Tasks</h1>
            <p className="tasks-subtitle">Review and audit successfully finalized staff assignments.</p>
          </div>
          <button className="back-nav-btn" onClick={() => navigate(-1)}>
            <BackIcon /> back
          </button>
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
          <select className="tasks-select" value={deptFilter}
            onChange={(e) => setDept(e.target.value)}>
            <option value="All">Department: All</option>
            <option>Finance</option>
            <option>Human Resources</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Legal</option>
            <option>Design</option>
          </select>
          <select className="tasks-select" value={staffFilter}
            onChange={(e) => setStaff(e.target.value)}>
            <option value="All Members">Staff: All Members</option>
            {[...new Set(completedTasks.map((t) => t.assignedTo))].map((assignee) => (
              <option key={assignee}>{assignee}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="tasks-table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>TASK NAME</th>
                <th>ASSIGNED TO</th>
                <th>DEPARTMENT</th>
                <th>DATE COMPLETED</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-results">No completed tasks found.</td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t._id} className="completed-row">
                    <td>
                      <div className="task-name-col">
                        <span className="task-row-name">{t.title}</span>
                        <span className="task-row-id">#{t.id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="assignee-cell">
                        <div className="assignee-avatar" style={{ background: t.avatarBg }}>
                          {t.initials}
                        </div>
                        <span className="assignee-name">{t.assignedTo}</span>
                      </div>
                    </td>
                    <td className="dept-cell">{t.dept}</td>
                    <td className="date-cell">{t.dateCompleted}</td>
                    <td>
                      <span className="completed-status-badge">
                        <CheckCircleIcon /> Completed
                      </span>
                    </td>
                    <td>
                      <button className="view-details-btn">
                        <EyeIcon /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination footer */}
          <div className="table-footer">
            <span className="showing-text">
              Showing 1 to {filtered.length} of 124 results
            </span>
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-ellipsis">…</span>
              <button className="page-btn">31</button>
            </div>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="completed-stats-row">
          <div className="completed-stat-card">
            <div className="csc-top">
              <span className="csc-label">Completion Rate</span>
              <span className="csc-trend">
                <TrendUpIcon /> +12.5%
              </span>
            </div>
            <div className="csc-value">94.2%</div>
            <div className="csc-sub">this month</div>
            <div className="csc-bar-track">
              <div className="csc-bar-fill" style={{ width: "94.2%" }} />
            </div>
          </div>

          <div className="completed-stat-card">
            <div className="csc-top">
              <span className="csc-label">Total Completed</span>
              <span className="csc-icon-wrap">
                <CheckCircleIcon />
              </span>
            </div>
            <div className="csc-value">1,204</div>
            <div className="csc-sub">Lifetime</div>
            <div className="csc-bar-track">
              <div className="csc-bar-fill" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
