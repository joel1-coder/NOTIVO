import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

/* ── Action colour map ──────────────────────── */
const actionMeta = {
  "Login":         { bg: "#DBEAFE", color: "#1E40AF" },
  "Logout":        { bg: "#F3F4F6", color: "#6B7280" },
  "Task Created":  { bg: "#DCFCE7", color: "#166534" },
  "Task Updated":  { bg: "#FEF3C7", color: "#92400E" },
  "Task Deleted":  { bg: "#FEE2E2", color: "#B91C1C" },
  "Role Changed":  { bg: "#EDE9FE", color: "#5B21B6" },
  "File Uploaded": { bg: "#DBEAFE", color: "#1E40AF" },
  "User Created":  { bg: "#DCFCE7", color: "#166534" },
  "User Deactivated": { bg: "#FEE2E2", color: "#B91C1C" },
};

const successMeta = {
  "Success": { bg: "#DCFCE7", color: "#166534" },
  "Failed":  { bg: "#FEE2E2", color: "#B91C1C" },
  "Warning": { bg: "#FEF3C7", color: "#92400E" },
};

/* ── Log Data ────────────────────────────────── */
const logs = [
  { id:"LOG-001", timestamp:"28 Oct 2023, 09:12 AM", user:"Alex Rivera",   action:"Login",            resource:"Auth System",       ip:"192.168.1.101", status:"Success" },
  { id:"LOG-002", timestamp:"28 Oct 2023, 09:15 AM", user:"Alex Rivera",   action:"Task Created",     resource:"TSK-9902",          ip:"192.168.1.101", status:"Success" },
  { id:"LOG-003", timestamp:"28 Oct 2023, 10:02 AM", user:"Sarah Jenkins", action:"Login",            resource:"Auth System",       ip:"192.168.2.45",  status:"Failed"  },
  { id:"LOG-004", timestamp:"28 Oct 2023, 10:30 AM", user:"Robert Chen",   action:"Role Changed",     resource:"USR-004",           ip:"192.168.1.200", status:"Success" },
  { id:"LOG-005", timestamp:"28 Oct 2023, 11:00 AM", user:"Alex Rivera",   action:"File Uploaded",    resource:"Q3_Report.pdf",     ip:"192.168.1.101", status:"Success" },
  { id:"LOG-006", timestamp:"28 Oct 2023, 11:45 AM", user:"Dr. Priya Nair",action:"Task Updated",     resource:"TSK-8834",          ip:"192.168.3.10",  status:"Success" },
  { id:"LOG-007", timestamp:"28 Oct 2023, 12:30 PM", user:"Alex Rivera",   action:"User Created",     resource:"USR-008",           ip:"192.168.1.101", status:"Success" },
  { id:"LOG-008", timestamp:"28 Oct 2023, 01:15 PM", user:"Robert Chen",   action:"Task Deleted",     resource:"TSK-4001",          ip:"192.168.1.200", status:"Warning" },
  { id:"LOG-009", timestamp:"28 Oct 2023, 02:00 PM", user:"Linda Torres",  action:"Login",            resource:"Auth System",       ip:"192.168.5.21",  status:"Success" },
  { id:"LOG-010", timestamp:"28 Oct 2023, 03:10 PM", user:"Alex Rivera",   action:"User Deactivated", resource:"USR-007",           ip:"192.168.1.101", status:"Success" },
  { id:"LOG-011", timestamp:"27 Oct 2023, 09:00 AM", user:"James Okafor",  action:"Task Created",     resource:"TSK-5490",          ip:"192.168.4.88",  status:"Success" },
  { id:"LOG-012", timestamp:"27 Oct 2023, 10:30 AM", user:"Alex Rivera",   action:"Logout",           resource:"Auth System",       ip:"192.168.1.101", status:"Success" },
];

const allActions = ["All", ...Object.keys(actionMeta)];
const allUsers   = ["All", ...new Set(logs.map(l => l.user))];

