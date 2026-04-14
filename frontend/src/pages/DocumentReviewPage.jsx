import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="13" height="13" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

/* ── Submission data ────────────────────────── */
const submissions = [
  {
    id: "EVT-001",
    filename: "Detailed_Invitation_Final.pdf",
    eventName: "Annual Tech Symposium 2024",
    dept: "Computer Science",
    date: "Oct 24, 2024",
    hod: "Dr. Sarah Jenkins",
    status: "Pending Review",
    preview: "🎓",
    previewBg: "#1E3A5F",
    previewText: "ANNUAL\nNATIONAL\nSYMPOSIUM",
    timeline: [
      { label:"New version uploaded",   time:"Today, 10:45 AM",      color:"#2563EB" },
      { label:"Correction requested",    time:"Oct 20, 2024, 03:15 PM", color:"#9CA3AF" },
    ],
  },
  {
    id: "EVT-002",
    filename: "Workshop_Banner_v2.pdf",
    eventName: "AI & ML Workshop 2024",
    dept: "Electrical Engineering",
    date: "Nov 05, 2024",
    hod: "Prof. David Miller",
    status: "Approved",
    preview: "🤖",
    previewBg: "#064E3B",
    previewText: "AI & ML\nWORKSHOP",
    timeline: [
      { label:"Approved by admin",   time:"Oct 22, 2024, 02:00 PM", color:"#10B981" },
      { label:"Submitted for review", time:"Oct 20, 2024, 09:00 AM", color:"#9CA3AF" },
    ],
  },
  {
    id: "EVT-003",
    filename: "Cultural_Fest_Poster.pdf",
    eventName: "Cultural Fest 2024",
    dept: "Mechanical Engineering",
    date: "Nov 15, 2024",
    hod: "Prof. James Okafor",
    status: "Rejected",
    preview: "🎭",
    previewBg: "#7C3AED",
    previewText: "CULTURAL\nFEST 2024",
    timeline: [
      { label:"Rejected — low resolution",  time:"Oct 21, 2024, 11:30 AM", color:"#EF4444" },
      { label:"Submitted for review",        time:"Oct 18, 2024, 10:00 AM", color:"#9CA3AF" },
    ],
  },
];

const statusBadge = {
  "Pending Review": { bg:"#FEF3C7", color:"#92400E" },
  "Approved":       { bg:"#DCFCE7", color:"#166534" },
  "Rejected":       { bg:"#FEE2E2", color:"#B91C1C" },
};

