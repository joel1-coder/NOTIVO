import React from "react";

/* ── Close icon ─────────────────────────────── */
const XIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* ── Row helper ─────────────────────────────── */
const Row = ({ label, value, badge }) => (
  <div className="vm-row">
    <span className="vm-label">{label}</span>
    {badge
      ? <span className="vm-badge" style={badge}>{value}</span>
      : <span className="vm-value">{value || "—"}</span>
    }
  </div>
);

/* ════════════════════════════════════════════════
   ViewModal  — Works for Tasks, Events & Content
   Props:
     item   (object)   — the row data
     type   (string)   — "task" | "event" | "content"
     onClose (fn)
   ════════════════════════════════════════════════ */
export default function ViewModal({ item, type, onClose }) {
  if (!item) return null;

  /* ── Badge colour helpers ── */
  const priorityBadge = {
    Critical : { background: "#FEE2E2", color: "#B91C1C" },
    High     : { background: "#FEF3C7", color: "#92400E" },
    Medium   : { background: "#DBEAFE", color: "#1E40AF" },
    Low      : { background: "#F3F4F6", color: "#6B7280" },
  };
  const STATUS_COLORS = {
    "Approved"      : { background: "#DCFCE7", color: "#166534" },
    "Rejected"      : { background: "#FEE2E2", color: "#B91C1C" },
    "Pending Review": { background: "#FEF3C7", color: "#92400E" },
    "Under Review"  : { background: "#DBEAFE", color: "#1D4ED8" },
    "Pending"       : { background: "#FEF3C7", color: "#92400E" },
    "OVERDUE"       : { background: "#FEE2E2", color: "#B91C1C" },
    "STAGING"       : { background: "#DBEAFE", color: "#1E40AF" },
    "IN PROGRESS"   : { background: "#DCFCE7", color: "#166534" },
    "YET TO SEEN"   : { background: "#FEF3C7", color: "#92400E" },
    "BACKLOG"       : { background: "#F3F4F6", color: "#6B7280" },
    "TESTING"       : { background: "#EDE9FE", color: "#5B21B6" },
    "Completed"     : { background: "#DCFCE7", color: "#166534" },
  };

  const TYPE_COLORS = {
    "Invitation": { background: "#EDE9FE", color: "#5B21B6" },
    "Circular"  : { background: "#DBEAFE", color: "#1D4ED8" },
    "Notice"    : { background: "#FEF3C7", color: "#92400E" },
    "Report"    : { background: "#F0FDF4", color: "#166534" },
  };

  /* ── Emoji icon for event/content ── */
  const emojiIcon = item.icon || item.preview || "📄";

  /* ── Header color by type ── */
  const headerBg =
    type === "task"    ? "#1E3A5F" :
    type === "event"   ? "#7C3AED" :
    type === "content" ? "#2563EB" : "#1E3A5F";

  /* ── Build a human-readable "invitation message" block ── */
  const buildMessage = () => {
    if (type === "task") {
      return `Dear Admin,\n\nI am writing to notify you regarding the task "${item.name}" (ID: ${item.id ?? item.taskId ?? ""}).\n\nThis task has been assigned to ${item.assignee} from the ${item.dept} department. The current status is "${item.status ?? (item.overdue ? "OVERDUE" : "PENDING")}" with a ${item.priority} priority level.\n\nDeadline / Due Date: ${item.deadline ?? item.due ?? item.completedOn ?? "N/A"}\n\nKindly review and take the necessary action at the earliest convenience.\n\nThank you,\n${item.assignee}`;
    }
    if (type === "event") {
      return `Dear Admin,\n\nI am pleased to submit the event document for your review.\n\nEvent Name   : ${item.eventName}\nDepartment   : ${item.dept}\nSubmitted By : ${item.hod}\nSubmitted On : ${item.submitted}\nEvent Date   : ${item.eventDate}\nAttached File: ${item.file}\n\nWe kindly request your approval of this submission at your earliest convenience so that preparations can proceed accordingly.\n\nFaithfully yours,\n${item.hod}\nHOD — ${item.dept}`;
    }
    if (type === "content") {
      return `Dear Admin,\n\nPlease find the content submission details below for your review and approval.\n\nContent Title: ${item.title}\nContent Type : ${item.type}\nUploaded By  : ${item.uploadedBy}\nDepartment   : ${item.dept}\nDate Uploaded: ${item.date}\nFile Size    : ${item.size}\n\nWe kindly request that you review this content and update its status accordingly.\n\nThank you,\n${item.uploadedBy}\n${item.dept}`;
    }
    return "";
  };

  return (
    <div className="vm-overlay" onClick={onClose}>
      <div className="vm-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="vm-header" style={{ background: headerBg }}>
          <div className="vm-header-left">
            <span className="vm-header-icon">{emojiIcon}</span>
            <div>
              <div className="vm-header-title">
                {item.name ?? item.eventName ?? item.title}
              </div>
              <div className="vm-header-sub">
                {type === "task"
                  ? `${item.assignee} · ${item.dept}`
                  : type === "event"
                  ? `${item.dept} · ${item.hod}`
                  : `${item.dept} · ${item.uploadedBy}`}
              </div>
            </div>
          </div>
          <button className="vm-close-btn" onClick={onClose}><XIcon /></button>
        </div>

        <div className="vm-body">
          {/* ── Details grid ── */}
          <div className="vm-section-title">📋 Details</div>
          <div className="vm-details-grid">
            {type === "task" && <>
              <Row label="Task ID"    value={item.id ?? item.taskId} />
              <Row label="Assignee"   value={item.assignee} />
              <Row label="Department" value={item.dept} />
              <Row label="Priority"   value={item.priority}
                   badge={priorityBadge[item.priority]} />
              <Row label="Status"
                   value={item.status ?? (item.overdue ? "OVERDUE" : "PENDING")}
                   badge={STATUS_COLORS[item.status ?? (item.overdue ? "OVERDUE" : "PENDING")]} />
              <Row label="Due Date"   value={item.deadline ?? item.due ?? item.completedOn} />
              {item.daysOverdue > 0 &&
                <Row label="Days Overdue" value={`${item.daysOverdue} days`} />}
            </>}

            {type === "event" && <>
              <Row label="Event ID"    value={item.id} />
              <Row label="Event Name"  value={item.eventName} />
              <Row label="Department"  value={item.dept} />
              <Row label="HOD"         value={item.hod} />
              <Row label="Submitted"   value={item.submitted} />
              <Row label="Event Date"  value={item.eventDate} />
              <Row label="Attached File" value={item.file} />
              <Row label="Status"      value={item.status}
                   badge={STATUS_COLORS[item.status]} />
            </>}

            {type === "content" && <>
              <Row label="Title"       value={item.title} />
              <Row label="Type"        value={item.type}
                   badge={TYPE_COLORS[item.type]} />
              <Row label="Uploaded By" value={item.uploadedBy} />
              <Row label="Department"  value={item.dept} />
              <Row label="Date"        value={item.date} />
              <Row label="File Size"   value={item.size} />
              <Row label="Views"       value={item.views !== undefined ? `👁 ${item.views}` : "—"} />
              <Row label="Status"      value={item.status}
                   badge={STATUS_COLORS[item.status]} />
            </>}
          </div>

          {/* ── Invitation / Message ── */}
          <div className="vm-section-title" style={{ marginTop: 22 }}>
            ✉️ Message / Invitation Sent to Admin
          </div>
          <div className="vm-message-box">
            {buildMessage().split("\n").map((line, i) =>
              line === "" ? <br key={i} /> : <p key={i} className="vm-msg-line">{line}</p>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="vm-footer">
          <button className="vm-footer-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