/* ── Component ──────────────────────────────── */
export default function AuditLogPage() {
  const [search, setSearch]         = useState("");
  const [actionFilter, setAction]   = useState("All");
  const [userFilter, setUser]       = useState("All");
  const [statusFilter, setStatus]   = useState("All");

  const filtered = logs.filter(l => {
    const q = search.toLowerCase();
    const matchQ   = l.id.toLowerCase().includes(q) || l.user.toLowerCase().includes(q) || l.resource.toLowerCase().includes(q);
    const matchAct = actionFilter === "All" || l.action === actionFilter;
    const matchUsr = userFilter   === "All" || l.user   === userFilter;
    const matchSt  = statusFilter === "All" || l.status === statusFilter;
    return matchQ && matchAct && matchUsr && matchSt;
  });

  const handleExport = () => {
    const rows = [
      ["ID","Timestamp","User","Action","Resource","IP","Status"],
      ...filtered.map(l => [l.id, l.timestamp, l.user, l.action, l.resource, l.ip, l.status])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "audit_log.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Audit Log</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Audit Log</h1>
            <p className="tasks-subtitle">Track all system activities, user actions, and security events.</p>
          </div>
          <button className="export-btn" onClick={handleExport}>
            <DownloadIcon /> Export CSV
          </button>
        </div>

        {/* Summary cards */}
        <div className="audit-summary-row">
          {[
            { label: "Total Events",   value: logs.length,                                              color: "#1E3A5F" },
            { label: "Success",        value: logs.filter(l=>l.status==="Success").length,              color: "#10B981" },
            { label: "Failed",         value: logs.filter(l=>l.status==="Failed").length,               color: "#EF4444" },
            { label: "Warnings",       value: logs.filter(l=>l.status==="Warning").length,              color: "#F59E0B" },
          ].map(c => (
            <div key={c.label} className="audit-summary-card" style={{ borderTop: `3px solid ${c.color}` }}>
              <div className="asc-value" style={{ color: c.color }}>{c.value}</div>
              <div className="asc-label">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="tasks-filter-bar">
          <div className="tasks-search" style={{ flex: 1 }}>
            <FilterIcon />
            <input type="text" placeholder="Search by user, resource or log ID…"
              className="tasks-search-input" value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="tasks-select" value={actionFilter} onChange={e => setAction(e.target.value)}>
            {allActions.map(a => <option key={a}>{a === "All" ? "Action: All" : a}</option>)}
          </select>
          <select className="tasks-select" value={userFilter} onChange={e => setUser(e.target.value)}>
            {allUsers.map(u => <option key={u}>{u === "All" ? "User: All" : u}</option>)}
          </select>
          <select className="tasks-select" value={statusFilter} onChange={e => setStatus(e.target.value)}>
            {["All","Success","Failed","Warning"].map(s => <option key={s}>{s === "All" ? "Status: All" : s}</option>)}
          </select>
        </div>

        {/* Log Table */}
        <div className="tasks-table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>LOG ID</th>
                <th>TIMESTAMP</th>
                <th>USER</th>
                <th>ACTION</th>
                <th>RESOURCE</th>
                <th>IP ADDRESS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={7} className="no-results">No log entries found.</td></tr>
                : filtered.map(l => {
                  const am = actionMeta[l.action] || { bg:"#F3F4F6", color:"#374151" };
                  const sm = successMeta[l.status];
                  return (
                    <tr key={l.id}>
                      <td><span className="log-id-badge">{l.id}</span></td>
                      <td className="log-timestamp">{l.timestamp}</td>
                      <td><span className="assignee-name">{l.user}</span></td>
                      <td><span className="task-status-badge" style={{ background: am.bg, color: am.color }}>{l.action}</span></td>
                      <td className="log-resource">{l.resource}</td>
                      <td className="log-ip">{l.ip}</td>
                      <td><span className="task-status-badge" style={{ background: sm.bg, color: sm.color }}>{l.status}</span></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="table-footer">
            <span className="showing-text">Showing {filtered.length} of {logs.length} entries</span>
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
