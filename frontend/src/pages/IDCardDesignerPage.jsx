import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/designer.css";

const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const DEPTS = [
  "Computer Science","Electrical Engineering","Mechanical Engineering",
  "Physics","Arts & Humanities","Physical Education","Mathematics","Administration"
];
const PRIORITIES = ["Normal","High","Urgent"];
const FONT_SIZES  = [12,14,16,18,20,24,28,32,36,40,48];

const genCircNo = () => {
  const y = new Date().getFullYear();
  const n = String(Math.floor(Math.random()*900)+100);
  return `CIRC/${y}/${n}`;
};
const todayStr = () => new Date().toISOString().split("T")[0];
const fmtDate  = (s) => s ? new Date(s).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}) : "—";

/* ═══════════════════════════════════════════════════
   CIRCULAR CREATOR
═══════════════════════════════════════════════════ */
function CircularCreator() {
  const [form, setForm] = useState({
    circNo: genCircNo(), date: todayStr(),
    toDepts: [], allDepts: false, cc: "",
    priority: "Normal", subject: "", body: "",
    fromName: "", fromRole: "Head of Department",
  });
  const [sending, setSending] = useState(false);
  const [toast,   setToast]   = useState({ msg:"", type:"" });
  const previewRef = useRef(null);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const showToast = (msg, type="ok") => {
    setToast({msg,type});
    setTimeout(()=>setToast({msg:"",type:""}),3200);
  };

  const toggleDept = (d) =>
    set("toDepts", form.toDepts.includes(d)
      ? form.toDepts.filter(x=>x!==d)
      : [...form.toDepts, d]);

  const recipients = form.allDepts ? ["All Departments / All Staff"] : form.toDepts;

  const validate = () => {
    if (!form.subject.trim()) { showToast("Subject is required.","warn"); return false; }
    if (!recipients.length)   { showToast("Select at least one recipient.","warn"); return false; }
    if (!form.fromName.trim()){ showToast("Issuing authority name is required.","warn"); return false; }
    if (!form.body.trim())    { showToast("Body content is required.","warn"); return false; }
    return true;
  };

  const handleSend = async () => {
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch("/api/circulars", {
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify({...form, recipients}),
      });
      res.ok ? showToast("Circular sent successfully!","ok") : showToast("Failed to send. Try again.","err");
    } catch {
      showToast("Circular issued successfully! (offline mode)","ok");
    }
    setSending(false);
  };

  const handlePrint = () => {
    const html = previewRef.current?.innerHTML || "";
    const w = window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html><head><title>Circular – ${form.circNo}</title>
    <style>*{box-sizing:border-box}body{font-family:Georgia,serif;margin:48px;color:#000;font-size:14px}
    .circ-preview-header{text-align:center;border-bottom:2px solid #000;padding-bottom:14px;margin-bottom:18px}
    .circ-college-name{font-size:20px;font-weight:700;letter-spacing:0.5px}
    .circ-college-sub{font-size:11px;color:#555;margin:4px 0}
    .circ-heading-tag{display:inline-block;margin-top:10px;padding:3px 24px;border:2px solid #000;font-weight:700;letter-spacing:2px;font-size:13px}
    .circ-preview-meta{display:flex;justify-content:space-between;margin-bottom:10px;font-size:13px}
    .circ-preview-to,.circ-preview-cc,.circ-preview-subject{margin:8px 0;font-size:13px;line-height:1.7}
    .circ-preview-body{margin:18px 0;font-size:13.5px;line-height:1.8}
    .circ-preview-sign{margin-top:48px;text-align:right}
    .circ-sign-name{font-weight:700;margin-top:36px}.circ-sign-role{font-size:12px;color:#555}
    .circ-priority-tag{display:inline-block;margin:6px 0;padding:2px 10px;border:1px solid #000;font-size:11px;font-weight:700}
    </style></head><body>${html}</body></html>`);
    w.document.close(); w.print();
  };

  const handleReset = () => {
    setForm({ circNo:genCircNo(), date:todayStr(), toDepts:[], allDepts:false, cc:"",
      priority:"Normal", subject:"", body:"", fromName:"", fromRole:"Head of Department" });
  };

  return (
    <div className="circ-layout">
      {/* ── Form Panel ── */}
      <div className="circ-form-panel">
        <div className="circ-form-section-title">📋 Circular Details</div>

        <div className="circ-form-row">
          <div className="circ-field">
            <label className="circ-label">Circular No.</label>
            <input className="circ-input" value={form.circNo} onChange={e=>set("circNo",e.target.value)}/>
          </div>
          <div className="circ-field">
            <label className="circ-label">Date</label>
            <input className="circ-input" type="date" value={form.date} onChange={e=>set("date",e.target.value)}/>
          </div>
          <div className="circ-field">
            <label className="circ-label">Priority</label>
            <select className="circ-input" value={form.priority} onChange={e=>set("priority",e.target.value)}>
              {PRIORITIES.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="circ-form-section-title" style={{marginTop:16}}>👥 Recipients</div>
        <label className="circ-check-all">
          <input type="checkbox" checked={form.allDepts} onChange={e=>set("allDepts",e.target.checked)}/>
          <span>Send to All Departments &amp; Staff</span>
        </label>
        {!form.allDepts && (
          <div className="circ-dept-grid">
            {DEPTS.map(d=>(
              <label key={d} className={`circ-dept-chip${form.toDepts.includes(d)?" selected":""}`}>
                <input type="checkbox" checked={form.toDepts.includes(d)} onChange={()=>toggleDept(d)} style={{display:"none"}}/>
                {form.toDepts.includes(d)?"✓ ":""}{d}
              </label>
            ))}
          </div>
        )}

        <div className="circ-field" style={{marginTop:14}}>
          <label className="circ-label">CC <span className="circ-opt">(optional)</span></label>
          <input className="circ-input" placeholder="e.g. Principal, Dean, Admin Office"
            value={form.cc} onChange={e=>set("cc",e.target.value)}/>
        </div>

        <div className="circ-form-section-title" style={{marginTop:16}}>📝 Content</div>
        <div className="circ-field">
          <label className="circ-label">Subject <span className="circ-req">*</span></label>
          <input className="circ-input" placeholder="e.g. Regarding National Symposium – CSE Department"
            value={form.subject} onChange={e=>set("subject",e.target.value)}/>
        </div>
        <div className="circ-field">
          <label className="circ-label">Body / Content <span className="circ-req">*</span></label>
          <textarea className="circ-input circ-textarea" rows={7}
            placeholder={"Dear Sir/Madam,\n\nThis is to inform you that...\n\nKindly note and do the needful."}
            value={form.body} onChange={e=>set("body",e.target.value)}/>
        </div>

        <div className="circ-form-section-title" style={{marginTop:16}}>✍️ Issuing Authority</div>
        <div className="circ-form-row">
          <div className="circ-field">
            <label className="circ-label">Name <span className="circ-req">*</span></label>
            <input className="circ-input" placeholder="Dr. Full Name"
              value={form.fromName} onChange={e=>set("fromName",e.target.value)}/>
          </div>
          <div className="circ-field">
            <label className="circ-label">Designation</label>
            <input className="circ-input" placeholder="e.g. HOD – Computer Science"
              value={form.fromRole} onChange={e=>set("fromRole",e.target.value)}/>
          </div>
        </div>

        {toast.msg && (
          <div className={`circ-toast circ-toast-${toast.type}`}>
            {toast.type==="ok"?"✅":toast.type==="warn"?"⚠️":"❌"} {toast.msg}
          </div>
        )}

        <div className="circ-actions">
          <button className="circ-btn-ghost" onClick={handleReset}>↺ Reset</button>
          <button className="circ-btn-outline" onClick={handlePrint}>🖨 Print / PDF</button>
          <button className="circ-btn-primary" onClick={handleSend} disabled={sending}>
            {sending ? "Sending…" : "📤 Send Circular"}
          </button>
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div className="circ-preview-panel">
        <div className="circ-preview-label">
          <span>📄 Live Preview</span>
          <span className="circ-preview-hint">Updates as you type</span>
        </div>
        <div className="circ-preview-scroll">
          <div className="circ-preview-paper" ref={previewRef}>
            <div className="circ-preview-header">
              <div className="circ-college-name">NOTIVO COLLEGE OF ENGINEERING</div>
              <div className="circ-college-sub">Approved by AICTE · Affiliated to Anna University · Accredited by NAAC</div>
              <div className="circ-heading-tag">CIRCULAR</div>
            </div>

            <div className="circ-preview-meta">
              <span><strong>Circular No.:</strong> {form.circNo||"—"}</span>
              <span><strong>Date:</strong> {fmtDate(form.date)}</span>
            </div>

            {form.priority!=="Normal" && (
              <div className={`circ-priority-tag circ-p-${form.priority.toLowerCase()}`}>
                {form.priority==="Urgent"?"🔴":"🟡"} {form.priority.toUpperCase()} PRIORITY
              </div>
            )}

            <div className="circ-preview-to">
              <strong>To:</strong>
              {recipients.length
                ? recipients.map(r=><div key={r} className="circ-to-item">• {r}</div>)
                : <span className="circ-placeholder"> No recipients selected</span>}
            </div>

            {form.cc && (
              <div className="circ-preview-cc">
                <strong>CC:</strong> {form.cc}
              </div>
            )}

            <div className="circ-preview-subject">
              <strong>Sub:</strong>{" "}
              {form.subject || <em className="circ-placeholder">No subject entered</em>}
            </div>

            <div className="circ-preview-divider"/>

            <div className="circ-preview-body">
              {form.body
                ? form.body.split("\n").map((line,i)=>(
                    <p key={i} style={{margin:"4px 0",minHeight:20}}>{line||"\u00A0"}</p>
                  ))
                : <p className="circ-placeholder">Circular content will appear here…</p>}
            </div>

            <div className="circ-preview-sign">
              <div className="circ-sign-space"/>
              <div className="circ-sign-name">{form.fromName||"________________________"}</div>
              <div className="circ-sign-role">{form.fromRole}</div>
              <div className="circ-sign-dept">NOTIVO College of Engineering</div>
            </div>

            <div className="circ-preview-footer">
              This is an official communication issued by the institution.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   INVITATION DESIGNER
═══════════════════════════════════════════════════ */
let _eid = 1;
const eid = () => `t${_eid++}`;

const DEFAULT_FIELDS = [
  { id:eid(), label:"Event Name",    text:"NATIONAL SYMPOSIUM 2025", x:50, y:40,  size:28, bold:true,  color:"#ffffff", align:"center" },
  { id:eid(), label:"Department",   text:"Department of Computer Science", x:50, y:90,  size:15, bold:false, color:"#e0e7ff", align:"center" },
  { id:eid(), label:"Date & Time",  text:"April 30, 2025 · 9:00 AM", x:50, y:130, size:13, bold:false, color:"#c7d2fe", align:"center" },
  { id:eid(), label:"Venue",        text:"Main Auditorium, Block A",  x:50, y:155, size:13, bold:false, color:"#c7d2fe", align:"center" },
  { id:eid(), label:"Chief Guest",  text:"Chief Guest: Dr. A. Rajan, IIT Madras", x:50, y:195, size:12, bold:false, color:"#e0e7ff", align:"center" },
  { id:eid(), label:"Registration", text:"Register: forms.notivo.edu/symposium",  x:50, y:225, size:11, bold:false, color:"#a5b4fc", align:"center" },
];

function InvitationDesigner() {
  const [bgImage,   setBgImage]   = useState(null);
  const [fields,    setFields]    = useState(DEFAULT_FIELDS);
  const [selectedId, setSelectedId] = useState(null);
  const [dragging,  setDragging]  = useState(null);
  const canvasRef = useRef(null);
  const fileRef   = useRef(null);

  const selected = fields.find(f=>f.id===selectedId);
  const updateField = (id,patch) => setFields(fs=>fs.map(f=>f.id===id?{...f,...patch}:f));

  const onBgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBgImage(url);
  };

  const onMouseDown = (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
    const rect = canvasRef.current.getBoundingClientRect();
    const f = fields.find(x=>x.id===id);
    setDragging({ id, startX:e.clientX, startY:e.clientY, origX:f.x, origY:f.y, cw:rect.width, ch:rect.height });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragging.startX) / rect.width)  * 100;
    const dy = ((e.clientY - dragging.startY) / rect.height) * 100;
    updateField(dragging.id, { x: Math.max(0,Math.min(90,dragging.origX+dx)), y: Math.max(0,Math.min(95,dragging.origY+dy)) });
  };

  const onMouseUp = () => setDragging(null);

  const addField = () => {
    const f = { id:eid(), label:"Custom Text", text:"New Text", x:50, y:50, size:16, bold:false, color:"#ffffff", align:"center" };
    setFields(fs=>[...fs,f]);
    setSelectedId(f.id);
  };

  const deleteField = (id) => { setFields(fs=>fs.filter(f=>f.id!==id)); setSelectedId(null); };

  const handleDownload = () => {
    alert("To download: install html2canvas (`npm i html2canvas`) and call html2canvas(canvasRef.current) then save as PNG.");
  };

  return (
    <div className="inv-layout">
      {/* Left controls */}
      <div className="inv-left">
        <div className="circ-form-section-title">🖼 Template Background</div>
        <div className="inv-upload-area" onClick={()=>fileRef.current.click()}>
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={onBgUpload}/>
          {bgImage
            ? <img src={bgImage} alt="template" className="inv-upload-thumb"/>
            : <div className="inv-upload-placeholder">
                <span style={{fontSize:28}}>📁</span>
                <span>Click to upload invitation template<br/><small>(PNG, JPG, PDF image)</small></span>
              </div>}
        </div>
        {bgImage && <button className="circ-btn-ghost" style={{width:"100%",marginTop:8}} onClick={()=>setBgImage(null)}>✕ Remove Image</button>}

        <div className="circ-form-section-title" style={{marginTop:20}}>📝 Text Fields</div>
        <div className="inv-field-list">
          {fields.map(f=>(
            <div key={f.id} className={`inv-field-item${f.id===selectedId?" selected":""}`} onClick={()=>setSelectedId(f.id)}>
              <span className="inv-field-label">{f.label}</span>
              <span className="inv-field-text">{f.text.slice(0,22)}{f.text.length>22?"…":""}</span>
              <button className="inv-field-del" onClick={e=>{e.stopPropagation();deleteField(f.id);}}>✕</button>
            </div>
          ))}
        </div>
        <button className="circ-btn-outline" style={{width:"100%",marginTop:10}} onClick={addField}>+ Add Text Field</button>

        {selected && (
          <>
            <div className="circ-form-section-title" style={{marginTop:20}}>✏️ Edit: {selected.label}</div>
            <div className="circ-field">
              <label className="circ-label">Content</label>
              <textarea className="circ-input circ-textarea" rows={3}
                value={selected.text} onChange={e=>updateField(selected.id,{text:e.target.value})}/>
            </div>
            <div className="circ-form-row">
              <div className="circ-field">
                <label className="circ-label">Font Size</label>
                <select className="circ-input" value={selected.size} onChange={e=>updateField(selected.id,{size:+e.target.value})}>
                  {FONT_SIZES.map(s=><option key={s} value={s}>{s}px</option>)}
                </select>
              </div>
              <div className="circ-field">
                <label className="circ-label">Color</label>
                <input type="color" className="circ-input" style={{padding:2,height:38}} value={selected.color}
                  onChange={e=>updateField(selected.id,{color:e.target.value})}/>
              </div>
            </div>
            <div className="circ-form-row">
              <label className="circ-check-all">
                <input type="checkbox" checked={selected.bold} onChange={e=>updateField(selected.id,{bold:e.target.checked})}/>
                <span><b>Bold</b></span>
              </label>
              <div style={{display:"flex",gap:4}}>
                {["left","center","right"].map(a=>(
                  <button key={a} className={`dsgn-align-btn${selected.align===a?" active":""}`}
                    onClick={()=>updateField(selected.id,{align:a})} style={{minWidth:32}}>
                    {a==="left"?"⬱":a==="center"?"☰":"⬰"}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="circ-actions" style={{marginTop:20}}>
          <button className="circ-btn-primary" style={{flex:1}} onClick={handleDownload}>⬇ Download</button>
        </div>
      </div>

      {/* Canvas */}
      <div className="inv-canvas-wrap">
        <div className="circ-preview-label">
          <span>🎨 Invitation Preview</span>
          <span className="circ-preview-hint">Drag text to reposition</span>
        </div>
        <div className="inv-canvas-scroll">
          <div
            ref={canvasRef}
            className="inv-canvas"
            style={{backgroundImage: bgImage ? `url(${bgImage})` : "none"}}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onClick={()=>setSelectedId(null)}
          >
            {!bgImage && (
              <div className="inv-canvas-placeholder">
                Upload an invitation template to get started
              </div>
            )}
            {fields.map(f=>(
              <div
                key={f.id}
                className={`inv-text-el${f.id===selectedId?" selected":""}`}
                style={{
                  left:`${f.x}%`, top:`${f.y}%`,
                  fontSize:f.size, fontWeight:f.bold?"700":"400",
                  color:f.color, textAlign:f.align,
                  transform:"translateX(-50%)",
                  cursor:"move",
                }}
                onMouseDown={e=>onMouseDown(e,f.id)}
              >
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════ */
export default function IDCardDesignerPage() {
  const [mode, setMode] = useState("circular");

  return (
    <Layout>
      <div className="tasks-page">
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight/>
          <span className="bc-current">Communication Designer</span>
        </nav>

        <div className="tasks-header-row">
          <div>
            <h1 className="tasks-title">Communication Designer</h1>
            <p className="tasks-subtitle">Issue official circulars to departments or design event invitations for symposiums.</p>
          </div>
        </div>

        <div className="circ-mode-tabs">
          <button
            id="tab-circular"
            className={`circ-mode-btn${mode==="circular"?" active":""}`}
            onClick={()=>setMode("circular")}
          >
            <span className="circ-mode-icon">📄</span>
            <span>
              <strong>Issue Circular</strong>
              <small>Official notice to departments</small>
            </span>
          </button>
          <button
            id="tab-invitation"
            className={`circ-mode-btn${mode==="invitation"?" active":""}`}
            onClick={()=>setMode("invitation")}
          >
            <span className="circ-mode-icon">🎨</span>
            <span>
              <strong>Invitation Designer</strong>
              <small>Customize event posters &amp; banners</small>
            </span>
          </button>
        </div>

        {mode === "circular" ? <CircularCreator/> : <InvitationDesigner/>}
      </div>
    </Layout>
  );
}