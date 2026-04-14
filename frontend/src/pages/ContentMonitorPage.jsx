import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
);
const EyeIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const DownloadIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
);

const initContent = [
  { id:1, title:"Annual Tech Symposium Poster",      type:"Invitation",  uploadedBy:"Dr. Sarah Jenkins",    dept:"Computer Science",       date:"Oct 20, 2024", size:"2.4 MB",  status:"Approved",  views:142, icon:"🎓" },
  { id:2, title:"Workshop Banner - AI & ML",         type:"Circular",    uploadedBy:"Prof. David Miller",   dept:"Electrical Engineering",  date:"Oct 19, 2024", size:"1.8 MB",  status:"Approved",  views:89,  icon:"📋" },
  { id:3, title:"Cultural Fest 2024 Invitation",     type:"Invitation",  uploadedBy:"Prof. James Okafor",   dept:"Mechanical Engineering",  date:"Oct 18, 2024", size:"3.1 MB",  status:"Rejected",  views:34,  icon:"🎭" },
  { id:4, title:"Science Day Seminar Notice",        type:"Notice",      uploadedBy:"Dr. Priya Nair",       dept:"Physics",                 date:"Oct 22, 2024", size:"0.9 MB",  status:"Pending",   views:0,   icon:"🔬" },
  { id:5, title:"Sports Meet Schedule",              type:"Report",      uploadedBy:"Mr. Ramesh Babu",      dept:"Physical Education",      date:"Oct 21, 2024", size:"1.2 MB",  status:"Approved",  views:78,  icon:"⚽" },
  { id:6, title:"Inter-College Debate Circular",     type:"Circular",    uploadedBy:"Dr. Lakshmi Patel",    dept:"Arts & Humanities",       date:"Oct 23, 2024", size:"1.5 MB",  status:"Pending",   views:0,   icon:"🎤" },
  { id:7, title:"Robotics Expo Exhibition Plan",     type:"Report",      uploadedBy:"Prof. James Okafor",   dept:"Mechanical Engineering",  date:"Oct 24, 2024", size:"4.2 MB",  status:"Pending",   views:0,   icon:"🤖" },
  { id:8, title:"Holiday Notice - Diwali 2024",      type:"Notice",      uploadedBy:"Admin",                dept:"Administration",          date:"Oct 25, 2024", size:"0.4 MB",  status:"Approved",  views:590, icon:"📣" },
];

const STATUS_STYLE = {
  "Approved": { bg:"#DCFCE7", color:"#166534" },
  "Rejected": { bg:"#FEE2E2", color:"#B91C1C" },
  "Pending":  { bg:"#FEF3C7", color:"#92400E" },
};
const TYPE_STYLE = {
  "Invitation": { bg:"#EDE9FE", color:"#5B21B6" },
  "Circular":   { bg:"#DBEAFE", color:"#1D4ED8" },
  "Notice":     { bg:"#FEF3C7", color:"#92400E" },
  "Report":     { bg:"#F0FDF4", color:"#166534" },
};

const TYPES    = ["All Types","Invitation","Circular","Notice","Report"];
const STATUSES = ["All Status","Approved","Pending","Rejected"];

