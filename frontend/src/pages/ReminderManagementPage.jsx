import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
  </svg>
);

/* ── Sample scheduled reminders ─────────────── */
const initReminders = [
  {
    id: 1,
    title: "Attendance Below Threshold",
    condition: "Attendance < 75%",
    trigger: "Nov 5, 2023 · 09:00 AM",
    action: "Send Email",
    active: true,
  },
  {
    id: 2,
    title: "Task Deadline Approaching",
    condition: "Due Date within 2 days",
    trigger: "Daily · 08:00 AM",
    action: "Send Notification",
    active: true,
  },
  {
    id: 3,
    title: "Monthly Performance Review",
    condition: "End of Month",
    trigger: "Nov 30, 2023 · 06:00 PM",
    action: "Send Email",
    active: false,
  },
  {
    id: 4,
    title: "Overdue Task Alert",
    condition: "Task overdue > 3 days",
    trigger: "Daily · 07:00 AM",
    action: "Send Notification",
    active: true,
  },
];

const conditions = [
  "Attendance < 75%",
  "Due Date within 2 days",
  "Task overdue > 3 days",
  "End of Month",
  "Custom condition",
];
const actions = ["Send Email", "Send Notification", "Send SMS", "Log Event"];

/* ── Component ──────────────────────────────── */
export default function ReminderManagementPage() {
  const [reminders, setReminders] = useState(initReminders);
  const [form, setForm] = useState({ title: "", condition: conditions[0], trigger: "", action: actions[0] });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const toggle = (id) =>
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );

  const remove = (id) => setReminders((prev) => prev.filter((r) => r.id !== id));

  const validate = () => {
    const e = {};
    if (!form.title.trim())   e.title   = "Title is required";
    if (!form.trigger.trim()) e.trigger = "Trigger date/time is required";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const newReminder = {
      id: Date.now(),
      title: form.title,
      condition: form.condition,
      trigger: form.trigger,
      action: form.action,
      active: true,
    };
    setReminders((prev) => [newReminder, ...prev]);
    setForm({ title: "", condition: conditions[0], trigger: "", action: actions[0] });
    setErrors({});
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Layout>
      <div className="reminder-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Reminder Management</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Reminder Management</h1>
            <p className="tasks-subtitle">Create and schedule automated reminders for staff and tasks.</p>
          </div>
        </div>

        <div className="reminder-layout">
          {/* ── Left: Create Form ── */}
          <div className="reminder-form-card">
            <div className="reminder-form-header">
              <BellIcon />
              <h3>Create New Reminder</h3>
            </div>

            <div className="reminder-form-body">
              {/* Title */}
              <div className="rm-field">
                <label className="rm-label">Title</label>
                <input
                  className={`rm-input ${errors.title ? "rm-input-err" : ""}`}
                  placeholder="e.g. Attendance Alert"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                {errors.title && <span className="rm-error">{errors.title}</span>}
              </div>

              {/* Condition */}
              <div className="rm-field">
                <label className="rm-label">Condition</label>
                <select
                  className="rm-select"
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                >
                  {conditions.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Trigger */}
              <div className="rm-field">
                <label className="rm-label">Trigger Date / Time</label>
                <input
                  className={`rm-input ${errors.trigger ? "rm-input-err" : ""}`}
                  type="datetime-local"
                  value={form.trigger}
                  onChange={(e) => setForm({ ...form, trigger: e.target.value })}
                />
                {errors.trigger && <span className="rm-error">{errors.trigger}</span>}
              </div>

              {/* Action */}
              <div className="rm-field">
                <label className="rm-label">Action</label>
                <select
                  className="rm-select"
                  value={form.action}
                  onChange={(e) => setForm({ ...form, action: e.target.value })}
                >
                  {actions.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              <button className="rm-save-btn" onClick={handleSave}>
                <PlusIcon /> Save Reminder
              </button>

              {saved && <div className="rm-success">✅ Reminder saved successfully!</div>}
            </div>
          </div>

          {/* ── Right: Scheduled Reminders ── */}
          <div className="scheduled-card">
            <h3 className="scheduled-title">Scheduled Reminders</h3>
            <ul className="scheduled-list">
              {reminders.map((r) => (
                <li key={r.id} className={`scheduled-item ${r.active ? "" : "scheduled-inactive"}`}>
                  <div className="si-main">
                    <div className="si-top">
                      <span className="si-title">{r.title}</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={r.active}
                          onChange={() => toggle(r.id)}
                        />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                    <div className="si-meta">
                      <span className="si-tag condition-tag">{r.condition}</span>
                      <span className="si-tag action-tag">{r.action}</span>
                    </div>
                    <div className="si-trigger">🕐 {r.trigger}</div>
                  </div>
                  <button
                    className="si-delete"
                    onClick={() => remove(r.id)}
                    title="Delete reminder"
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
