import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 6v5c0 5.25 3.84 10.16 9 11.38C17.16 21.16 21 16.25 21 11V6L12 2z" fill="#2563EB"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const BellIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const DROP_ITEMS = [
  { icon: "👤", label: "My Profile",        path: "/profile"      },
  { icon: "🎨", label: "Circular Designer",  path: "/designer"     },
  { icon: "🏛", label: "Departments",        path: "/departments"  },
  { icon: "📤", label: "Send Notification",  path: "/compose"      },
  { icon: "📋", label: "Audit Log",          path: "/audit-log"    },
  { icon: "📊", label: "Analytics",          path: "/analytics"    },
  { icon: "📄", label: "Document Review",    path: "/documents"    },
];

export default function Layout({ children }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  const initials = admin?.name
    ? admin.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <div className="layout-root">
      {/* ── TOP NAVBAR ──────────────────────────── */}
      <header className="top-navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <ShieldIcon />
          <div className="navbar-logo-text">
            <span className="logo-title">Enterprise</span>
            <span className="logo-sub">Admin</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="navbar-links">
          <NavLink to="/dashboard"       className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
          <NavLink to="/submissions"     className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Event Submissions</NavLink>
          <NavLink to="/content-monitor" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Content Monitor</NavLink>
          <NavLink to="/roles"           className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Role Manage</NavLink>
          <NavLink to="/reminders"       className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reminder</NavLink>
        </nav>


        {/* Right: Bell + Avatar */}
        <div className="navbar-right">

          {/* Bell → /notifications */}
          <button className="bell-btn" onClick={() => navigate("/notifications")}>
            <BellIcon />
            <span className="bell-badge">3</span>
          </button>

          {/* Avatar + dropdown */}
          <div className="user-menu" style={{ position: "relative" }}>
            <div className="user-menu-trigger" onClick={() => setDropOpen(v => !v)}>
              <div className="user-avatar">{initials}</div>
              <div className="user-info">
                <span className="user-name">{admin?.name || "Admin"}</span>
                <span className="user-role">{admin?.role || "Admin"}</span>
              </div>
              <svg width="14" height="14" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"
                style={{ transform: dropOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            {dropOpen && (
              <>
                <div style={{ position:"fixed", inset:0, zIndex:49 }}
                  onClick={() => setDropOpen(false)} />
                <div className="user-dropdown">
                  {/* Header */}
                  <div className="dropdown-user-header">
                    <div className="dropdown-avatar">{initials}</div>
                    <div>
                      <div className="dropdown-name">{admin?.name || "Super Admin"}</div>
                      <div className="dropdown-email">{admin?.email || "admin@notivo.edu"}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />

                  {DROP_ITEMS.map(item => (
                    <button key={item.path} className="dropdown-item"
                      onClick={() => { setDropOpen(false); navigate(item.path); }}>
                      <span className="dropdown-item-icon">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}

                  <div className="dropdown-divider" />
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    <span className="dropdown-item-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── PAGE CONTENT ─────────────────────────── */}
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}
