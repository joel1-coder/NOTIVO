import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const CameraIcon = () => (
  <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const recentActivity = [
  { action:"Logged in",                  time:"Today, 09:12 AM",      icon:"🔐", color:"#6366F1" },
  { action:"Created task TSK-9902",      time:"Today, 09:30 AM",      icon:"📋", color:"#22c55e" },
  { action:"Updated role for USR-004",   time:"Yesterday, 03:15 PM",  icon:"👤", color:"#f59e0b" },
  { action:"Uploaded Q3_Report.pdf",     time:"Yesterday, 11:00 AM",  icon:"📁", color:"#3b82f6" },
  { action:"Deactivated USR-007",        time:"2 days ago, 02:10 PM", icon:"⚡", color:"#ef4444" },
];

const securityItems = [
  { label:"Change Password",            sub:"Last changed 3 months ago",      icon:"🔑", btn:"Update",   color:"#6366F1" },
  { label:"Two-Factor Authentication",  sub:"Currently disabled",              icon:"📱", btn:"Enable",   color:"#22c55e" },
  { label:"Active Sessions",            sub:"1 active session (this device)",  icon:"💻", btn:"Manage",   color:"#3b82f6" },
  { label:"Login History",              sub:"View past login attempts",        icon:"📋", btn:"View Log", color:"#f59e0b" },
];

export default function UserProfilePage() {
  const { admin } = useAuth();
  const [editing,   setEditing]  = useState(false);
  const [saved,     setSaved]    = useState(false);
  const [activeTab, setTab]      = useState("info");
  const [form, setForm] = useState({
    fullName:   admin?.name  || "Super Admin",
    email:      admin?.email || "admin@notivo.edu",
    phone:      "+1 (555) 012-3456",
    department: "Administration",
    staffId:    admin?.staffId || "ADM-001",
    joinDate:   "January 15, 2021",
    role:       admin?.role  || "Admin",
    bio:        "Enterprise administrator responsible for managing staff roles, task assignments and system configurations.",
  });

  const handleSave = () => {
    setSaved(true); setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = form.fullName.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);

  const TABS = [
    { key:"info",     label:"Personal Info",   icon:"👤" },
    { key:"security", label:"Security",        icon:"🔐" },
    { key:"activity", label:"Activity",        icon:"📋" },
  ];

  const Field = ({ label, field, type="text" }) => (
    <div className="rm-field">
      <label className="rm-label">{label}</label>
      {editing
        ? <input type={type} className="rm-input" value={form[field]}
            onChange={e=>setForm({...form,[field]:e.target.value})}/>
        : <div className="profile-field-value">{form[field]}</div>
      }
    </div>
  );

  return (
    <Layout>
      <div className="profile-page">
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">User Profile</span>
        </nav>

        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">User Profile</h1>
            <p className="tasks-subtitle">Manage your personal information and account settings.</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {editing ? (
              <>
                <button className="edit-profile-btn" onClick={()=>setEditing(false)}>Cancel</button>
                <button className="save-profile-btn" onClick={handleSave}>💾 Save Changes</button>
              </>
            ) : (
              <button className="edit-profile-btn" onClick={()=>setEditing(true)}>✏️ Edit Profile</button>
            )}
          </div>
        </div>

        {saved && <div className="rm-global-success">✅ Profile updated successfully!</div>}

        <div className="profile-layout">
          {/* ── Left Avatar Card ── */}
          <div className="profile-avatar-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-circle">{initials}</div>
              <button className="avatar-camera-btn" title="Change photo"><CameraIcon/></button>
            </div>
            <h2 className="profile-name">{form.fullName}</h2>
            <div className="profile-role-badge">
              <span>🛡️</span> <span>{form.role}</span>
            </div>

            <div className="profile-meta-list">
              {[
                { icon:"✉️", val:form.email      },
                { icon:"📞", val:form.phone      },
                { icon:"🏛️", val:form.department },
                { icon:"📅", val:`Joined ${form.joinDate}` },
              ].map((m,i) => (
                <div key={i} className="profile-meta-item">
                  <span>{m.icon}</span>
                  <span style={{marginLeft:6,fontSize:12.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {m.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="profile-stats-row">
              {[
                { value:"124",  label:"Tasks" },
                { value:"89%",  label:"Rate"  },
                { value:"3 yr", label:"Tenure" },
              ].map((s,i) => (
                <React.Fragment key={s.label}>
                  {i>0 && <div className="profile-stat-divider"/>}
                  <div className="profile-stat">
                    <div className="ps-value">{s.value}</div>
                    <div className="ps-label">{s.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Skills */}
            <div style={{width:"100%",paddingTop:12,borderTop:"1px solid var(--border-light,#F3F4F6)"}}>
              <p style={{fontSize:10.5,fontWeight:700,color:"var(--text-tertiary,#9CA3AF)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>
                Skills
              </p>
              {["Administration","Role Management","Task Planning","Analytics","Reporting"].map(sk => (
                <span key={sk} style={{
                  display:"inline-block",margin:"0 4px 6px 0",
                  padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,
                  background:"var(--bg-surface-3,#F3F4F6)",color:"var(--text-secondary,#374151)"
                }}>{sk}</span>
              ))}
            </div>
          </div>

          {/* ── Right Tabbed Panel ── */}
          <div className="profile-right-col">
            {/* Tab Nav */}
            <div style={{
              display:"flex",background:"var(--bg-surface,#fff)",
              borderRadius:"14px 14px 0 0",borderBottom:"2px solid var(--border-light,#F3F4F6)",
              overflow:"hidden"
            }}>
              {TABS.map(t => (
                <button key={t.key} onClick={()=>setTab(t.key)} style={{
                  flex:1,padding:"13px 8px",border:"none",cursor:"pointer",
                  fontSize:13,fontWeight:600,gap:6,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  background: activeTab===t.key ? "var(--bg-surface,#fff)" : "var(--bg-surface-2,#F9FAFB)",
                  color: activeTab===t.key ? "#6366F1" : "var(--text-tertiary,#9CA3AF)",
                  borderBottom: activeTab===t.key ? "2px solid #6366F1" : "2px solid transparent",
                  marginBottom:"-2px",transition:"all 0.18s",
                }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Personal Info */}
            {activeTab==="info" && (
              <div className="profile-details-card" style={{borderRadius:"0 0 14px 14px",marginTop:0}}>
                <h3 className="profile-section-title">Personal Information</h3>
                <p style={{fontSize:12.5,color:"var(--text-tertiary,#9CA3AF)",marginBottom:16}}>
                  {editing ? "Fields are editable — click Save Changes when done." : "Click Edit Profile to update your info."}
                </p>
                <div className="profile-form-grid">
                  <Field label="Full Name"  field="fullName"/>
                  <Field label="Staff ID"   field="staffId"/>
                  <Field label="Email"      field="email"      type="email"/>
                  <Field label="Phone"      field="phone"      type="tel"/>
                  <Field label="Department" field="department"/>
                  <Field label="Join Date"  field="joinDate"/>
                </div>
                <div className="rm-field" style={{marginTop:14}}>
                  <label className="rm-label">Bio</label>
                  {editing
                    ? <textarea className="rm-input" rows={3} style={{resize:"vertical"}}
                        value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/>
                    : <div className="profile-field-value" style={{lineHeight:1.6}}>{form.bio}</div>
                  }
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab==="security" && (
              <div className="profile-details-card" style={{borderRadius:"0 0 14px 14px",marginTop:0}}>
                <h3 className="profile-section-title">Security Settings</h3>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {securityItems.map((item,i) => (
                    <div key={i} style={{
                      display:"flex",alignItems:"center",gap:14,
                      padding:"14px 16px",borderRadius:10,
                      background:"var(--bg-surface-2,#F9FAFB)",
                      border:"1px solid var(--border-light,#F3F4F6)",
                    }}>
                      <span style={{fontSize:22,flexShrink:0}}>{item.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13.5,fontWeight:700,color:"var(--text-primary,#111827)"}}>{item.label}</div>
                        <div style={{fontSize:12,color:"var(--text-tertiary,#9CA3AF)",marginTop:2}}>{item.sub}</div>
                      </div>
                      <button style={{
                        padding:"6px 14px",borderRadius:8,border:"none",
                        background:item.color,color:"#fff",
                        fontSize:12.5,fontWeight:600,cursor:"pointer",flexShrink:0,
                      }}>{item.btn}</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity */}
            {activeTab==="activity" && (
              <div className="profile-details-card" style={{borderRadius:"0 0 14px 14px",marginTop:0}}>
                <h3 className="profile-section-title">Recent Activity</h3>
                <ul className="profile-activity-list">
                  {recentActivity.map((a,i) => (
                    <li key={i} className="profile-activity-item">
                      <div style={{
                        width:36,height:36,borderRadius:10,flexShrink:0,
                        background:`${a.color}18`,
                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,
                      }}>{a.icon}</div>
                      <div className="pa-info">
                        <div className="pa-action">{a.action}</div>
                        <div className="pa-time">{a.time}</div>
                      </div>
                      <div style={{width:8,height:8,borderRadius:"50%",background:a.color,flexShrink:0}}/>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