/* ── Component ──────────────────────────────── */
export default function DocumentReviewPage() {
  const [docs, setDocs]           = useState(submissions);
  const [selected, setSelected]   = useState(submissions[0]);
  const [feedback, setFeedback]   = useState("");
  const [flashMsg, setFlashMsg]   = useState("");

  const updateStatus = (id, newStatus) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status: newStatus }));
    setFlashMsg(`Document ${newStatus.toLowerCase()}!`);
    setTimeout(() => setFlashMsg(""), 2500);
  };

  const sendFeedback = () => {
    if (!feedback.trim()) return;
    setFlashMsg("Feedback sent to HOD!");
    setFeedback("");
    setTimeout(() => setFlashMsg(""), 2500);
  };

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-link" style={{ cursor:"default" }}>Event Submissions</span>
          <ChevronRight />
          <span className="bc-current">Document Review</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Document Review</h1>
            <p className="tasks-subtitle">Review, approve or reject event submission documents from departments.</p>
          </div>
          {flashMsg && <div className="notif-flash">{flashMsg}</div>}
        </div>

        <div className="docrev-layout">
          {/* ── Left: Submission list ── */}
          <div className="docrev-list-card">
            <h3 className="docrev-list-title">Submissions ({docs.length})</h3>
            <ul className="docrev-list">
              {docs.map(d => {
                const badge = statusBadge[d.status];
                return (
                  <li key={d.id}
                    className={`docrev-list-item ${selected?.id === d.id ? "docrev-item-active" : ""}`}
                    onClick={() => setSelected(d)}>
                    <div className="docrev-preview-thumb" style={{ background: d.previewBg }}>
                      {d.preview}
                    </div>
                    <div className="docrev-item-info">
                      <div className="docrev-item-name">{d.eventName}</div>
                      <div className="docrev-item-dept">{d.dept}</div>
                      <span className="task-status-badge" style={{ background: badge.bg, color: badge.color, marginTop:4 }}>
                        {d.status}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: Review panel ── */}
          {selected && (() => {
            const badge = statusBadge[selected.status];
            return (
              <div className="docrev-review-panel">
                {/* Document preview */}
                <div className="docrev-preview-card">
                  <div className="docrev-preview-topbar">
                    <span className="docrev-filename">{selected.filename}</span>
                    <span className="task-status-badge" style={{ background: badge.bg, color: badge.color }}>
                      {selected.status}
                    </span>
                  </div>
                  <div className="docrev-preview-canvas" style={{ background: selected.previewBg }}>
                    <div className="docrev-canvas-text">
                      {selected.previewText.split("\n").map((line,i) => (
                        <div key={i} className={i === 2 ? "canvas-line-accent" : "canvas-line"}>{line}</div>
                      ))}
                      <div className="canvas-badge">{selected.preview} {selected.dept}</div>
                    </div>
                  </div>
                </div>

                {/* Event details */}
                <div className="docrev-details-card">
                  <h4 className="docrev-section-title">Event Details</h4>
                  <div className="docrev-meta-grid">
                    <div>
                      <div className="docrev-meta-label">EVENT NAME</div>
                      <div className="docrev-meta-value">{selected.eventName}</div>
                    </div>
                    <div>
                      <div className="docrev-meta-label">DEPARTMENT</div>
                      <div className="docrev-meta-value">{selected.dept}</div>
                    </div>
                    <div>
                      <div className="docrev-meta-label">DATE</div>
                      <div className="docrev-meta-value">
                        <CalendarIcon /> {selected.date}
                      </div>
                    </div>
                    <div>
                      <div className="docrev-meta-label">HOD NAME</div>
                      <div className="docrev-meta-value">{selected.hod}</div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <h4 className="docrev-section-title" style={{ marginTop:18 }}>Admin Action</h4>
                  <div className="docrev-action-row">
                    <button
                      className="docrev-approve-btn"
                      onClick={() => updateStatus(selected.id, "Approved")}
                      disabled={selected.status === "Approved"}
                    >
                      <CheckIcon /> Approve
                    </button>
                    <button
                      className="docrev-reject-btn"
                      onClick={() => updateStatus(selected.id, "Rejected")}
                      disabled={selected.status === "Rejected"}
                    >
                      <XIcon /> Reject
                    </button>
                    <button className="docrev-view-btn">
                      <EyeIcon /> Preview
                    </button>
                  </div>

                  {/* Correction / Feedback panel */}
                  <div className="docrev-correction-panel">
                    <div className="docrev-correction-label">Correction Panel</div>
                    <textarea
                      className="docrev-textarea"
                      placeholder="Write feedback or correction notes for the HOD…"
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      rows={3}
                    />
                    <button className="docrev-send-btn" onClick={sendFeedback}>
                      <SendIcon /> Send Feedback to HOD
                    </button>
                  </div>

                  {/* Activity Timeline */}
                  <h4 className="docrev-section-title" style={{ marginTop:18 }}>Activity Timeline</h4>
                  <ul className="docrev-timeline">
                    {selected.timeline.map((t,i) => (
                      <li key={i} className="docrev-timeline-item">
                        <div className="docrev-timeline-dot" style={{ background: t.color }} />
                        <div className="docrev-timeline-info">
                          <div className="docrev-timeline-label">{t.label}</div>
                          <div className="docrev-timeline-time">{t.time}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </Layout>
  );
}
