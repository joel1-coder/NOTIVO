import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const ArrowLeft = () => (
  <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);
const BellIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const CheckAllIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
    <polyline points="20 12 9 23 4 18"/>
  </svg>
);

/* ── Notification data ──────────────────────── */
const initNotifications = [
  {
    id: 1, group: "TODAY", read: false,
    type: "user",
    icon: "👤",
    iconBg: "#DBEAFE", iconColor: "#2563EB",
    title: "New Student Registration",
    body: "Sarah Jenkins from Computer Science department has completed her registration profile.",
    time: "2 mins ago",
  },
  {
    id: 2, group: "TODAY", read: false,
    type: "report",
    icon: "📄",
    iconBg: "#F3F4F6", iconColor: "#6B7280",
    title: "Attendance Report Ready",
    body: "The weekly attendance summary for all departments is now available for review.",
    time: "1 hour ago",
  },
  {
    id: 3, group: "TODAY", read: false,
    type: "alert",
    icon: "⚠️",
    iconBg: "#FEF3C7", iconColor: "#92400E",
    title: "System Maintenance Alert",
    body: "The student portal will be down for scheduled maintenance tonight between 12:00 AM and 02:00 AM.",
    time: "3 hours ago",
  },
  {
    id: 4, group: "EARLIER", read: true,
    type: "message",
    icon: "💬",
    iconBg: "#EDE9FE", iconColor: "#5B21B6",
    title: "New Staff Message",
    body: "Dr. Michael Chen sent a message regarding the upcoming department meeting agenda.",
    time: "Yesterday, 4:30 PM",
  },
  {
    id: 5, group: "EARLIER", read: true,
    type: "success",
    icon: "✅",
    iconBg: "#DCFCE7", iconColor: "#166534",
    title: "Profile Update Success",
    body: "Your system administrator profile has been successfully updated with the new security credentials.",
    time: "Oct 24, 11:30 AM",
  },
  {
    id: 6, group: "EARLIER", read: true,
    type: "security",
    icon: "🔴",
    iconBg: "#FEE2E2", iconColor: "#B91C1C",
    title: "Critical Security Alert",
    body: "A login attempt from an unrecognized IP address (192.168.1.55) was blocked for your account.",
    time: "Oct 23, 09:15 AM",
  },
];

const filterOptions = ["All Notifications", "Unread", "Reports", "Alerts", "Messages"];

/* ── Component ──────────────────────────────── */
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initNotifications);
  const [activeFilter, setActiveFilter]   = useState("All Notifications");

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const dismiss = (id) =>
    setNotifications(prev => prev.filter(n => n.id !== id));

  const filtered = notifications.filter(n => {
    if (activeFilter === "All Notifications") return true;
    if (activeFilter === "Unread")   return !n.read;
    if (activeFilter === "Reports")  return n.type === "report";
    if (activeFilter === "Alerts")   return n.type === "alert" || n.type === "security";
    if (activeFilter === "Messages") return n.type === "message";
    return true;
  });

  const today   = filtered.filter(n => n.group === "TODAY");
  const earlier = filtered.filter(n => n.group === "EARLIER");
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="notif-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Notifications</span>
        </nav>

        {/* Header */}
        <div className="notif-header">
          <div>
            <h1 className="tasks-title">Notifications</h1>
            <p className="tasks-subtitle">Stay updated with the latest university activities and alerts.</p>
          </div>
          {unreadCount > 0 && (
            <span className="notif-unread-pill">{unreadCount} unread</span>
          )}
        </div>

        {/* Filter bar + Mark all */}
        <div className="notif-filter-row">
          <div className="notif-filter-tabs">
            {filterOptions.map(f => (
              <button
                key={f}
                className={`notif-filter-tab ${activeFilter === f ? "notif-tab-active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="mark-all-btn" onClick={markAllRead}>
            <CheckAllIcon /> Mark all as read
          </button>
        </div>

        {/* Notification List Card */}
        <div className="notif-list-card">

          {/* Back button (as in Figma) */}
          <div className="notif-back-row">
            <Link to="/dashboard" className="notif-back-btn">
              <ArrowLeft /> back
            </Link>
          </div>

          {filtered.length === 0 && (
            <div className="notif-empty">
              <BellIcon />
              <p>No notifications in this category.</p>
            </div>
          )}

          {/* TODAY */}
          {today.length > 0 && (
            <div className="notif-group">
              <div className="notif-group-label">TODAY</div>
              {today.map(n => (
                <NotifItem key={n.id} n={n} onRead={markRead} onDismiss={dismiss} />
              ))}
            </div>
          )}

          {/* EARLIER */}
          {earlier.length > 0 && (
            <div className="notif-group">
              <div className="notif-group-label">EARLIER</div>
              {earlier.map(n => (
                <NotifItem key={n.id} n={n} onRead={markRead} onDismiss={dismiss} />
              ))}
            </div>
          )}

          {/* Load more */}
          <div className="notif-load-more">
            <button className="load-more-btn">Load older notifications</button>
          </div>

          {/* Footer note */}
          <div className="notif-footer-note">
            ℹ️ You are viewing all activity logs for your administrator account.
            To change your alert preferences, please visit the{" "}
            <Link to="/reminders" className="bc-link">Notification Settings page</Link>.
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ── Notification Item ──────────────────────── */
function NotifItem({ n, onRead, onDismiss }) {
  return (
    <div
      className={`notif-item ${n.read ? "notif-read" : "notif-unread"}`}
      onClick={() => onRead(n.id)}
    >
      <div className="notif-icon-wrap" style={{ background: n.iconBg }}>
        <span className="notif-icon">{n.icon}</span>
        {!n.read && <span className="notif-dot" />}
      </div>
      <div className="notif-content">
        <div className="notif-title-row">
          <span className="notif-title">{n.title}</span>
          <span className="notif-time">{n.time}</span>
        </div>
        <p className="notif-body">{n.body}</p>
      </div>
      <button
        className="notif-dismiss-btn"
        title="Dismiss"
        onClick={(e) => { e.stopPropagation(); onDismiss(n.id); }}
      >✕</button>
    </div>
  );
}
