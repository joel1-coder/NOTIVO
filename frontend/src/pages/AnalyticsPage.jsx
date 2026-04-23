import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const TrophyIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);
const BarChartIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

/* ── Data ─────────────────────────────────── */
const months = ["Jun","Jul","Aug","Sep","Oct","Nov"];
const completedData  = [72, 85, 91, 78, 94, 88];
const pendingData    = [28, 15,  9, 22,  6, 12];
const incompleteData = [18, 11,  6, 14,  8, 10];
const maxVal = 100;

const deptStats = [
  { dept:"Finance",         completed:94, pending:4,  incomplete:2,  color:"#6366F1" },
  { dept:"Engineering",     completed:88, pending:8,  incomplete:4,  color:"#10B981" },
  { dept:"Human Resources", completed:76, pending:14, incomplete:10, color:"#8B5CF6" },
  { dept:"Marketing",       completed:91, pending:6,  incomplete:3,  color:"#F59E0B" },
  { dept:"Legal",           completed:83, pending:11, incomplete:6,  color:"#EF4444" },
  { dept:"Design",          completed:97, pending:2,  incomplete:1,  color:"#06B6D4" },
];

const topPerformers = [
  { name:"Sarah Jenkins",  tasks:48, rate:97, initials:"SJ", bg:"#10B981" },
  { name:"Alex Rivera",    tasks:42, rate:94, initials:"AR", bg:"#6366F1" },
  { name:"Robert Chen",    tasks:39, rate:92, initials:"RC", bg:"#EF4444" },
  { name:"Linda Torres",   tasks:35, rate:89, initials:"LT", bg:"#06B6D4" },
  { name:"Dr. Priya Nair", tasks:31, rate:87, initials:"PN", bg:"#8B5CF6" },
];

const summaryCards = [
  { label:"Overall Completion", value:"91.2%",   sub:"This month",    icon:"✅", colorClass:"analytics-card-green"  },
  { label:"Total Tasks",        value:"1,872",    sub:"All time",      icon:"📋", colorClass:"analytics-card-blue"   },
  { label:"Avg. Task Duration", value:"3.4 days", sub:"Per task",      icon:"⏱️", colorClass:"analytics-card-amber"  },
  { label:"Active Staff",       value:"47",       sub:"Contributing",  icon:"👥", colorClass:"analytics-card-purple" },
];

/* ── Donut helper ──────────────────────────── */
function DonutRing({ pct, color, size = 70, stroke = 9 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-surface-3,#F3F4F6)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
        style={{ transition:"stroke-dasharray 0.6s ease" }}/>
    </svg>
  );
}

