import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* CSS class map — no inline styles, works in dark mode */
const actionClass = {
  "Login":           "al-act-blue",
  "Logout":          "al-act-gray",
  "Task Created":    "al-act-green",
  "Task Updated":    "al-act-amber",
  "Task Deleted":    "al-act-red",
  "Role Changed":    "al-act-purple",
  "File Uploaded":   "al-act-blue",
  "User Created":    "al-act-green",
  "User Deactivated":"al-act-red",
};
const actionIcon = {
  "Login":"🔐","Logout":"🚪","Task Created":"✅","Task Updated":"✏️",
  "Task Deleted":"🗑️","Role Changed":"🛡️","File Uploaded":"📁",
  "User Created":"👤","User Deactivated":"⛔",
};
const statusClass = { "Success":"al-st-green","Failed":"al-st-red","Warning":"al-st-amber" };
const statusIcon  = { "Success":"✅","Failed":"❌","Warning":"⚠️" };

const logs = [
  { id:"LOG-001", timestamp:"28 Oct 2023, 09:12 AM", user:"Alex Rivera",    initials:"AR", bg:"#6366F1", action:"Login",            resource:"Auth System",   ip:"192.168.1.101", status:"Success" },
  { id:"LOG-002", timestamp:"28 Oct 2023, 09:15 AM", user:"Alex Rivera",    initials:"AR", bg:"#6366F1", action:"Task Created",     resource:"TSK-9902",      ip:"192.168.1.101", status:"Success" },
  { id:"LOG-003", timestamp:"28 Oct 2023, 10:02 AM", user:"Sarah Jenkins",  initials:"SJ", bg:"#10B981", action:"Login",            resource:"Auth System",   ip:"192.168.2.45",  status:"Failed"  },
  { id:"LOG-004", timestamp:"28 Oct 2023, 10:30 AM", user:"Robert Chen",    initials:"RC", bg:"#EF4444", action:"Role Changed",     resource:"USR-004",       ip:"192.168.1.200", status:"Success" },
  { id:"LOG-005", timestamp:"28 Oct 2023, 11:00 AM", user:"Alex Rivera",    initials:"AR", bg:"#6366F1", action:"File Uploaded",    resource:"Q3_Report.pdf", ip:"192.168.1.101", status:"Success" },
  { id:"LOG-006", timestamp:"28 Oct 2023, 11:45 AM", user:"Dr. Priya Nair", initials:"PN", bg:"#8B5CF6", action:"Task Updated",     resource:"TSK-8834",      ip:"192.168.3.10",  status:"Success" },
  { id:"LOG-007", timestamp:"28 Oct 2023, 12:30 PM", user:"Alex Rivera",    initials:"AR", bg:"#6366F1", action:"User Created",     resource:"USR-008",       ip:"192.168.1.101", status:"Success" },
  { id:"LOG-008", timestamp:"28 Oct 2023, 01:15 PM", user:"Robert Chen",    initials:"RC", bg:"#EF4444", action:"Task Deleted",     resource:"TSK-4001",      ip:"192.168.1.200", status:"Warning" },
  { id:"LOG-009", timestamp:"28 Oct 2023, 02:00 PM", user:"Linda Torres",   initials:"LT", bg:"#06B6D4", action:"Login",            resource:"Auth System",   ip:"192.168.5.21",  status:"Success" },
  { id:"LOG-010", timestamp:"28 Oct 2023, 03:10 PM", user:"Alex Rivera",    initials:"AR", bg:"#6366F1", action:"User Deactivated", resource:"USR-007",       ip:"192.168.1.101", status:"Success" },
  { id:"LOG-011", timestamp:"27 Oct 2023, 09:00 AM", user:"James Okafor",   initials:"JO", bg:"#F97316", action:"Task Created",     resource:"TSK-5490",      ip:"192.168.4.88",  status:"Success" },
  { id:"LOG-012", timestamp:"27 Oct 2023, 10:30 AM", user:"Alex Rivera",    initials:"AR", bg:"#6366F1", action:"Logout",           resource:"Auth System",   ip:"192.168.1.101", status:"Success" },
];

const allActions = ["All","Login","Logout","Task Created","Task Updated","Task Deleted","Role Changed","File Uploaded","User Created","User Deactivated"];
const allUsers   = ["All",...new Set(logs.map(l => l.user))];

