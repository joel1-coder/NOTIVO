import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
);

const initDepts = [
  { id:1, name:"Computer Science",        code:"CS",  hod:"Dr. Sarah Jenkins",    email:"cs.hod@notivo.edu",   staff:24, status:"Active",   color:"#2563EB" },
  { id:2, name:"Electrical Engineering",  code:"EE",  hod:"Prof. David Miller",   email:"ee.hod@notivo.edu",   staff:18, status:"Active",   color:"#7C3AED" },
  { id:3, name:"Mechanical Engineering",  code:"ME",  hod:"Prof. James Okafor",   email:"me.hod@notivo.edu",   staff:21, status:"Active",   color:"#059669" },
  { id:4, name:"Physics",                 code:"PHY", hod:"Dr. Priya Nair",       email:"phy.hod@notivo.edu",  staff:12, status:"Active",   color:"#D97706" },
  { id:5, name:"Arts & Humanities",       code:"AH",  hod:"Dr. Lakshmi Patel",    email:"ah.hod@notivo.edu",   staff:15, status:"Active",   color:"#DB2777" },
  { id:6, name:"Physical Education",      code:"PE",  hod:"Mr. Ramesh Babu",      email:"pe.hod@notivo.edu",   staff:8,  status:"Inactive", color:"#6B7280" },
  { id:7, name:"Mathematics",             code:"MTH", hod:"Prof. Arun Kumar",     email:"mth.hod@notivo.edu",  staff:10, status:"Active",   color:"#0891B2" },
];

const EMPTY = { name:"", code:"", hod:"", email:"", staff:0, status:"Active", color:"#2563EB" };