export default function ContentMonitorPage() {
  const navigate = useNavigate();
  const [content, setContent]   = useState(initContent);
  const [typeF, setTypeF]       = useState("All Types");
  const [statusF, setStatusF]   = useState("All Status");
  const [search, setSearch]     = useState("");
  const [toastMsg, setToast]    = useState("");

  const toast = (m) => { setToast(m); setTimeout(() => setToast(""), 2600); };

  const filtered = content.filter(c => {
    const matchType   = typeF   === "All Types"   || c.type   === typeF;
    const matchStatus = statusF === "All Status"  || c.status === statusF;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.dept.toLowerCase().includes(search.toLowerCase()) ||
                        c.uploadedBy.toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const handleDelete = (id) => {
    setContent(prev => prev.filter(c => c.id !== id));
    toast("Content removed.");
  };

  const updateStatus = (id, newStatus) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    toast(`Status updated to ${newStatus}.`);
  };

  const counts = {
    total:    content.length,
    approved: content.filter(c => c.status === "Approved").length,
    pending:  content.filter(c => c.status === "Pending").length,
    rejected: content.filter(c => c.status === "Rejected").length,
  };

  return (
    <Layout>
      <div className="tasks-page">
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">Content Monitor</span>
        </nav>

        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Content Monitor</h1>
            <p className="tasks-subtitle">Monitor, approve and manage all uploaded content from departments.</p>
          </div>
          <Link to="/submissions" className="es-review-btn">📁 View Submissions</Link>
        </div>

        {/* Stats */}
        <div className="es-stats-grid">
          {[
            { label:"Total Content",  value:counts.total,    icon:"📂", color:"#2563EB", bg:"#DBEAFE" },
            { label:"Approved",       value:counts.approved, icon:"✅", color:"#166534", bg:"#DCFCE7" },
            { label:"Pending Review", value:counts.pending,  icon:"⏳", color:"#92400E", bg:"#FEF3C7" },
            { label:"Rejected",       value:counts.rejected, icon:"❌", color:"#B91C1C", bg:"#FEE2E2" },
          ].map(c => (
            <div key={c.label} className="es-stat-card">
              <div className="es-stat-icon" style={{ background:c.bg }}>{c.icon}</div>
              <div>
                <div className="es-stat-value" style={{ color:c.color }}>{c.value}</div>
                <div className="es-stat-label">{c.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="es-filter-bar">
          <div className="es-filter-tabs">
            {TYPES.map(t => (
              <button key={t} className={`notif-filter-tab ${typeF===t?"notif-tab-active":""}`}
                onClick={() => setTypeF(t)}>{t}</button>
            ))}
          </div>
          <div className="es-filter-right">
            <select className="es-dept-select" value={statusF} onChange={e => setStatusF(e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="es-search-wrap">
              <svg width="15" height="15" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input className="es-search-input" placeholder="Search content…"
                value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>

        {toastMsg && <div className="notif-flash">{toastMsg}</div>}

        {/* Table */}
        <div className="tasks-table-card">
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                {["Content","Type","Uploaded By","Department","Date","Size","Views","Status","Actions"].map(h => (
                  <th key={h} className="es-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="es-empty-row">No content found.</td></tr>
              )}
              {filtered.map(c => {
                const sBadge = STATUS_STYLE[c.status];
                const tBadge = TYPE_STYLE[c.type];
                return (
                  <tr key={c.id} className="es-tr">
                    <td className="es-td">
                      <div className="es-event-name-cell">
                        <span className="es-event-icon">{c.icon}</span>
                        <div className="es-event-name" style={{ maxWidth:180 }}>{c.title}</div>
                      </div>
                    </td>
                    <td className="es-td">
                      <span className="task-status-badge" style={{ background:tBadge.bg, color:tBadge.color }}>
                        {c.type}
                      </span>
                    </td>
                    <td className="es-td es-hod-cell">{c.uploadedBy}</td>
                    <td className="es-td es-dept-cell">{c.dept}</td>
                    <td className="es-td es-date-cell">{c.date}</td>
                    <td className="es-td es-date-cell">{c.size}</td>
                    <td className="es-td">
                      <span className="cm-views-badge">👁 {c.views}</span>
                    </td>
                    <td className="es-td">
                      <select className="cm-status-select"
                        style={{ background:sBadge.bg, color:sBadge.color }}
                        value={c.status} onChange={e => updateStatus(c.id, e.target.value)}>
                        {["Approved","Pending","Rejected"].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="es-td">
                      <div className="cm-actions-row">
                        <button className="cm-action-btn view-btn"   title="Review" onClick={() => navigate("/documents")}>
                          <EyeIcon/>
                        </button>
                        <button className="cm-action-btn dl-btn"     title="Download">
                          <DownloadIcon/>
                        </button>
                        <button className="cm-action-btn trash-btn"  title="Delete" onClick={() => handleDelete(c.id)}>
                          <TrashIcon/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="es-footer-row">
          Showing <strong>{filtered.length}</strong> of <strong>{content.length}</strong> items
        </div>
      </div>
    </Layout>
  );
}
