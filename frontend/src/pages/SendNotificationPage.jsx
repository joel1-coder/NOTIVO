import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
);
const SendIcon = () => (
  <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);

const DEPTS = ["Computer Science","Electrical Engineering","Mechanical Engineering","Physics","Arts & Humanities","Physical Education","Mathematics"];
const PRIORITIES = [
  { val:"normal",  label:"🟢 Normal",  color:"#10B981" },
  { val:"high",    label:"🟡 High",    color:"#F59E0B" },
  { val:"urgent",  label:"🔴 Urgent",  color:"#EF4444" },
];
const RECIPIENT_TYPES = ["All Staff", "All Students", "All HODs", "Specific Department", "All Departments"];

const sentHistory = [
  { id:1, to:"All Staff",            subject:"System Maintenance - Dec 15",   time:"2 hours ago",   priority:"high",   read:138, total:145 },
  { id:2, to:"Computer Science",     subject:"Semester Result Published",      time:"Yesterday",     priority:"normal", read:42,  total:45  },
  { id:3, to:"All HODs",             subject:"Monthly Review Meeting",         time:"Oct 22, 2024",  priority:"urgent", read:7,   total:7   },
  { id:4, to:"All Students",         subject:"Holiday Notice - Diwali Break",  time:"Oct 20, 2024",  priority:"normal", read:516, total:590 },
  { id:5, to:"Electrical Engineering",subject:"Lab Schedule Update",           time:"Oct 18, 2024",  priority:"high",   read:34,  total:36  },
];

const PRIORITY_STYLE = {
  normal: { bg:"#DCFCE7", color:"#166534" },
  high:   { bg:"#FEF3C7", color:"#92400E" },
  urgent: { bg:"#FEE2E2", color:"#B91C1C" },
};

export default function SendNotificationPage() {
  const [recipientType, setRecipientType] = useState("All Staff");
  const [selectedDept, setSelectedDept]   = useState(DEPTS[0]);
  const [subject, setSubject]             = useState("");
  const [message, setMessage]             = useState("");
  const [priority, setPriority]           = useState("normal");
  const [attachment, setAttachment]       = useState(null);
  const [sent, setSent]                   = useState(sentHistory);
  const [toastMsg, setToast]              = useState("");
  const [sending, setSending]             = useState(false);

  const toast = (m) => { setToast(m); setTimeout(() => setToast(""), 2800); };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) { toast("⚠️ Subject and message are required."); return; }
    setSending(true);
    setTimeout(() => {
      const toLabel = recipientType === "Specific Department" ? selectedDept : recipientType;
      setSent(prev => [{
        id: Date.now(), to: toLabel, subject, time: "Just now", priority, read:0, total: 100
      }, ...prev]);
      setSubject(""); setMessage(""); setAttachment(null); setPriority("normal");
      setSending(false);
      toast("✅ Notification sent successfully!");
    }, 1000);
  };

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">Send Notification</span>
        </nav>

        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Send Notification</h1>
            <p className="tasks-subtitle">Compose and send notifications, circulars, or alerts to staff, students, or departments.</p>
          </div>
        </div>

        {toastMsg && <div className="notif-flash" style={{ marginBottom:8 }}>{toastMsg}</div>}

        <div className="compose-layout">
          {/* ── Left: Compose form ─── */}
          <div className="compose-form-card">
            <div className="compose-form-title">📧 Compose Message</div>

            {/* To */}
            <div className="compose-field">
              <label className="compose-label">To</label>
              <select className="compose-input" value={recipientType}
                onChange={e => setRecipientType(e.target.value)}>
                {RECIPIENT_TYPES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            {recipientType === "Specific Department" && (
              <div className="compose-field">
                <label className="compose-label">Select Department</label>
                <select className="compose-input" value={selectedDept}
                  onChange={e => setSelectedDept(e.target.value)}>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            )}

            {/* Subject */}
            <div className="compose-field">
              <label className="compose-label">Subject *</label>
              <input className="compose-input" placeholder="Enter notification subject…"
                value={subject} onChange={e => setSubject(e.target.value)}/>
            </div>

            {/* Priority */}
            <div className="compose-field">
              <label className="compose-label">Priority</label>
              <div className="priority-row">
                {PRIORITIES.map(p => (
                  <button key={p.val}
                    className={`priority-btn ${priority === p.val ? "priority-active" : ""}`}
                    style={{ "--pri-color": p.color }}
                    onClick={() => setPriority(p.val)}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="compose-field">
              <label className="compose-label">Message *</label>
              <textarea className="compose-textarea" rows={7}
                placeholder="Write your notification or circular content here…"
                value={message} onChange={e => setMessage(e.target.value)}/>
              <div className="compose-char-count">{message.length} characters</div>
            </div>

            {/* Attachment */}
            <div className="compose-field">
              <label className="compose-label">Attach File (Optional)</label>
              <label className="compose-attach-label">
                <input type="file" hidden onChange={e => setAttachment(e.target.files[0])}/>
                📎 {attachment ? attachment.name : "Choose file to attach (PDF, PNG, JPG)"}
              </label>
              {attachment && (
                <button className="compose-remove-attach" onClick={() => setAttachment(null)}>✕ Remove</button>
              )}
            </div>

            {/* Preview strip */}
            <div className="compose-preview-strip">
              <div className="compose-preview-label">Preview</div>
              <div className="compose-preview-to">
                <strong>To:</strong> {recipientType === "Specific Department" ? selectedDept : recipientType}
              </div>
              <div className="compose-preview-subject">
                <strong>Sub:</strong> {subject || <span style={{ color:"#9CA3AF" }}>No subject</span>}
              </div>
              <div className="compose-preview-priority">
                <span className="task-status-badge"
                  style={{ background:PRIORITY_STYLE[priority].bg, color:PRIORITY_STYLE[priority].color }}>
                  {priority.charAt(0).toUpperCase()+priority.slice(1)} Priority
                </span>
              </div>
            </div>

            <button className="compose-send-btn" onClick={handleSend} disabled={sending}>
              {sending ? (
                <span>Sending…</span>
              ) : (
                <><SendIcon/> Send Notification</>
              )}
            </button>
          </div>

          {/* ── Right: Sent history ─── */}
          <div className="compose-history-card">
            <div className="compose-form-title">📨 Sent History</div>
            <div className="compose-history-list">
              {sent.map(s => {
                const badge = PRIORITY_STYLE[s.priority];
                const pct   = s.total > 0 ? Math.round((s.read / s.total) * 100) : 0;
                return (
                  <div key={s.id} className="sent-item">
                    <div className="sent-item-top">
                      <div className="sent-item-subject">{s.subject}</div>
                      <span className="task-status-badge" style={{ background:badge.bg, color:badge.color, fontSize:10 }}>
                        {s.priority}
                      </span>
                    </div>
                    <div className="sent-item-to">→ {s.to}</div>
                    <div className="sent-read-row">
                      <div className="sent-read-bar-track">
                        <div className="sent-read-bar-fill" style={{ width:`${pct}%` }}/>
                      </div>
                      <span className="sent-read-label">{s.read}/{s.total} read</span>
                    </div>
                    <div className="sent-item-time">{s.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