export default function AuditLogPage() {
  const [search,       setSearch]  = useState("");
  const [actionFilter, setAction]  = useState("All");
  const [userFilter,   setUser]    = useState("All");
  const [statusFilter, setStatus]  = useState("All");

  const filtered = logs.filter(l => {
    const q = search.toLowerCase();
    return (
      (l.id.toLowerCase().includes(q) || l.user.toLowerCase().includes(q) ||
       l.resource.toLowerCase().includes(q) || l.action.toLowerCase().includes(q)) &&
      (actionFilter === "All" || l.action === actionFilter) &&
      (userFilter   === "All" || l.user   === userFilter)   &&
      (statusFilter === "All" || l.status === statusFilter)
    );
  });

  const handleExport = () => {
    const rows = [["ID","Timestamp","User","Action","Resource","IP","Status"],
      ...filtered.map(l => [l.id,l.timestamp,l.user,l.action,l.resource,l.ip,l.status])];
    const blob = new Blob([rows.map(r=>r.join(",")).join("\n")],{type:"text/csv"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href=url; a.download="audit_log.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const counts = {
    total:   logs.length,
    success: logs.filter(l=>l.status==="Success").length,
    failed:  logs.filter(l=>l.status==="Failed").length,
    warning: logs.filter(l=>l.status==="Warning").length,
  };

  return (
    <Layout>
      <div className="tasks-page">
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">Audit Log</span>
        </nav>

        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Audit Log</h1>
            <p className="tasks-subtitle">Track all system activities, user actions and security events in real time.</p>
          </div>
          <button className="al-export-btn" onClick={handleExport}>
            ⬇ Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        <div className="audit-summary-row">
          {[
            { label:"Total Events", value:counts.total,   cls:"al-sum-blue",  icon:"📋", pct:100 },
            { label:"Success",      value:counts.success, cls:"al-sum-green", icon:"✅", pct:Math.round(counts.success/counts.total*100) },
            { label:"Failed",       value:counts.failed,  cls:"al-sum-red",   icon:"❌", pct:Math.round(counts.failed/counts.total*100)  },
            { label:"Warnings",     value:counts.warning, cls:"al-sum-amber", icon:"⚠️", pct:Math.round(counts.warning/counts.total*100) },
          ].map(c => (
            <div key={c.label} className={`audit-summary-card al-sum-card ${c.cls}`}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <span className="asc-label">{c.label}</span>
                <span style={{fontSize:20}}>{c.icon}</span>
              </div>
              <div className="asc-value">{c.value}</div>
              <div style={{height:4,background:"rgba(0,0,0,0.06)",borderRadius:99,marginTop:8,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${c.pct}%`,borderRadius:99,background:"currentColor",opacity:0.4}}/>
              </div>
              <div style={{fontSize:11,marginTop:4,color:"var(--text-tertiary,#9CA3AF)"}}>{c.pct}% of total</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="tasks-filter-bar">
          <div className="tasks-search" style={{flex:1}}>
            🔍
            <input type="text" placeholder="Search by user, resource, action or log ID…"
              className="tasks-search-input" value={search}
              onChange={e=>setSearch(e.target.value)}/>
          </div>
          <select className="tasks-select" value={actionFilter} onChange={e=>setAction(e.target.value)}>
            {allActions.map(a=><option key={a} value={a}>{a==="All"?"Action: All":a}</option>)}
          </select>
          <select className="tasks-select" value={userFilter} onChange={e=>setUser(e.target.value)}>
            {allUsers.map(u=><option key={u} value={u}>{u==="All"?"User: All":u}</option>)}
          </select>
          <select className="tasks-select" value={statusFilter} onChange={e=>setStatus(e.target.value)}>
            {["All","Success","Failed","Warning"].map(s=><option key={s} value={s}>{s==="All"?"Status: All":s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="tasks-table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>LOG ID</th><th>TIMESTAMP</th><th>USER</th>
                <th>ACTION</th><th>RESOURCE</th><th>IP ADDRESS</th><th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={7} className="no-results">No log entries match your filters.</td></tr>
                : filtered.map(l => (
                  <tr key={l.id}>
                    <td><span className="log-id-badge">{l.id}</span></td>
                    <td className="log-timestamp">{l.timestamp}</td>
                    <td>
                      <div className="assignee-cell">
                        <div className="assignee-avatar"
                          style={{background:l.bg,width:30,height:30,fontSize:11,borderRadius:8,flexShrink:0}}>
                          {l.initials}
                        </div>
                        <span className="assignee-name" style={{fontSize:13}}>{l.user}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`task-status-badge ${actionClass[l.action]||"al-act-gray"}`}>
                        {actionIcon[l.action]} {l.action}
                      </span>
                    </td>
                    <td className="log-resource">{l.resource}</td>
                    <td className="log-ip">{l.ip}</td>
                    <td>
                      <span className={`task-status-badge ${statusClass[l.status]}`}>
                        {statusIcon[l.status]} {l.status}
                      </span>
                    </td>
                  </tr>
                ))
              }
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
