import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);

const allSubmissions = [
  { id:"EVT-001", eventName:"Annual Tech Symposium 2024",     dept:"Computer Science",       hod:"Dr. Sarah Jenkins",    submitted:"Oct 20, 2024", eventDate:"Oct 24, 2024", status:"Pending Review",  file:"Detailed_Invitation_Final.pdf", icon:"🎓" },
  { id:"EVT-002", eventName:"AI & ML Workshop 2024",         dept:"Electrical Engineering",  hod:"Prof. David Miller",   submitted:"Oct 19, 2024", eventDate:"Nov 05, 2024", status:"Approved",        file:"Workshop_Banner_v2.pdf",         icon:"🤖" },
  { id:"EVT-003", eventName:"Cultural Fest 2024",            dept:"Mechanical Engineering",  hod:"Prof. James Okafor",   submitted:"Oct 18, 2024", eventDate:"Nov 15, 2024", status:"Rejected",        file:"Cultural_Fest_Poster.pdf",        icon:"🎭" },
  { id:"EVT-004", eventName:"National Science Day Seminar",  dept:"Physics",                 hod:"Dr. Priya Nair",       submitted:"Oct 22, 2024", eventDate:"Nov 28, 2024", status:"Pending Review",  file:"Science_Day_Invite.pdf",          icon:"🔬" },
  { id:"EVT-005", eventName:"Sports Meet 2024",              dept:"Physical Education",      hod:"Mr. Ramesh Babu",      submitted:"Oct 21, 2024", eventDate:"Dec 05, 2024", status:"Approved",        file:"Sports_Meet_Banner.pdf",          icon:"⚽" },
  { id:"EVT-006", eventName:"Inter-College Debate",          dept:"Arts & Humanities",       hod:"Dr. Lakshmi Patel",    submitted:"Oct 23, 2024", eventDate:"Dec 10, 2024", status:"Under Review",    file:"Debate_Invitation.pdf",           icon:"🎤" },
  { id:"EVT-007", eventName:"Robotics Expo 2024",            dept:"Mechanical Engineering",  hod:"Prof. James Okafor",   submitted:"Oct 24, 2024", eventDate:"Dec 20, 2024", status:"Pending Review",  file:"Robotics_Expo_Poster.pdf",        icon:"🤖" },
  { id:"EVT-008", eventName:"Annual Literary Meet",          dept:"Arts & Humanities",       hod:"Dr. Lakshmi Patel",    submitted:"Oct 25, 2024", eventDate:"Jan 10, 2025", status:"Approved",        file:"Literary_Meet_Invite.pdf",        icon:"📚" },
];

const STATUS_STYLES = {
  "Pending Review": { bg:"#FEF3C7", color:"#92400E" },
  "Approved":       { bg:"#DCFCE7", color:"#166534" },
  "Rejected":       { bg:"#FEE2E2", color:"#B91C1C" },
  "Under Review":   { bg:"#DBEAFE", color:"#1D4ED8" },
};

const FILTERS = ["All", "Pending Review", "Under Review", "Approved", "Rejected"];
const DEPTS   = ["All Departments", "Computer Science", "Electrical Engineering", "Mechanical Engineering", "Physics", "Physical Education", "Arts & Humanities"];

export default function EventSubmissionsPage() {
  const navigate = useNavigate();
  const [filter, setFilter]   = useState("All");
  const [dept, setDept]       = useState("All Departments");
  const [search, setSearch]   = useState("");

  const filtered = allSubmissions.filter(s => {
    const matchFilter = filter === "All" || s.status === filter;
    const matchDept   = dept === "All Departments" || s.dept === dept;
    const matchSearch = s.eventName.toLowerCase().includes(search.toLowerCase()) ||
                        s.dept.toLowerCase().includes(search.toLowerCase()) ||
                        s.hod.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchDept && matchSearch;
  });

  const counts = {
    total:   allSubmissions.length,
    pending: allSubmissions.filter(s => s.status === "Pending Review").length,
    approved:allSubmissions.filter(s => s.status === "Approved").length,
    rejected:allSubmissions.filter(s => s.status === "Rejected").length,
  };

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">Event Submissions</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Event Submissions</h1>
            <p className="tasks-subtitle">All event documents submitted by departments for admin review.</p>
          </div>
          <Link to="/documents" className="es-review-btn">📋 Open Document Review</Link>
        </div>

        {/* Stats cards */}
        <div className="es-stats-grid">
          {[
            { label:"Total Submissions", value:counts.total,   color:"#2563EB", bg:"#DBEAFE", icon:"📁" },
            { label:"Pending Review",    value:counts.pending,  color:"#92400E", bg:"#FEF3C7", icon:"⏳" },
            { label:"Approved",          value:counts.approved, color:"#166534", bg:"#DCFCE7", icon:"✅" },
            { label:"Rejected",          value:counts.rejected, color:"#B91C1C", bg:"#FEE2E2", icon:"❌" },
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

        {/* Filters */}
        <div className="es-filter-bar">
          <div className="es-filter-tabs">
            {FILTERS.map(f => (
              <button key={f} className={`notif-filter-tab ${filter===f?"notif-tab-active":""}`}
                onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="es-filter-right">
            <select className="es-dept-select" value={dept} onChange={e => setDept(e.target.value)}>
              {DEPTS.map(d => <option key={d}>{d}</option>)}
            </select>
            <div className="es-search-wrap">
              <SearchIcon/>
              <input className="es-search-input" placeholder="Search events…" value={search}
                onChange={e => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="tasks-table-card">
          <table className="tasks-table" style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                {["#","Event Name","Department","HOD","Submitted","Event Date","Status","Action"].map(h => (
                  <th key={h} className="es-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="es-empty-row">No submissions found.</td></tr>
              )}
              {filtered.map(s => {
                const badge = STATUS_STYLES[s.status];
                return (
                  <tr key={s.id} className="es-tr" onClick={() => navigate("/documents")}>
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
                      <span className="task-status-badge" style={{ background:badge.bg, color:badge.color }}>
                        {s.status}
                      </span>
                    </td>
                    <td className="es-td" onClick={e => e.stopPropagation()}>
                      <button className="es-view-btn" onClick={() => navigate("/documents")}>
                        <EyeIcon/> Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="es-footer-row">
          Showing <strong>{filtered.length}</strong> of <strong>{allSubmissions.length}</strong> submissions
        </div>
      </div>
    </Layout>
  );
}
