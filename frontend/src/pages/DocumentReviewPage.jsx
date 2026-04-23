import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useSubmission } from "../context/SubmissionContext";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="13" height="13" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ExpandIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const statusClass = {
  "Pending Review": "dr-badge-amber",
  "Approved":       "dr-badge-green",
  "Rejected":       "dr-badge-red",
  "Under Review":   "dr-badge-blue",
};

export default function DocumentReviewPage() {
  const navigate = useNavigate();
  const { submissions, updateSubmissionStatus, setSelectedSubmission } = useSubmission();

  const [selected, setSelected] = useState(submissions[0]);
  const [feedback, setFeedback] = useState("");
  const [flashMsg, setFlashMsg] = useState("");

  const flash = (msg) => { setFlashMsg(msg); setTimeout(() => setFlashMsg(""), 2500); };

  const handleUpdateStatus = (id, newStatus) => {
    updateSubmissionStatus(id, newStatus);
    if (selected?.id === id) setSelected((prev) => ({ ...prev, status: newStatus }));
    flash(newStatus === "Approved" ? "✅ Document approved!" : "❌ Document rejected.");
  };

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    flash("📨 Feedback sent to HOD!");
    setFeedback("");
  };

  const handleViewFullDetails = (sub) => {
    setSelectedSubmission(sub);
    navigate("/invitation-detail");
  };

  return (
    <Layout>
      <div className="tasks-page">
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-link" style={{ cursor: "default" }}>Event Submissions</span>
          <ChevronRight />
          <span className="bc-current">Document Review</span>
        </nav>

        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Document Review</h1>
            <p className="tasks-subtitle">Review, approve or reject event submission documents from departments.</p>
          </div>
          {flashMsg && <div className="notif-flash">{flashMsg}</div>}
        </div>

        <div className="docrev-layout">
          {/* LEFT — Submission List */}
          <div className="docrev-list-card">
            <h3 className="docrev-list-title">Submissions ({submissions.length})</h3>
            <ul className="docrev-list">
              {submissions.map((sub) => {
                const badge = statusBadge[sub.status] || statusBadge["Pending Review"];
                return (
                  <li key={sub.id}
                    className={`docrev-list-item ${selected?.id === sub.id ? "docrev-item-active" : ""}`}
                    onClick={() => setSelected(sub)}
                  >
                    <div className="docrev-preview-thumb" style={{ background: sub.previewBg }}>{sub.icon}</div>
                    <div className="docrev-item-info">
                      <div className="docrev-item-name">{sub.eventName}</div>
                      <div className="docrev-item-dept">{sub.dept}</div>
                      <span className={`task-status-badge ${statusClass[sub.status] || "dr-badge-amber"}`}
                        style={{ marginTop:4, display:"inline-block" }}>
                        {sub.status}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — Review Panel */}
          {selected && (() => {
            return (
              <div className="docrev-review-panel">
                {/* Document Preview */}
                <div className="docrev-preview-card">
                  <div className="docrev-preview-topbar">
                    <span className="docrev-filename">{selected.file}</span>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span className={`task-status-badge ${statusClass[selected.status] || "dr-badge-amber"}`}>
                        {selected.status}
                      </span>
                      <button className="docrev-view-btn"
                        style={{ padding:"5px 12px", fontSize:12, display:"flex", alignItems:"center", gap:5 }}
                        onClick={() => handleViewFullDetails(selected)}>
                        <ExpandIcon/> Full Details
                      </button>
                    </div>
                  </div>
                  <div className="docrev-preview-canvas" style={{ background: selected.previewBg }}>
                    <div className="docrev-canvas-text">
                      <div className="canvas-line">
                        {selected.eventName.split(" ").slice(0, 2).join(" ").toUpperCase()}
                      </div>
                      <div className="canvas-line-accent">
                        {selected.eventName.split(" ").slice(2).join(" ").toUpperCase() || selected.dept.toUpperCase()}
                      </div>
                      <div className="canvas-badge">{selected.icon} {selected.dept}</div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
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
                      <div className="docrev-meta-label">EVENT DATE</div>
                      <div className="docrev-meta-value"><CalendarIcon /> {selected.eventDate}</div>
                    </div>
                    <div>
                      <div className="docrev-meta-label">HOD NAME</div>
                      <div className="docrev-meta-value">{selected.hod}</div>
                    </div>
                    <div>
                      <div className="docrev-meta-label">VENUE</div>
                      <div className="docrev-meta-value">{selected.venue || "—"}</div>
                    </div>
                    <div>
                      <div className="docrev-meta-label">EXPECTED ATTENDEES</div>
                      <div className="docrev-meta-value">
                        {selected.expectedAttendees ? selected.expectedAttendees.toLocaleString() : "—"}
                      </div>
                    </div>
                  </div>

                  {/* View Full Details */}
                  <button className="docrev-view-btn"
                    style={{ width:"100%", marginTop:12, justifyContent:"center", padding:"10px", display:"flex", alignItems:"center", gap:6 }}
                    onClick={() => handleViewFullDetails(selected)}>
                    <EyeIcon /> View Full Invitation Details →
                  </button>

                  {/* Admin Actions */}
                  <h4 className="docrev-section-title" style={{ marginTop: 18 }}>Admin Action</h4>
                  <div className="docrev-action-row">
                    <button className="docrev-approve-btn"
                      onClick={() => handleUpdateStatus(selected.id, "Approved")}
                      disabled={selected.status === "Approved"}>
                      <CheckIcon /> Approve
                    </button>
                    <button className="docrev-reject-btn"
                      onClick={() => handleUpdateStatus(selected.id, "Rejected")}
                      disabled={selected.status === "Rejected"}>
                      <XIcon /> Reject
                    </button>
                  </div>

                  {/* Feedback */}
                  <div className="docrev-correction-panel">
                    <div className="docrev-correction-label">Correction Panel</div>
                    <textarea className="docrev-textarea"
                      placeholder="Write feedback or correction notes for the HOD…"
                      value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3} />
                    <button className="docrev-send-btn" onClick={handleSendFeedback}>
                      <SendIcon /> Send Feedback to HOD
                    </button>
                  </div>

                  {/* Timeline */}
                  <h4 className="docrev-section-title" style={{ marginTop: 18 }}>Activity Timeline</h4>
                  <ul className="docrev-timeline">
                    {(selected.timeline || []).map((t, i) => (
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
