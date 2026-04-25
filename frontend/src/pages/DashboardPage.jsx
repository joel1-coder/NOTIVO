import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import axiosInstance from "../api/axiosInstance";

/* ── Icons ─────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 5 19 12"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const TrendUpIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const TrendDownIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
    <polyline points="17 18 23 18 23 12"/>
  </svg>
);



const activities = [
  { id:1, task:"UI Design System",      assignee:"Alex Rivera",    initials:"AR", avatarBg:"#f97316", status:"Completed",   statusClass:"badge-completed",  date:"Oct 24, 2023", dept:"Design" },
  { id:2, task:"API Integration",        assignee:"Sarah Chen",     initials:"SC", avatarBg:"#8b5cf6", status:"In Progress", statusClass:"badge-inprogress", date:"Oct 26, 2023", dept:"Engineering" },
  { id:3, task:"User Testing",           assignee:"Mike Johnson",   initials:"MJ", avatarBg:"#06b6d4", status:"Pending",     statusClass:"badge-pending",    date:"Oct 28, 2023", dept:"QA" },
  { id:4, task:"Database Optimization",  assignee:"Priya Nair",     initials:"PN", avatarBg:"#6366f1", status:"Completed",   statusClass:"badge-completed",  date:"Oct 30, 2023", dept:"Backend" },
  { id:5, task:"Security Audit",         assignee:"Robert Chen",    initials:"RC", avatarBg:"#ec4899", status:"In Progress", statusClass:"badge-inprogress", date:"Nov 01, 2023", dept:"Security" },
];

const quickActions = [
  { label:"Upload File",       icon:"📁", path:"/files",           color:"#6366f1" },
  { label:"Manage Roles",      icon:"🛡️", path:"/roles",           color:"#3b82f6" },
  { label:"Send Notification", icon:"📣", path:"/compose",         color:"#10b981" },
  { label:"View Analytics",    icon:"📊", path:"/analytics",       color:"#f59e0b" },
  { label:"Event Submissions", icon:"📅", path:"/submissions",     color:"#ef4444" },
  { label:"Document Review",   icon:"📄", path:"/documents",       color:"#8b5cf6" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

/* ── Component ──────────────────────────────────────────── */
export default function DashboardPage() {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [hoveredStat, setHoveredStat] = useState(null);
  const [taskStats, setTaskStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/tasks/stats");
      setTaskStats(data.data || {});
      setError("");
    } catch (err) {
      setError("Failed to fetch statistics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const dynamicStats = [
    {
      label: "Completed Tasks",
      value: String(taskStats.completed || 0),
      change: "+12.5%",
      positive: true,
      iconColor: "#22c55e",
      iconBg: "rgba(34,197,94,0.12)",
      barColor: "#22c55e",
      barWidth: `${Math.min(100, ((taskStats.completed || 0) / (taskStats.total || 1)) * 100)}%`,
      Icon: CheckIcon,
      link: "/tasks/completed",
    },
    {
      label: "Incomplete Tasks",
      value: String(taskStats.incomplete || 0),
      change: "-5.2%",
      positive: false,
      iconColor: "#ef4444",
      iconBg: "rgba(239,68,68,0.12)",
      barColor: "#ef4444",
      barWidth: `${Math.min(100, ((taskStats.incomplete || 0) / (taskStats.total || 1)) * 100)}%`,
      Icon: XIcon,
      link: "/tasks/incomplete",
    },
    {
      label: "In Progress",
      value: String(taskStats.inProgress || 0),
      change: "+8.1%",
      positive: true,
      iconColor: "#3b82f6",
      iconBg: "rgba(59,130,246,0.12)",
      barColor: "#3b82f6",
      barWidth: `${Math.min(100, ((taskStats.inProgress || 0) / (taskStats.total || 1)) * 100)}%`,
      Icon: UsersIcon,
      link: "/tasks/assigned",
    },
    {
      label: "Pending Tasks",
      value: String(taskStats.pending || 0),
      change: "+15%",
      positive: false,
      iconColor: "#f59e0b",
      iconBg: "rgba(245,158,11,0.12)",
      barColor: "#f59e0b",
      barWidth: `${Math.min(100, ((taskStats.pending || 0) / (taskStats.total || 1)) * 100)}%`,
      Icon: ClockIcon,
      link: "/tasks/pending",
    },
  ];

  return (
    <Layout>
      <div className="dashboard-page">

        {/* Header */}
        <div className="dash-header-row">
          <div>
            <h1 className="dash-title">
              {getGreeting()}, {admin?.name?.split(" ")[0] || "Admin"} 👋
            </h1>
            <p className="dash-subtitle">
              Here's what's happening across your organization today.
            </p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button className="upload-task-btn" onClick={() => navigate("/analytics")}>
              📊 Analytics
            </button>
            <button className="upload-task-btn" onClick={() => navigate("/files")}>
              <UploadIcon /> Upload Task
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="dash-cards-grid">
          {dynamicStats.map((s) => (
            <div
              key={s.label}
              className="dash-stat-card"
              onClick={() => s.link && navigate(s.link)}
              onMouseEnter={() => setHoveredStat(s.label)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{ cursor: "pointer" }}
            >
              <div className="stat-card-top">
                <div className="stat-icon-wrap" style={{ background: s.iconBg, color: s.iconColor }}>
                  <s.Icon />
                </div>
                <span className={`stat-change ${s.positive ? "stat-pos" : "stat-neg"}`}>
                  <span style={{ marginRight:3 }}>{s.positive ? <TrendUpIcon/> : <TrendDownIcon/>}</span>
                  {s.change}
                </span>
              </div>
              <p className="stat-label">{s.label}</p>
              <h2 className="stat-value">{s.value}</h2>
              <div className="stat-bar-track">
                <div className="stat-bar-fill" style={{ width: s.barWidth, background: s.barColor }} />
              </div>
              <span className="card-nav-hint">View details →</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:12, color:"var(--text-primary, #111827)" }}>
            Quick Actions
          </h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12 }}>
            {quickActions.map(q => (
              <button
                key={q.label}
                onClick={() => navigate(q.path)}
                style={{
                  display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                  padding:"16px 8px",
                  background:"var(--bg-surface, #fff)",
                  border:"1px solid var(--border-light, #E8EBF4)",
                  borderRadius:12, cursor:"pointer",
                  transition:"all 0.18s ease",
                  color:"var(--text-secondary, #6B7280)",
                  fontSize:12, fontWeight:600,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = q.color;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 4px 12px ${q.color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border-light, #E8EBF4)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize:24 }}>{q.icon}</span>
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <div className="activity-header">
            <div>
              <h3 className="activity-title">Recent Activity</h3>
              <p style={{ fontSize:12.5, color:"var(--text-tertiary, #9CA3AF)", marginTop:2 }}>
                Latest task updates across all departments
              </p>
            </div>
            <button className="view-all-btn" onClick={() => navigate("/tasks/assigned")}>
              View all →
            </button>
          </div>

          <table className="activity-table">
            <thead>
              <tr>
                <th>TASK NAME</th>
                <th>ASSIGNED TO</th>
                <th>DEPARTMENT</th>
                <th>STATUS</th>
                <th>DUE DATE</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id} style={{ cursor:"pointer" }} onClick={() => navigate("/tasks/assigned")}>
                  <td className="task-name-cell">{a.task}</td>
                  <td>
                    <div className="assignee-cell">
                      <div className="assignee-avatar" style={{ background: a.avatarBg }}>
                        {a.initials}
                      </div>
                      <div>
                        <div className="assignee-name">{a.assignee}</div>
                      </div>
                    </div>
                  </td>
                  <td className="dept-cell">{a.dept}</td>
                  <td>
                    <span className={`status-badge ${a.statusClass}`}>{a.status}</span>
                  </td>
                  <td className="date-cell">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Row: Upcoming Events + System Health */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {/* Upcoming Events */}
          <div className="activity-card">
            <div className="activity-header">
              <h3 className="activity-title">📅 Upcoming Events</h3>
              <button className="view-all-btn" onClick={() => navigate("/submissions")}>See all</button>
            </div>
            {[
              { name:"Annual Tech Symposium 2024", dept:"Computer Science",   date:"Oct 24, 2024", status:"Pending Review", color:"#f59e0b" },
              { name:"AI & ML Workshop 2024",       dept:"Electrical Engg",    date:"Nov 05, 2024", status:"Approved",       color:"#22c55e" },
              { name:"Cultural Fest 2024",           dept:"Mechanical Engg",   date:"Nov 15, 2024", status:"Rejected",       color:"#ef4444" },
            ].map((ev, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"11px 0", borderBottom: i < 2 ? "1px solid var(--border-light, #F3F4F6)" : "none"
              }}>
                <div style={{
                  width:40, height:40, borderRadius:10,
                  background: i === 0 ? "#FEF3C7" : i === 1 ? "#DCFCE7" : "#FEE2E2",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0
                }}>
                  {i === 0 ? "🎤" : i === 1 ? "🤖" : "🎭"}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"var(--text-primary, #111827)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {ev.name}
                  </div>
                  <div style={{ fontSize:11.5, color:"var(--text-tertiary, #9CA3AF)" }}>{ev.dept} · {ev.date}</div>
                </div>
                <span style={{
                  fontSize:10.5, fontWeight:700, padding:"2px 8px", borderRadius:20,
                  background: ev.color === "#f59e0b" ? "#FEF3C7" : ev.color === "#22c55e" ? "#DCFCE7" : "#FEE2E2",
                  color: ev.color, flexShrink:0
                }}>{ev.status}</span>
              </div>
            ))}
          </div>

          {/* System Overview */}
          <div className="activity-card">
            <div className="activity-header">
              <h3 className="activity-title">📈 System Overview</h3>
            </div>
            {[
              { label:"Task Completion Rate", value:91.2, color:"#22c55e",  text:"91.2%" },
              { label:"Staff Active Rate",     value:84,   color:"#3b82f6",  text:"84%" },
              { label:"Docs Reviewed",         value:67,   color:"#8b5cf6",  text:"67%" },
              { label:"Events Approved",       value:75,   color:"#f59e0b",  text:"75%" },
            ].map((m, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? 16 : 0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:12.5, fontWeight:600, color:"var(--text-secondary, #374151)" }}>{m.label}</span>
                  <span style={{ fontSize:12.5, fontWeight:800, color: m.color }}>{m.text}</span>
                </div>
                <div style={{ height:6, background:"var(--bg-surface-3, #F3F4F6)", borderRadius:99, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${m.value}%`, background: m.color, borderRadius:99, transition:"width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}