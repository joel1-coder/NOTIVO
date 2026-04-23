import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const ShieldIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 6v5c0 5.25 3.84 10.16 9 11.38C17.16 21.16 21 16.25 21 11V6L12 2z" fill="#6366F1" />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DROP_ITEMS = [
  { icon: "👤", label: "My Profile",       path: "/profile"      },
  { icon: "🎨", label: "Circular Designer", path: "/designer"     },
  { icon: "🏛",  label: "Departments",       path: "/departments"  },
  { icon: "📤", label: "Send Notification", path: "/compose"      },
  { icon: "📋", label: "Audit Log",         path: "/audit-log"    },
  { icon: "📊", label: "Analytics",         path: "/analytics"    },
  { icon: "📄", label: "Document Review",   path: "/documents"    },
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
      {/* ── TOP NAVBAR ─────────────────────────────── */}
      <header className="top-navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <ShieldIcon />
          <div className="navbar-logo-text">
            <span className="logo-title">Enterprise</span>
            <span className="logo-sub">Admin Portal</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="navbar-links">
          <NavLink to="/dashboard"       className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
          <NavLink to="/submissions"     className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Events</NavLink>
          <NavLink to="/content-monitor" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Content</NavLink>
          <NavLink to="/roles"           className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Roles</NavLink>
          <NavLink to="/reminders"       className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reminders</NavLink>
        </nav>

        {/* Right controls */}
        <div className="navbar-right">
          <ThemeToggle />

          <button className="bell-btn" onClick={() => navigate("/notifications")} aria-label="Notifications">
            <BellIcon />
            <span className="bell-badge">3</span>
          </button>

          {/* Avatar + dropdown */}
          <div className="user-menu">
            <div className="user-menu-trigger" onClick={() => setDropOpen(v => !v)}>
              <div className="user-avatar">{initials}</div>
              <div className="user-info">
                <span className="user-name">{admin?.name || "Admin"}</span>
                <span className="user-role">{admin?.role || "admin"}</span>
              </div>
              <ChevronDown />
            </div>

            {dropOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 49 }}
                  onClick={() => setDropOpen(false)}
                />
                <div className="user-dropdown">
                  <div className="dropdown-user-header">
                    <div className="dropdown-avatar">{initials}</div>
                    <div>
                      <div className="dropdown-name">{admin?.name || "Super Admin"}</div>
                      <div className="dropdown-email">{admin?.email || "admin@notivo.edu"}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />

                  {DROP_ITEMS.map(item => (
                    <button
                      key={item.path}
                      className="dropdown-item"
                      onClick={() => { setDropOpen(false); navigate(item.path); }}
                    >
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

      {/* ── PAGE CONTENT ───────────────────────────── */}
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}
