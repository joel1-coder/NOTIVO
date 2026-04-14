import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const PowerIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const UserIcon = () => (
  <svg width="36" height="36" fill="none" stroke="#9CA3AF" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

/* ── Initial user data ──────────────────────── */
const initUsers = [
  { id: "USR-001", name: "Alex Rivera",   email: "alex.rivera@notivo.edu",   role: "Admin", dept: "Administration", status: "Active",   avatarBg: "#2563EB", initials: "AR" },
  { id: "USR-002", name: "Dr. Priya Nair", email: "priya.nair@notivo.edu",  role: "HOD",   dept: "Mechanical Engg", status: "Active",   avatarBg: "#8B5CF6", initials: "PN" },
  { id: "USR-003", name: "James Okafor",  email: "james.okafor@notivo.edu", role: "HOD",   dept: "Human Resources", status: "Active",   avatarBg: "#F97316", initials: "JO" },
  { id: "USR-004", name: "Sarah Jenkins", email: "sarah.j@notivo.edu",      role: "HOD",   dept: "Computer Science", status: "Inactive", avatarBg: "#10B981", initials: "SJ" },
  { id: "USR-005", name: "Robert Chen",   email: "r.chen@notivo.edu",       role: "Admin", dept: "Administration", status: "Active",   avatarBg: "#EF4444", initials: "RC" },
  { id: "USR-006", name: "Linda Torres",  email: "l.torres@notivo.edu",     role: "HOD",   dept: "Legal",           status: "Active",   avatarBg: "#06B6D4", initials: "LT" },
  { id: "USR-007", name: "David Miller",  email: "d.miller@notivo.edu",     role: "HOD",   dept: "Finance",         status: "Inactive", avatarBg: "#F59E0B", initials: "DM" },
];

const departments = ["Administration","Mechanical Engg","Human Resources","Computer Science","Legal","Finance","Marketing","Engineering"];

/* ── Component ──────────────────────────────── */
export default function RoleManagementPage() {
  const [users, setUsers]           = useState(initUsers);
  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showModal, setShowModal]   = useState(false);
  const [editUser, setEditUser]     = useState(null);   // user being edited
  const [success, setSuccess]       = useState("");

  /* New user form state */
  const emptyForm = { firstName:"", lastName:"", staffId:"", email:"", dob:"", dept: departments[0], role:"HOD" };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  /* Stats */
  const totalUsers  = users.length;
  const activeNow   = users.filter(u => u.status === "Active").length;
  const inactiveNum = users.filter(u => u.status === "Inactive").length;

  const statCards = [
    { label: "Total Users",  value: totalUsers,  bg: "#1E3A5F", textColor: "#fff", subColor: "rgba(255,255,255,0.7)", sub: "Registered accounts" },
    { label: "Active Now",   value: activeNow,   bg: "#fff",    textColor: "#111827", subColor: "#10B981", sub: "Currently active",  bar: { color: "#10B981", pct: Math.round(activeNow/totalUsers*100) } },
    { label: "Inactive",     value: inactiveNum, bg: "#fff",    textColor: "#111827", subColor: "#EF4444", sub: "Deactivated users",  bar: { color: "#EF4444", pct: Math.round(inactiveNum/totalUsers*100) } },
  ];

  /* Filter */
  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
    const matchRole   = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  /* Toggle status */
  const toggleStatus = (id) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));

  /* Open edit modal */
  const openEdit = (user) => {
    const [firstName, ...rest] = user.name.split(" ");
    setForm({ firstName, lastName: rest.join(" "), staffId: user.id, email: user.email, dob: "", dept: user.dept, role: user.role });
    setEditUser(user);
    setShowModal(true);
  };

  /* Validate */
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.staffId.trim())   e.staffId   = "Required";
    if (!form.email.trim())     e.email     = "Required";
    return e;
  };

  /* Save */
  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const fullName   = `${form.firstName} ${form.lastName}`;
    const initials   = `${form.firstName[0]}${form.lastName[0]}`.toUpperCase();
    const avatarBg   = editUser ? editUser.avatarBg : "#2563EB";
    const avatarBgs  = ["#2563EB","#8B5CF6","#F97316","#10B981","#EF4444","#06B6D4","#F59E0B"];

    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id
        ? { ...u, name: fullName, email: form.email, role: form.role, dept: form.dept, initials }
        : u));
      setSuccess("User updated successfully!");
    } else {
      const newId = `USR-${String(users.length + 1).padStart(3, "0")}`;
      setUsers(prev => [...prev, {
        id: newId, name: fullName, email: form.email, role: form.role,
        dept: form.dept, status: "Active", initials,
        avatarBg: avatarBgs[prev.length % avatarBgs.length],
      }]);
      setSuccess("User successfully created!");
    }
    setForm(emptyForm); setErrors({}); setEditUser(null); setShowModal(false);
    setTimeout(() => setSuccess(""), 3000);
  };

  const openAdd = () => { setForm(emptyForm); setEditUser(null); setErrors({}); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditUser(null); setErrors({}); setForm(emptyForm); };

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">Role Management</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Role Management</h1>
            <p className="tasks-subtitle">Manage user accounts, roles, and access levels.</p>
          </div>
          <button className="add-user-btn" onClick={openAdd}>
            <PlusIcon /> Add User
          </button>
        </div>

        {/* Success banner */}
        {success && <div className="rm-global-success">✅ {success}</div>}

        {/* Stat Cards — 3 columns */}
        <div className="role-stat-grid">
          {statCards.map(c => (
            <div key={c.label} className="tasks-stat-card" style={{ background: c.bg, color: c.textColor }}>
              <div className="tsc-top">
                <span className="tsc-label" style={{ color: c.bg !== "#fff" ? "rgba(255,255,255,0.75)" : "#6B7280" }}>
                  {c.label}
                </span>
              </div>
              <div className="tsc-value" style={{ color: c.textColor }}>{c.value}</div>
              <div className="tsc-sub" style={{ color: c.subColor }}>{c.sub}</div>
              {c.bar && (
                <div className="tsc-bar-track">
                  <div className="tsc-bar-fill" style={{ width: `${c.bar.pct}%`, background: c.bar.color }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="tasks-filter-bar">
          <div className="tasks-search" style={{ flex: 1 }}>
            <SearchIcon />
            <input type="text" placeholder="Search by name, email or ID…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="tasks-search-input" />
          </div>
          <select className="tasks-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="All">Role: All</option>
            <option>Admin</option>
            <option>HOD</option>
          </select>
        </div>

        {/* Table */}
        <div className="tasks-table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>USER</th>
                <th>STAFF ID</th>
                <th>EMAIL</th>
                <th>DEPARTMENT</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={7} className="no-results">No users found.</td></tr>
                : filtered.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="assignee-cell">
                        <div className="assignee-avatar" style={{ background: u.avatarBg }}>{u.initials}</div>
                        <span className="assignee-name">{u.name}</span>
                      </div>
                    </td>
                    <td className="task-row-id" style={{ fontWeight: 600, color: "#374151" }}>{u.id}</td>
                    <td className="dept-cell">{u.email}</td>
                    <td className="dept-cell">{u.dept}</td>
                    <td>
                      <span className={`role-badge ${u.role === "Admin" ? "role-admin" : "role-hod"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span className={`task-status-badge ${u.status === "Active" ? "status-active-badge" : "status-inactive-badge"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="view-details-btn" onClick={() => openEdit(u)}>
                          <EditIcon /> Edit
                        </button>
                        <button
                          className={`deactivate-btn ${u.status === "Inactive" ? "activate-btn" : ""}`}
                          onClick={() => toggleStatus(u.id)}
                        >
                          <PowerIcon /> {u.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="table-footer">
            <span className="showing-text">Showing {filtered.length} of {users.length} users</span>
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add / Edit User Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header">
              <h3>{editUser ? "Edit User" : "Create New User"}</h3>
              <button className="modal-close" onClick={closeModal}><XIcon /></button>
            </div>

            {/* Avatar placeholder */}
            <div className="modal-avatar-row">
              <div className="modal-avatar-placeholder">
                <UserIcon />
              </div>
              <div>
                <p className="modal-avatar-label">Profile Photo</p>
                <button className="modal-photo-btn">Upload Photo</button>
              </div>
            </div>

            {/* Form */}
            <div className="modal-grid">
              <div className="rm-field">
                <label className="rm-label">First Name</label>
                <input className={`rm-input ${errors.firstName ? "rm-input-err" : ""}`}
                  placeholder="e.g. Alex" value={form.firstName}
                  onChange={e => setForm({...form, firstName: e.target.value})} />
                {errors.firstName && <span className="rm-error">{errors.firstName}</span>}
              </div>
              <div className="rm-field">
                <label className="rm-label">Last Name</label>
                <input className={`rm-input ${errors.lastName ? "rm-input-err" : ""}`}
                  placeholder="e.g. Rivera" value={form.lastName}
                  onChange={e => setForm({...form, lastName: e.target.value})} />
                {errors.lastName && <span className="rm-error">{errors.lastName}</span>}
              </div>
              <div className="rm-field">
                <label className="rm-label">Staff ID</label>
                <input className={`rm-input ${errors.staffId ? "rm-input-err" : ""}`}
                  placeholder="e.g. USR-008" value={form.staffId}
                  onChange={e => setForm({...form, staffId: e.target.value})} />
                {errors.staffId && <span className="rm-error">{errors.staffId}</span>}
              </div>
              <div className="rm-field">
                <label className="rm-label">Date of Birth</label>
                <input className="rm-input" type="date" value={form.dob}
                  onChange={e => setForm({...form, dob: e.target.value})} />
              </div>
              <div className="rm-field" style={{ gridColumn: "1 / -1" }}>
                <label className="rm-label">College Email</label>
                <input className={`rm-input ${errors.email ? "rm-input-err" : ""}`}
                  placeholder="e.g. user@notivo.edu" type="email" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})} />
                {errors.email && <span className="rm-error">{errors.email}</span>}
              </div>
              <div className="rm-field">
                <label className="rm-label">Department</label>
                <select className="rm-select" value={form.dept}
                  onChange={e => setForm({...form, dept: e.target.value})}>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="rm-field">
                <label className="rm-label">Role</label>
                <div className="role-radio-group">
                  {["Admin","HOD"].map(r => (
                    <label key={r} className={`role-radio-btn ${form.role === r ? "role-radio-active" : ""}`}>
                      <input type="radio" name="role" value={r}
                        checked={form.role === r}
                        onChange={() => setForm({...form, role: r})} />
                      {r}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={closeModal}>Cancel</button>
              <button className="modal-save-btn" onClick={handleSave}>
                <CheckIcon /> {editUser ? "Save Changes" : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