/* ── Component ─────────────────────────────── */
export default function AnalyticsPage() {
  const [activeMonth, setActiveMonth] = useState(4);
  const navigate = useNavigate();

  const sel = {
    completed:  completedData[activeMonth],
    pending:    pendingData[activeMonth],
    incomplete: incompleteData[activeMonth],
    month:      months[activeMonth],
  };

  return (
    <Layout>
      <div className="analytics-page">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">Analytics</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Analytics</h1>
            <p className="tasks-subtitle">
              Insights into task performance, staff productivity and departmental output.
            </p>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:12.5, color:"var(--text-tertiary,#9CA3AF)", fontWeight:500 }}>Filter by month:</span>
            <div className="month-tabs">
              {months.map((m,i) => (
                <button key={m}
                  className={`month-tab ${activeMonth === i ? "month-tab-active" : ""}`}
                  onClick={() => setActiveMonth(i)}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Cards — dark-mode safe using CSS classes */}
        <div className="analytics-summary-grid">
          {summaryCards.map(c => (
            <div key={c.label} className={`analytics-summary-card analytics-sc-base ${c.colorClass}`}>
              <div className="asc2-top">
                <span className="asc2-label">{c.label}</span>
                <span style={{ fontSize:20 }}>{c.icon}</span>
              </div>
              <div className="asc2-value">{c.value}</div>
              <div className="asc2-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Selected month snapshot */}
        <div style={{
          display:"flex", gap:16, padding:"16px 20px",
          background:"var(--bg-surface,#fff)", border:"1px solid var(--border-light,#E8EBF4)",
          borderRadius:14, alignItems:"center"
        }}>
          <span style={{ fontSize:13, fontWeight:700, color:"var(--text-secondary,#374151)" }}>
            📅 {sel.month} Snapshot:
          </span>
          <div style={{ display:"flex", gap:24, flex:1 }}>
            {[
              { label:"Completed",  value:`${sel.completed}%`,  color:"#22c55e" },
              { label:"Pending",    value:`${sel.pending}%`,    color:"#f59e0b" },
              { label:"Incomplete", value:`${sel.incomplete}%`, color:"#ef4444" },
            ].map(s => (
              <div key={s.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:s.color, flexShrink:0 }}/>
                <span style={{ fontSize:12.5, color:"var(--text-secondary,#374151)" }}>{s.label}:</span>
                <span style={{ fontSize:13, fontWeight:800, color:s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            {[
              { pct:sel.completed,  color:"#22c55e", label:`${sel.completed}%` },
            ].map((d,i) => (
              <div key={i} style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
                <DonutRing pct={d.pct} color={d.color} size={68} stroke={8}/>
                <span style={{ position:"absolute", fontSize:12, fontWeight:800, color:d.color }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-main-grid">
          {/* Bar Chart */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <div>
                <h3 className="analytics-card-title">
                  <span style={{ marginRight:7 }}><BarChartIcon/></span>
                  Monthly Task Overview
                </h3>
              </div>
              <div className="chart-legend">
                <span className="legend-dot" style={{ background:"#6366F1" }}/> Completed
                <span className="legend-dot" style={{ background:"#F59E0B" }}/> Pending
                <span className="legend-dot" style={{ background:"#EF4444" }}/> Incomplete
              </div>
            </div>
            <div className="bar-chart-wrap">
              {months.map((m, i) => (
                <div key={m}
                  className={`bar-group ${activeMonth === i ? "bar-group-active" : ""}`}
                  onClick={() => setActiveMonth(i)}>
                  <div className="bar-stack">
                    <div className="bar-segment bar-incomplete"
                      style={{ height:`${(incompleteData[i]/maxVal)*160}px` }}/>
                    <div className="bar-segment bar-pending"
                      style={{ height:`${(pendingData[i]/maxVal)*160}px` }}/>
                    <div className="bar-segment"
                      style={{ height:`${(completedData[i]/maxVal)*160}px`, background:"#6366F1" }}/>
                  </div>
                  <div className="bar-label">{m}</div>
                  {activeMonth === i && (
                    <div className="bar-tooltip">
                      <div style={{ color:"#a5b4fc" }}>✅ {completedData[i]}%</div>
                      <div style={{ color:"#fcd34d" }}>⏳ {pendingData[i]}%</div>
                      <div style={{ color:"#fda4af" }}>❌ {incompleteData[i]}%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">
                <span style={{ marginRight:7 }}><TrophyIcon/></span>
                Top Performers
              </h3>
              <span className="analytics-badge">This Month</span>
            </div>
            <div className="performers-list">
              {topPerformers.map((p, i) => (
                <div key={p.name} className="performer-row">
                  <div className="performer-rank"
                    style={{ color: i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : i === 2 ? "#cd7c2f" : "var(--text-tertiary,#9CA3AF)" }}>
                    {i < 3 ? ["🥇","🥈","🥉"][i] : i + 1}
                  </div>
                  <div className="assignee-avatar" style={{ background:p.bg, width:34, height:34, fontSize:12, borderRadius:8 }}>
                    {p.initials}
                  </div>
                  <div className="performer-info">
                    <div className="performer-name">{p.name}</div>
                    <div className="performer-bar-track">
                      <div className="performer-bar-fill"
                        style={{ width:`${p.rate}%`, background:p.bg }}/>
                    </div>
                  </div>
                  <div className="performer-stats">
                    <div className="performer-rate">{p.rate}%</div>
                    <div className="performer-tasks">{p.tasks} tasks</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3 className="analytics-card-title">Department Performance Breakdown</h3>
            <span className="analytics-badge">{sel.month} 2024</span>
          </div>
          <div className="dept-breakdown-grid">
            {deptStats.map(d => (
              <div key={d.dept} className="dept-row">
                <div className="dept-name-label">
                  <span className="dept-dot" style={{ background: d.color }}/>
                  {d.dept}
                </div>
                <div className="dept-bars">
                  {[
                    { label:"Completed", val:d.completed, color:d.color },
                    { label:"Pending",   val:d.pending,   color:"#F59E0B" },
                    { label:"Incomplete",val:d.incomplete, color:"#EF4444" },
                  ].map(bar => (
                    <div key={bar.label} className="dept-bar-item">
                      <span className="dept-bar-label">{bar.label}</span>
                      <div className="dept-bar-track">
                        <div className="dept-bar-fill" style={{ width:`${bar.val}%`, background:bar.color }}/>
                      </div>
                      <span className="dept-bar-val">{bar.val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
