import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useSubmission } from "../context/SubmissionContext";

/* ── Icons ──────────────────────────────────── */
const ArrowLeft = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const XIcon = () => (
  <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const UsersIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const BudgetIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 18 19.5 19.5 0 0 1 5 12.37a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18" />
  </svg>
);

const STATUS_COLORS = {
  "Pending Review": { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
  Approved: { bg: "#DCFCE7", color: "#166534", dot: "#10B981" },
  Rejected: { bg: "#FEE2E2", color: "#B91C1C", dot: "#EF4444" },
  "Under Review": { bg: "#DBEAFE", color: "#1D4ED8", dot: "#3B82F6" },
};

const CATEGORY_COLORS = {
  Technical: { bg: "#EFF6FF", color: "#2563EB" },
  Workshop:  { bg: "#F0FDF4", color: "#16A34A" },
  Cultural:  { bg: "#FDF4FF", color: "#9333EA" },
  Academic:  { bg: "#FFFBEB", color: "#D97706" },
  Sports:    { bg: "#F0FDF4", color: "#059669" },
};

export default function InvitationDetailPage() {
  const navigate = useNavigate();
  const { selectedSubmission, updateSubmissionStatus } = useSubmission();
  const [feedback, setFeedback]   = useState("");
  const [flashMsg, setFlashMsg]   = useState("");
  const [flashType, setFlashType] = useState("success");
  const [activeTab, setActiveTab] = useState("overview");

  const s = selectedSubmission;

  const flash = (msg, type = "success") => {
    setFlashMsg(msg);
    setFlashType(type);
    setTimeout(() => setFlashMsg(""), 3000);
  };

  if (!s) {
    return (
      <Layout>
        <div className="inv-detail-empty">
          <div className="inv-empty-icon">📭</div>
          <h2>No submission selected</h2>
          <p>Please go back and click "View" on a submission to see its details.</p>
          <button className="inv-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft /> Go Back
          </button>
        </div>
      </Layout>
    );
  }

  const statusStyle   = STATUS_COLORS[s.status]   || STATUS_COLORS["Pending Review"];
  const categoryStyle = CATEGORY_COLORS[s.category] || CATEGORY_COLORS["Academic"];

  const handleApprove = () => {
    updateSubmissionStatus(s.id, "Approved");
    flash("✅ Submission approved successfully!");
  };
  const handleReject = () => {
    updateSubmissionStatus(s.id, "Rejected");
    flash("❌ Submission rejected.", "error");
  };
  const handleSendFeedback = () => {
    if (!feedback.trim()) {
      flash("⚠️ Please write feedback before sending.", "warning");
      return;
    }
    flash("📨 Feedback sent to HOD successfully!");
    setFeedback("");
  };

  const tabs = ["overview", "agenda", "attachments", "timeline"];

  return (
    <Layout>
      <div className="inv-detail-page">

        {/* Flash */}
        {flashMsg && (
          <div className={`inv-flash inv-flash-${flashType}`}>{flashMsg}</div>
        )}

        {/* Top Header */}
        <div className="inv-detail-topbar">
          <button className="inv-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft /> Back
          </button>
          <div className="inv-detail-breadcrumb">
            <span className="inv-bc-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
            <span className="inv-bc-sep">›</span>
            <span className="inv-bc-link" onClick={() => navigate("/submissions")}>Event Submissions</span>
            <span className="inv-bc-sep">›</span>
            <span className="inv-bc-current">{s.eventName}</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div
          className="inv-hero-banner"
          style={{ background: `linear-gradient(135deg, ${s.previewBg} 0%, ${s.previewBg}cc 100%)` }}
        >
          <div className="inv-hero-left">
            <div className="inv-hero-icon">{s.icon}</div>
            <div>
              <div className="inv-hero-id">{s.id}</div>
              <h1 className="inv-hero-title">{s.eventName}</h1>
              <div className="inv-hero-meta">
                <span className="inv-hero-dept">{s.dept}</span>
                <span className="inv-hero-sep">•</span>
                <span className="inv-hero-cat" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  {s.category}
                </span>
              </div>
            </div>
          </div>
          <div className="inv-hero-right">
            <div className="inv-status-pill" style={{ background: statusStyle.bg, color: statusStyle.color }}>
              <span className="inv-status-dot" style={{ background: statusStyle.dot }} />
              {s.status}
            </div>
          </div>
        </div>

        {/* Quick Info Strip */}
        <div className="inv-quick-strip">
          <div className="inv-quick-item">
            <CalendarIcon />
            <div>
              <div className="inv-quick-label">Event Date</div>
              <div className="inv-quick-val">{s.eventDate}</div>
            </div>
          </div>
          <div className="inv-quick-divider" />
          <div className="inv-quick-item">
            <MapPinIcon />
            <div>
              <div className="inv-quick-label">Venue</div>
              <div className="inv-quick-val">{s.venue}</div>
            </div>
          </div>
          <div className="inv-quick-divider" />
          <div className="inv-quick-item">
            <UsersIcon />
            <div>
              <div className="inv-quick-label">Expected Attendees</div>
              <div className="inv-quick-val">{s.expectedAttendees.toLocaleString()}</div>
            </div>
          </div>
          <div className="inv-quick-divider" />
          <div className="inv-quick-item">
            <BudgetIcon />
            <div>
              <div className="inv-quick-label">Budget</div>
              <div className="inv-quick-val">{s.budget}</div>
            </div>
          </div>
          <div className="inv-quick-divider" />
          <div className="inv-quick-item">
            <CalendarIcon />
            <div>
              <div className="inv-quick-label">Submitted On</div>
              <div className="inv-quick-val">{s.submitted}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="inv-main-grid">

          {/* LEFT — Tabs */}
          <div className="inv-left-col">
            <div className="inv-tabs-nav">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`inv-tab-btn ${activeTab === tab ? "inv-tab-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
              <div className="inv-tab-content">
                <div className="inv-section-card">
                  <h3 className="inv-section-title">📋 Event Description</h3>
                  <p className="inv-description">{s.description}</p>
                </div>
                <div className="inv-section-card">
                  <h3 className="inv-section-title">🏢 Requirements</h3>
                  <p className="inv-description">{s.requirements}</p>
                </div>
                {s.sponsors && s.sponsors.length > 0 && (
                  <div className="inv-section-card">
                    <h3 className="inv-section-title">🤝 Sponsors & Partners</h3>
                    <div className="inv-sponsor-list">
                      {s.sponsors.map((sp, i) => (
                        <span key={i} className="inv-sponsor-chip">{sp}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Agenda */}
            {activeTab === "agenda" && (
              <div className="inv-tab-content">
                <div className="inv-section-card">
                  <h3 className="inv-section-title">🗓 Event Agenda</h3>
                  <div className="inv-agenda-list">
                    {s.agenda.map((item, i) => (
                      <div key={i} className="inv-agenda-item">
                        <div className="inv-agenda-dot" />
                        <div className="inv-agenda-time">{item.time}</div>
                        <div className="inv-agenda-activity">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Attachments */}
            {activeTab === "attachments" && (
              <div className="inv-tab-content">
                <div className="inv-section-card">
                  <h3 className="inv-section-title">📎 Submitted Documents</h3>
                  <div className="inv-attach-list">
                    {s.attachments.map((file, i) => {
                      const ext = file.split(".").pop().toUpperCase();
                      const extColors = {
                        PDF:  { bg: "#FEE2E2", color: "#B91C1C" },
                        XLSX: { bg: "#DCFCE7", color: "#166534" },
                        DOCX: { bg: "#DBEAFE", color: "#1E40AF" },
                      };
                      const ec = extColors[ext] || { bg: "#F3F4F6", color: "#374151" };
                      return (
                        <div key={i} className="inv-attach-item">
                          <div className="inv-attach-ext" style={{ background: ec.bg, color: ec.color }}>{ext}</div>
                          <div className="inv-attach-name">{file}</div>
                          <button className="inv-attach-dl">⬇ Download</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            {activeTab === "timeline" && (
              <div className="inv-tab-content">
                <div className="inv-section-card">
                  <h3 className="inv-section-title">⏱ Activity Timeline</h3>
                  <div className="inv-timeline-list">
                    {s.timeline.map((item, i) => (
                      <div key={i} className="inv-timeline-item">
                        <div className="inv-timeline-dot" style={{ background: item.color }} />
                        {i < s.timeline.length - 1 && <div className="inv-timeline-line" />}
                        <div className="inv-timeline-info">
                          <div className="inv-timeline-label">{item.label}</div>
                          <div className="inv-timeline-time">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <div className="inv-right-col">

            {/* HOD Card */}
            <div className="inv-hod-card">
              <h3 className="inv-section-title">👤 Submitted By</h3>
              <div className="inv-hod-avatar">
                {s.hod.split(" ").slice(-2).map((n) => n[0]).join("").toUpperCase()}
              </div>
              <div className="inv-hod-name">{s.hod}</div>
              <div className="inv-hod-dept">{s.dept}</div>
              <div className="inv-hod-role">Head of Department</div>
              <div className="inv-hod-contacts">
                <div className="inv-hod-contact-item"><MailIcon /><span>{s.hodEmail}</span></div>
                <div className="inv-hod-contact-item"><PhoneIcon /><span>{s.hodPhone}</span></div>
              </div>
            </div>

            {/* Admin Action Card */}
            <div className="inv-action-card">
              <h3 className="inv-section-title">⚙️ Admin Action</h3>
              <div className="inv-current-status">
                <span className="inv-cs-label">Current Status</span>
                <span className="inv-cs-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                  {s.status}
                </span>
              </div>
              <div className="inv-action-btns">
                <button className="inv-approve-btn" onClick={handleApprove} disabled={s.status === "Approved"}>
                  <CheckIcon /> Approve
                </button>
                <button className="inv-reject-btn" onClick={handleReject} disabled={s.status === "Rejected"}>
                  <XIcon /> Reject
                </button>
              </div>
              <div className="inv-feedback-section">
                <label className="inv-fb-label">Send Feedback to HOD</label>
                <textarea
                  className="inv-fb-textarea"
                  placeholder="Write correction notes, approval conditions, or rejection reasons..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
                <button className="inv-fb-send-btn" onClick={handleSendFeedback}>
                  <SendIcon /> Send Feedback
                </button>
              </div>
            </div>

            {/* File Preview Card */}
            <div className="inv-file-card">
              <h3 className="inv-section-title">📄 Primary Document</h3>
              <div className="inv-file-preview" style={{ background: s.previewBg }}>
                <div className="inv-file-preview-icon">{s.icon}</div>
                <div className="inv-file-preview-name">{s.file}</div>
              </div>
              <div className="inv-file-actions">
                <button className="inv-file-btn inv-file-view">👁 Preview</button>
                <button className="inv-file-btn inv-file-dl">⬇ Download</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
