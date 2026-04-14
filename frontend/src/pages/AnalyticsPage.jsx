import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ── Monthly data ─────────────────────────── */
const months = ["Jun","Jul","Aug","Sep","Oct","Nov"];
const completedData  = [72, 85, 91, 78, 94, 88];
const pendingData    = [28, 15,  9, 22,  6, 12];
const incompleteData = [18, 11,  6, 14,  8, 10];
const maxVal = 100;

/* ── Department stats ─────────────────────── */
const deptStats = [
  { dept:"Finance",         completed: 94, pending: 4,  incomplete: 2,  color:"#2563EB" },
  { dept:"Engineering",     completed: 88, pending: 8,  incomplete: 4,  color:"#10B981" },
  { dept:"Human Resources", completed: 76, pending: 14, incomplete: 10, color:"#8B5CF6" },
  { dept:"Marketing",       completed: 91, pending: 6,  incomplete: 3,  color:"#F59E0B" },
  { dept:"Legal",           completed: 83, pending: 11, incomplete: 6,  color:"#EF4444" },
  { dept:"Design",          completed: 97, pending: 2,  incomplete: 1,  color:"#06B6D4" },
];

/* ── Top performers ────────────────────────── */
const topPerformers = [
  { name:"Sarah Jenkins",  tasks: 48, rate: 97, initials:"SJ", bg:"#10B981" },
  { name:"Alex Rivera",    tasks: 42, rate: 94, initials:"AR", bg:"#2563EB" },
  { name:"Robert Chen",    tasks: 39, rate: 92, initials:"RC", bg:"#EF4444" },
  { name:"Linda Torres",   tasks: 35, rate: 89, initials:"LT", bg:"#06B6D4" },
  { name:"Dr. Priya Nair", tasks: 31, rate: 87, initials:"PN", bg:"#8B5CF6" },
];

/* ── Summary metrics ───────────────────────── */
const summaryCards = [
  { label:"Overall Completion", value:"91.2%", sub:"This month",   color:"#10B981", bg:"#F0FDF4" },
  { label:"Total Tasks",        value:"1,872",  sub:"All time",     color:"#2563EB", bg:"#EFF6FF" },
  { label:"Avg. Task Duration", value:"3.4 days", sub:"Per task",   color:"#F59E0B", bg:"#FFFBEB" },
  { label:"Active Staff",       value:"47",     sub:"Contributing", color:"#8B5CF6", bg:"#F5F3FF" },
];

/* ── Component ─────────────────────────────── */
export default function AnalyticsPage() {
  const [activeMonth, setActiveMonth] = useState(4); // Oct

  return (
    <Layout>
      <div className="analytics-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Analytics</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Analytics</h1>
            <p className="tasks-subtitle">Insights into task performance, staff productivity and departmental output.</p>
          </div>
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

        {/* Summary Cards */}
        <div className="analytics-summary-grid">
          {summaryCards.map(c => (
            <div key={c.label} className="analytics-summary-card" style={{ background: c.bg }}>
              <div className="asc2-top">
                <span className="asc2-label">{c.label}</span>
                <span className="asc2-sub">{c.sub}</span>
              </div>
              <div className="asc2-value" style={{ color: c.color }}>{c.value}</div>
            </div>
          ))}
        </div>

        <div className="analytics-main-grid">
          {/* ── Left: Bar Chart ── */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">Monthly Task Overview</h3>
              <div className="chart-legend">
                <span className="legend-dot" style={{ background:"#2563EB" }}/> Completed
                <span className="legend-dot" style={{ background:"#F59E0B" }}/> Pending
                <span className="legend-dot" style={{ background:"#EF4444" }}/> Incomplete
              </div>
            </div>
            <div className="bar-chart-wrap">
              {months.map((m, i) => (
                <div key={m} className={`bar-group ${activeMonth === i ? "bar-group-active" : ""}`}
                  onClick={() => setActiveMonth(i)}>
                  <div className="bar-stack">
                    <div className="bar-segment bar-incomplete"
                      style={{ height:`${(incompleteData[i]/maxVal)*180}px` }}
                      title={`Incomplete: ${incompleteData[i]}%`} />
                    <div className="bar-segment bar-pending"
                      style={{ height:`${(pendingData[i]/maxVal)*180}px` }}
                      title={`Pending: ${pendingData[i]}%`} />
                    <div className="bar-segment bar-completed"
                      style={{ height:`${(completedData[i]/maxVal)*180}px` }}
                      title={`Completed: ${completedData[i]}%`} />
                  </div>
                  <div className="bar-label">{m}</div>
                  {activeMonth === i && (
                    <div className="bar-tooltip">
                      <div>✅ {completedData[i]}%</div>
                      <div>⏳ {pendingData[i]}%</div>
                      <div>❌ {incompleteData[i]}%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Top Performers ── */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h3 className="analytics-card-title">Top Performers</h3>
              <span className="analytics-badge">This Month</span>
            </div>
            <div className="performers-list">
              {topPerformers.map((p, i) => (
                <div key={p.name} className="performer-row">
                  <div className="performer-rank">{i + 1}</div>
                  <div className="assignee-avatar" style={{ background: p.bg, width:34, height:34, fontSize:12 }}>
                    {p.initials}
                  </div>
                  <div className="performer-info">
                    <div className="performer-name">{p.name}</div>
                    <div className="performer-bar-track">
                      <div className="performer-bar-fill"
                        style={{ width: `${p.rate}%`, background: p.bg }} />
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
          </div>
          <div className="dept-breakdown-grid">
            {deptStats.map(d => (
              <div key={d.dept} className="dept-row">
                <div className="dept-name-label">
                  <span className="dept-dot" style={{ background: d.color }} />
                  {d.dept}
                </div>
                <div className="dept-bars">
                  <div className="dept-bar-item">
                    <span className="dept-bar-label">Completed</span>
                    <div className="dept-bar-track">
                      <div className="dept-bar-fill" style={{ width:`${d.completed}%`, background: d.color }} />
                    </div>
                    <span className="dept-bar-val">{d.completed}%</span>
                  </div>
                  <div className="dept-bar-item">
                    <span className="dept-bar-label">Pending</span>
                    <div className="dept-bar-track">
                      <div className="dept-bar-fill" style={{ width:`${d.pending}%`, background:"#F59E0B" }} />
                    </div>
                    <span className="dept-bar-val">{d.pending}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