export default function DepartmentManagementPage() {
  const [depts, setDepts]       = useState(initDepts);
  const [search, setSearch]     = useState("");
  const [modalOpen, setModal]   = useState(false);
  const [editItem, setEditItem] = useState(null);   // null = new, obj = edit
  const [form, setForm]         = useState(EMPTY);
  const [deleteId, setDeleteId] = useState(null);
  const [toastMsg, setToast]    = useState("");

  const toast = (m) => { setToast(m); setTimeout(() => setToast(""), 2600); };

  const filtered = depts.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.hod.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase())
  );

  const openNew  = ()    => { setForm(EMPTY); setEditItem(null); setModal(true); };
  const openEdit = (d)   => { setForm({ ...d }); setEditItem(d.id); setModal(true); };
  const closeModal = ()  => setModal(false);

  const handleSave = () => {
    if (!form.name.trim() || !form.hod.trim()) return;
    if (editItem) {
      setDepts(prev => prev.map(d => d.id === editItem ? { ...d, ...form } : d));
      toast("Department updated!");
    } else {
      setDepts(prev => [...prev, { ...form, id: Date.now(), staff: +form.staff || 0 }]);
      toast("Department added!");
    }
    setModal(false);
  };

  const confirmDelete = () => {
    setDepts(prev => prev.filter(d => d.id !== deleteId));
    setDeleteId(null);
    toast("Department removed.");
  };

  const totalStaff   = depts.reduce((a, d) => a + d.staff, 0);
  const activeCount  = depts.filter(d => d.status === "Active").length;

  return (
    <Layout>
      <div className="tasks-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">Department Management</span>
        </nav>

        {/* Header */}
        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Department Management</h1>
            <p className="tasks-subtitle">Manage college departments, HODs and staff allocations.</p>
          </div>
          <button className="es-review-btn" onClick={openNew}>+ Add Department</button>
        </div>

        {/* Stats */}
        <div className="es-stats-grid">
          {[
            { label:"Total Departments", value:depts.length,  icon:"🏛",  color:"#2563EB", bg:"#DBEAFE" },
            { label:"Active",            value:activeCount,   icon:"✅",  color:"#166534", bg:"#DCFCE7" },
            { label:"Inactive",          value:depts.length - activeCount, icon:"⏸", color:"#6B7280", bg:"#F3F4F6" },
            { label:"Total Staff",       value:totalStaff,   icon:"👥",  color:"#7C3AED", bg:"#EDE9FE" },
          ].map(c => (
            <div key={c.label} className="es-stat-card">
              <div className="es-stat-icon" style={{ background:c.bg }}>{c.icon}</div>
              <div>
                <div className="es-stat-value" style={{ color:c.color }}>{c.value}</div>
                <div className="es-stat-label">{c.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="dept-search-bar">
          <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input className="dept-search-input" placeholder="Search departments, HODs…"
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>

        {/* Toast */}
        {toastMsg && <div className="notif-flash">{toastMsg}</div>}

        {/* Cards grid */}
        <div className="dept-cards-grid">
          {filtered.map(d => (
            <div key={d.id} className="dept-card">
              <div className="dept-card-top" style={{ background: d.color }}>
                <div className="dept-code-badge">{d.code}</div>
                <span className={`dept-status-pill ${d.status === "Active" ? "dept-active" : "dept-inactive"}`}>
                  {d.status}
                </span>
              </div>
              <div className="dept-card-body">
                <div className="dept-card-name">{d.name}</div>
                <div className="dept-card-hod">
                  <span className="dept-meta-label">HOD</span>
                  {d.hod}
                </div>
                <div className="dept-card-email">
                  <span className="dept-meta-label">Email</span>
                  {d.email}
                </div>
                <div className="dept-card-staff">
                  <span className="dept-staff-count">👥 {d.staff} Staff</span>
                </div>
                <div className="dept-card-actions">
                  <button className="dept-edit-btn" onClick={() => openEdit(d)}>✏ Edit</button>
                  <button className="dept-del-btn"  onClick={() => setDeleteId(d.id)}>🗑 Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="dept-modal" onClick={e => e.stopPropagation()}>
              <div className="dept-modal-header">
                <h3>{editItem ? "Edit Department" : "Add New Department"}</h3>
                <button className="modal-close" onClick={closeModal}>✕</button>
              </div>
              <div className="dept-modal-body">
                {[
                  { label:"Department Name *", key:"name",  type:"text",   ph:"e.g. Computer Science"  },
                  { label:"Dept Code",         key:"code",  type:"text",   ph:"e.g. CS"                },
                  { label:"HOD Name *",        key:"hod",   type:"text",   ph:"Dr. Full Name"          },
                  { label:"HOD Email",         key:"email", type:"email",  ph:"hod@notivo.edu"         },
                  { label:"Staff Count",       key:"staff", type:"number", ph:"0"                      },
                ].map(f => (
                  <div key={f.key} className="dept-field">
                    <label className="dept-field-label">{f.label}</label>
                    <input type={f.type} className="dept-field-input" placeholder={f.ph}
                      value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}/>
                  </div>
                ))}
                <div className="dept-field">
                  <label className="dept-field-label">Status</label>
                  <select className="dept-field-input" value={form.status}
                    onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                    <option>Active</option><option>Inactive</option>
                  </select>
                </div>
                <div className="dept-field">
                  <label className="dept-field-label">Card Colour</label>
                  <input type="color" value={form.color}
                    onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                    style={{ width:44, height:34, border:"none", borderRadius:8, cursor:"pointer" }}/>
                </div>
              </div>
              <div className="dept-modal-footer">
                <button className="dept-cancel-btn" onClick={closeModal}>Cancel</button>
                <button className="dept-save-btn" onClick={handleSave}>
                  {editItem ? "Save Changes" : "Add Department"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteId && (
          <div className="modal-overlay" onClick={() => setDeleteId(null)}>
            <div className="dept-modal" style={{ maxWidth:400 }} onClick={e => e.stopPropagation()}>
              <div className="dept-modal-header">
                <h3>Delete Department?</h3>
                <button className="modal-close" onClick={() => setDeleteId(null)}>✕</button>
              </div>
              <div className="dept-modal-body">
                <p style={{ fontSize:14, color:"#374151", lineHeight:1.6 }}>
                  This will permanently remove the department and all associated data. This action cannot be undone.
                </p>
              </div>
              <div className="dept-modal-footer">
                <button className="dept-cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="dept-save-btn" style={{ background:"#EF4444" }} onClick={confirmDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
