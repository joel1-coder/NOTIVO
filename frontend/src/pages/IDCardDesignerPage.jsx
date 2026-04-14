import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ─── Canvas size ──────────────────────────── */
const CW = 700, CH = 450;

/* ─── Circular / Announcement Templates ─────── */
const TEMPLATES = [
  {
    id: "event-notice",
    name: "Event Notice",
    thumb: "#1E3A5F",
    setup: (canvas, fab) => {
      canvas.setBackgroundColor("#1E3A5F", canvas.renderAll.bind(canvas));
      // Top accent
      canvas.add(new fab.Rect({ left:0, top:0, width:CW, height:8, fill:"#2563EB", selectable:false, evented:false }));
      // Header block
      canvas.add(new fab.Rect({ left:0, top:8, width:CW, height:90, fill:"#162d4a", selectable:false, evented:false }));
      // Logo / institution name
      canvas.add(new fab.IText("GRANDVIEW INSTITUTE OF TECHNOLOGY", {
        left:CW/2, top:28, fontSize:13, fill:"#93C5FD", fontFamily:"Arial",
        fontWeight:"bold", charSpacing:30, originX:"center", editable:true,
      }));
      canvas.add(new fab.IText("Department of Computer Science & Engineering", {
        left:CW/2, top:52, fontSize:11, fill:"#6B7280", fontFamily:"Arial",
        originX:"center", editable:true,
      }));
      canvas.add(new fab.Line([40, 98, CW-40, 98], { stroke:"#2563EB", strokeWidth:1, selectable:false }));
      // Presents label
      canvas.add(new fab.IText("PRESENTS", {
        left:CW/2, top:118, fontSize:11, fill:"#93C5FD", fontFamily:"Arial",
        charSpacing:60, originX:"center", editable:true,
      }));
      // Main title
      canvas.add(new fab.IText("ANNUAL NATIONAL", {
        left:CW/2, top:140, fontSize:38, fontWeight:"bold", fill:"#FFFFFF",
        fontFamily:"Impact", originX:"center", editable:true,
      }));
      canvas.add(new fab.IText("SYMPOSIUM", {
        left:CW/2, top:188, fontSize:44, fontWeight:"bold", fill:"#F59E0B",
        fontFamily:"Impact", originX:"center", editable:true,
      }));
      canvas.add(new fab.IText("2 0 2 4", {
        left:CW/2, top:240, fontSize:16, fill:"#6B7280", fontFamily:"Arial",
        charSpacing:20, originX:"center", editable:true,
      }));
      // Bottom metadata
      canvas.add(new fab.Rect({ left:0, top:CH-70, width:CW, height:70, fill:"#0F1F33", selectable:false, evented:false }));
      canvas.add(new fab.IText("DATE: OCTOBER 24, 2024", {
        left:50, top:CH-50, fontSize:11, fill:"#9CA3AF", fontFamily:"Arial",
        charSpacing:10, editable:true,
      }));
      canvas.add(new fab.IText("VENUE: MAIN AUDITORIUM", {
        left:CW/2, top:CH-50, fontSize:11, fill:"#9CA3AF", fontFamily:"Arial",
        charSpacing:10, originX:"center", editable:true,
      }));
      canvas.add(new fab.IText("REGISTER AT: notivo.edu/register", {
        left:CW-50, top:CH-50, fontSize:11, fill:"#2563EB", fontFamily:"Arial",
        originX:"right", editable:true,
      }));
      canvas.renderAll();
    },
  },
  {
    id: "circular",
    name: "Official Circular",
    thumb: "#FFFFFF",
    setup: (canvas, fab) => {
      canvas.setBackgroundColor("#FFFFFF", canvas.renderAll.bind(canvas));
      // Header band
      canvas.add(new fab.Rect({ left:0, top:0, width:CW, height:70, fill:"#1E3A5F", selectable:false, evented:false }));
      canvas.add(new fab.Rect({ left:0, top:68, width:CW, height:5, fill:"#2563EB", selectable:false, evented:false }));
      canvas.add(new fab.IText("NOTIVO ADMIN PORTAL", {
        left:28, top:12, fontSize:16, fontWeight:"bold", fill:"white",
        fontFamily:"Arial", editable:true,
      }));
      canvas.add(new fab.IText("Official Circular", {
        left:28, top:38, fontSize:11, fill:"#93C5FD", fontFamily:"Arial",
        editable:true,
      }));
      // Circular No
      canvas.add(new fab.IText("Circular No: ADM/2024/001", {
        left:28, top:90, fontSize:12, fill:"#374151", fontFamily:"Arial", editable:true,
      }));
      canvas.add(new fab.IText("Date: " + new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"long", year:"numeric" }), {
        left:CW-28, top:90, fontSize:12, fill:"#374151", fontFamily:"Arial", originX:"right", editable:true,
      }));
      canvas.add(new fab.Line([28, 116, CW-28, 116], { stroke:"#E5E7EB", strokeWidth:1, selectable:false }));
      // Sub + To
      canvas.add(new fab.IText("Sub: Important Notice Regarding Upcoming Event", {
        left:28, top:130, fontSize:13, fontWeight:"bold", fill:"#111827", fontFamily:"Arial", editable:true,
      }));
      canvas.add(new fab.IText("To: All Students, Faculty & Staff Members", {
        left:28, top:156, fontSize:12, fill:"#374151", fontFamily:"Arial", editable:true,
      }));
      // Body text
      canvas.add(new fab.IText("This is to inform all the members that a mandatory meeting\nwill be held on the dates mentioned below. All concerned\npersons are requested to attend without fail.", {
        left:28, top:190, fontSize:12, fill:"#374151", fontFamily:"Arial",
        lineHeight:1.6, editable:true,
      }));
      // Signature block
      canvas.add(new fab.Line([28, CH-80, CW-28, CH-80], { stroke:"#E5E7EB", strokeWidth:1, selectable:false }));
      canvas.add(new fab.IText("By Order of the Administrator", {
        left:28, top:CH-65, fontSize:11, fill:"#9CA3AF", fontFamily:"Arial", editable:true,
      }));
      canvas.add(new fab.IText("NOTIVO Admin", {
        left:28, top:CH-45, fontSize:13, fontWeight:"bold", fill:"#1E3A5F", fontFamily:"Arial", editable:true,
      }));
      canvas.renderAll();
    },
  },
  {
    id: "invitation",
    name: "Event Invitation",
    thumb: "#0F172A",
    setup: (canvas, fab) => {
      canvas.setBackgroundColor("#0F172A", canvas.renderAll.bind(canvas));
      canvas.add(new fab.Rect({ left:0, top:0, width:CW, height:CH, fill:new fab.Gradient({
        type:"linear", gradientUnits:"percentage",
        coords:{ x1:0, y1:0, x2:1, y2:1 },
        colorStops:[{ offset:0, color:"#0F172A" }, { offset:1, color:"#1E1B4B" }],
      }), selectable:false, evented:false }));
      canvas.add(new fab.Rect({ left:0, top:0, width:6, height:CH, fill:"#7C3AED", selectable:false, evented:false }));
      canvas.add(new fab.Rect({ left:CW-6, top:0, width:6, height:CH, fill:"#7C3AED", selectable:false, evented:false }));
      canvas.add(new fab.IText("✦ YOU ARE CORDIALLY INVITED ✦", {
        left:CW/2, top:42, fontSize:11, fill:"#A78BFA", fontFamily:"Arial",
        charSpacing:15, originX:"center", editable:true,
      }));
      canvas.add(new fab.IText("Annual Tech Fest", {
        left:CW/2, top:72, fontSize:42, fontWeight:"bold", fill:"#FFFFFF",
        fontFamily:"Georgia", originX:"center", fontStyle:"italic", editable:true,
      }));
      canvas.add(new fab.IText("2 0 2 4", {
        left:CW/2, top:128, fontSize:18, fill:"#7C3AED", fontFamily:"Arial",
        charSpacing:30, originX:"center", editable:true,
      }));
      canvas.add(new fab.Line([CW/2 - 120, 162, CW/2 + 120, 162], { stroke:"#7C3AED", strokeWidth:1, selectable:false }));
      canvas.add(new fab.IText("Join us for a celebration of innovation, creativity,\nand excellence in Technology & Engineering.", {
        left:CW/2, top:178, fontSize:13, fill:"#C4B5FD", fontFamily:"Georgia",
        originX:"center", textAlign:"center", lineHeight:1.7, fontStyle:"italic", editable:true,
      }));
      canvas.add(new fab.Rect({ left:CW/2-100, top:260, width:200, height:40, fill:"#7C3AED", rx:20, ry:20 }));
      canvas.add(new fab.IText("Register Now →", {
        left:CW/2, top:272, fontSize:13, fontWeight:"bold", fill:"white",
        fontFamily:"Arial", originX:"center", editable:true,
      }));
      canvas.add(new fab.IText("📍 Main Auditorium  |  🗓 Nov 15, 2024  |  ⏰ 9:00 AM onwards", {
        left:CW/2, top:CH-40, fontSize:11, fill:"#6B7280", fontFamily:"Arial",
        originX:"center", editable:true,
      }));
      canvas.renderAll();
    },
  },
];

const FONTS = ["Arial","Georgia","Times New Roman","Impact","Courier New","Verdana","Trebuchet MS"];
const PALETTE = [
  "#FFFFFF","#F8FAFC","#94A3B8","#374151","#111827","#000000",
  "#2563EB","#1E3A5F","#7C3AED","#DB2777","#EF4444","#F59E0B",
  "#10B981","#06B6D4","#F97316","#84CC16","#A78BFA","#FDE68A",
];

/* ─── Component ─────────────────────────────── */
export default function IDCardDesignerPage() {
  const canvasEl  = useRef(null);
  const fabricRef = useRef(null);
  const imgFileRef = useRef(null);
  const bgFileRef  = useRef(null);

  const [loaded,     setLoaded]     = useState(false);
  const [activeTab,  setActiveTab]  = useState("templates");
  const [selected,   setSelected]   = useState(null);
  const [canvasBg,   setCanvasBg]   = useState("#1E3A5F");
  const [zoom,       setZoom]       = useState(1);
  const [toastMsg,   setToast]      = useState("");
  const [shareOpen,  setShareOpen]  = useState(false);
  const [shareImg,   setShareImg]   = useState("");

  // Text props
  const [tFont,   setTFont]   = useState("Arial");
  const [tSize,   setTSize]   = useState(16);
  const [tColor,  setTColor]  = useState("#FFFFFF");
  const [tBold,   setTBold]   = useState(false);
  const [tItalic, setTItalic] = useState(false);
  const [tULine,  setTULine]  = useState(false);
  const [tAlign,  setTAlign]  = useState("left");
  const [opacity, setOpacity] = useState(1);

  const toast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2800); };

  /* ── Init canvas ──────────────────────────── */
  useEffect(() => {
    const fab = window.fabric;
    if (!fab) { console.error("Fabric.js not loaded"); return; }

    const canvas = new fab.Canvas(canvasEl.current, {
      width: CW, height: CH,
      backgroundColor: "#1E3A5F",
      preserveObjectStacking: true,
    });
    fabricRef.current = canvas;

    TEMPLATES[0].setup(canvas, fab);

    canvas.on("selection:created", e => syncProps(e.selected[0]));
    canvas.on("selection:updated", e => syncProps(e.selected[0]));
    canvas.on("selection:cleared", ()  => setSelected(null));
    canvas.on("object:modified",   e => syncProps(e.target));

    setLoaded(true);
    return () => canvas.dispose();
  }, []);

  const getFab = () => window.fabric;

  /* ── Sync right-panel ─────────────────────── */
  const syncProps = (obj) => {
    if (!obj) return;
    setSelected(obj);
    setOpacity(obj.opacity ?? 1);
    if (obj.type === "i-text" || obj.type === "text") {
      setTFont(obj.fontFamily || "Arial");
      setTSize(obj.fontSize   || 16);
      setTColor(obj.fill      || "#000000");
      setTBold(obj.fontWeight === "bold");
      setTItalic(obj.fontStyle === "italic");
      setTULine(!!obj.underline);
      setTAlign(obj.textAlign || "left");
    }
  };

  /* ── Load template ────────────────────────── */
  const loadTemplate = useCallback((tpl) => {
    const canvas = fabricRef.current;
    const fab    = getFab();
    if (!canvas || !fab) return;
    canvas.clear();
    canvas.setBackgroundColor(tpl.thumb, () => {});
    setCanvasBg(tpl.thumb);
    tpl.setup(canvas, fab);
    setSelected(null);
    toast(`"${tpl.name}" template loaded!`);
  }, []);

  /* ── Add text ─────────────────────────────── */
  const addText = () => {
    const canvas = fabricRef.current;
    const fab    = getFab();
    const t = new fab.IText("Type your text here", {
      left: 100, top: 100, fontSize: 18, fill: "#FFFFFF",
      fontFamily: "Arial", editable: true,
    });
    canvas.add(t); canvas.setActiveObject(t); canvas.renderAll(); syncProps(t);
  };

  /* ── Add shape ────────────────────────────── */
  const addShape = (type) => {
    const canvas = fabricRef.current;
    const fab    = getFab();
    let obj;
    if (type === "rect")     obj = new fab.Rect({ left:100, top:100, width:160, height:80, fill:"#2563EB", rx:6, ry:6 });
    else if (type === "circle")   obj = new fab.Circle({ left:100, top:100, radius:50, fill:"#10B981" });
    else if (type === "triangle") obj = new fab.Triangle({ left:100, top:100, width:100, height:100, fill:"#F59E0B" });
    else if (type === "line")     obj = new fab.Line([0,0,200,0], { left:100, top:150, stroke:"#FFFFFF", strokeWidth:2 });
    canvas.add(obj); canvas.setActiveObject(obj); canvas.renderAll(); syncProps(obj);
  };

  /* ── Upload image (poster/logo) ───────────── */
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fab = getFab(); const canvas = fabricRef.current;
    const reader = new FileReader();
    reader.onload = ev => {
      fab.Image.fromURL(ev.target.result, img => {
        const scale = Math.min(260/img.width, 200/img.height, 1);
        img.set({ left: 40, top: 80, scaleX: scale, scaleY: scale });
        canvas.add(img); canvas.setActiveObject(img); canvas.renderAll(); syncProps(img);
        toast("Image placed! Drag to reposition and resize.");
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /* ── Set background image ─────────────────── */
  const handleBgUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fab = getFab(); const canvas = fabricRef.current;
    const reader = new FileReader();
    reader.onload = ev => {
      fab.Image.fromURL(ev.target.result, img => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: CW / img.width, scaleY: CH / img.height,
        });
        toast("Background image set!");
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /* ── Load saved JSON ──────────────────────── */
  const handleJsonUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const canvas = fabricRef.current;
    const reader = new FileReader();
    reader.onload = ev => {
      canvas.loadFromJSON(ev.target.result, () => { canvas.renderAll(); toast("Design loaded!"); });
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  /* ── Apply text prop ──────────────────────── */
  const applyText = (prop, value) => {
    const obj = fabricRef.current?.getActiveObject();
    if (!obj || (obj.type !== "i-text" && obj.type !== "text")) return;
    obj.set(prop, value); fabricRef.current.renderAll(); syncProps(obj);
  };

  /* ── Apply general prop ───────────────────── */
  const applyObj = (prop, value) => {
    const obj = fabricRef.current?.getActiveObject();
    if (!obj) return;
    obj.set(prop, value); fabricRef.current.renderAll();
  };

  const bringFront  = () => { const cv = fabricRef.current; cv?.getActiveObject()?.bringToFront(); cv?.renderAll(); };
  const sendBack    = () => { const cv = fabricRef.current; cv?.getActiveObject()?.sendToBack();   cv?.renderAll(); };
  const delSelected = () => {
    const cv = fabricRef.current; if (!cv) return;
    cv.getActiveObjects().forEach(o => cv.remove(o));
    cv.discardActiveObject(); cv.renderAll(); setSelected(null);
  };
  const clearCanvas = () => {
    const cv = fabricRef.current; if (!cv) return;
    cv.clear(); cv.setBackgroundColor(canvasBg, cv.renderAll.bind(cv)); setSelected(null);
    toast("Canvas cleared.");
  };
  const changeBg = (color) => {
    setCanvasBg(color);
    const cv = fabricRef.current;
    cv?.setBackgroundColor(color, cv.renderAll.bind(cv));
  };
  const applyZoom = (z) => {
    setZoom(z); fabricRef.current?.setZoom(z);
  };

  /* ── Download PNG ─────────────────────────── */
  const downloadPNG = () => {
    const cv = fabricRef.current; cv.discardActiveObject(); cv.renderAll();
    const url = cv.toDataURL({ format:"png", quality:1, multiplier:2 });
    const a = document.createElement("a"); a.href = url; a.download = "circular.png"; a.click();
    toast("Downloaded as PNG!");
  };

  /* ── Save JSON ────────────────────────────── */
  const saveJSON = () => {
    const json = JSON.stringify(fabricRef.current.toJSON(), null, 2);
    const blob = new Blob([json], { type:"application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = "circular.json"; a.click();
    URL.revokeObjectURL(url); toast("Design saved as JSON!");
  };

  /* ── Share / Send ─────────────────────────── */
  const handleShare = () => {
    const cv = fabricRef.current; cv.discardActiveObject(); cv.renderAll();
    setShareImg(cv.toDataURL({ format:"png", quality:1 }));
    setShareOpen(true);
  };

  const isText   = selected && (selected.type === "i-text" || selected.type === "text");
  const hasObj   = !!selected;

  return (
    <Layout>
      <div className="designer-page">

        {/* ── Top Bar ─────────────────────────── */}
        <div className="designer-topbar">
          <div className="designer-topbar-left">
            <Link to="/dashboard" className="designer-back-btn">← back</Link>
            <div className="designer-title-area">
              <span className="designer-title-text">Circular Designer</span>
              <span className="designer-subtitle-text">Create announcements, invitations & notices · Upload · Edit · Send</span>
            </div>
          </div>

          <div className="designer-zoom-group">
            {[0.5, 0.75, 1, 1.25].map(z => (
              <button key={z} className={`zoom-btn ${zoom===z?"zoom-btn-active":""}`}
                onClick={() => applyZoom(z)}>{Math.round(z*100)}%</button>
            ))}
          </div>

          <div className="designer-topbar-actions">
            <button className="dt-action-btn" onClick={clearCanvas}>🗑 Clear</button>
            <button className="dt-action-btn" onClick={saveJSON}>💾 Save</button>
            <button className="dt-action-btn download-btn" onClick={downloadPNG}>⬇ Download PNG</button>
            <button className="dt-action-btn share-btn" onClick={handleShare}>📤 Send / Share</button>
          </div>
        </div>

        {toastMsg && <div className="designer-toast">{toastMsg}</div>}

        <div className="designer-workspace">

          {/* ── Left panel ──────────────────────── */}
          <div className="designer-left-panel">
            <div className="left-tab-icons">
              {[
                { id:"templates", icon:"📋", label:"Templates" },
                { id:"text",      icon:"T",  label:"Text"      },
                { id:"elements",  icon:"⬛", label:"Shapes"    },
                { id:"uploads",   icon:"🖼", label:"Upload"    },
                { id:"bg",        icon:"🎨", label:"Bg Colour" },
              ].map(t => (
                <button key={t.id}
                  className={`left-tab-icon ${activeTab===t.id?"left-tab-active":""}`}
                  onClick={() => setActiveTab(t.id)} title={t.label}>
                  <span className="left-tab-icon-glyph">{t.icon}</span>
                  <span className="left-tab-label">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="left-tab-content">
              {/* Templates */}
              {activeTab === "templates" && (
                <div className="lp-section">
                  <div className="lp-section-title">Circular Templates</div>
                  <div className="tpl-grid">
                    {TEMPLATES.map(t => (
                      <button key={t.id} className="tpl-thumb" style={{ background:t.thumb }}
                        onClick={() => loadTemplate(t)}>
                        <span className="tpl-thumb-label">{t.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="lp-section-title" style={{ marginTop:16 }}>Load Saved Design</div>
                  <label className="lp-upload-label">
                    <input type="file" accept=".json" hidden onChange={handleJsonUpload}/>
                    📂 Load JSON file
                  </label>
                </div>
              )}

              {/* Text */}
              {activeTab === "text" && (
                <div className="lp-section">
                  <div className="lp-section-title">Add Text</div>
                  <button className="lp-add-btn" onClick={addText}>+ Add Text Box</button>
                  <div className="lp-section-title" style={{ marginTop:14 }}>Preset Styles</div>
                  {[
                    { label:"Title",    fontSize:32, fontWeight:"bold"   },
                    { label:"Heading",  fontSize:22, fontWeight:"bold"   },
                    { label:"Body",     fontSize:14, fontWeight:"normal" },
                    { label:"Caption",  fontSize:10, fontWeight:"normal" },
                  ].map(s => (
                    <button key={s.label} className="lp-text-style-btn"
                      style={{ fontSize:Math.max(11, s.fontSize*0.5), fontWeight:s.fontWeight }}
                      onClick={() => {
                        const fab = getFab(); const cv = fabricRef.current;
                        const t = new fab.IText(s.label, { left:80, top:80, fontSize:s.fontSize, fontWeight:s.fontWeight, fill:"#FFFFFF", fontFamily:"Arial", editable:true });
                        cv.add(t); cv.setActiveObject(t); cv.renderAll(); syncProps(t);
                      }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Shapes */}
              {activeTab === "elements" && (
                <div className="lp-section">
                  <div className="lp-section-title">Add Shape</div>
                  <div className="shape-grid">
                    {[["rect","Rectangle","▬"],["circle","Circle","●"],
                      ["triangle","Triangle","▲"],["line","Line","━"]].map(([type,label,icon]) => (
                      <button key={type} className="shape-btn" onClick={() => addShape(type)}>
                        <span className="shape-icon">{icon}</span>
                        <span className="shape-label">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload */}
              {activeTab === "uploads" && (
                <div className="lp-section">
                  <div className="lp-section-title">Upload Poster / Logo</div>
                  <p className="lp-hint">Upload an image (JPG / PNG / WEBP) to place on the canvas. You can drag, resize and rotate it.</p>
                  <label className="lp-upload-label lp-upload-photo">
                    <input ref={imgFileRef} type="file" accept="image/*" hidden onChange={handleImageUpload}/>
                    🖼 Choose Image
                  </label>

                  <div className="lp-section-title" style={{ marginTop:18 }}>Background Image</div>
                  <p className="lp-hint">Set a full-canvas background photo or design.</p>
                  <label className="lp-upload-label">
                    <input ref={bgFileRef} type="file" accept="image/*" hidden onChange={handleBgUpload}/>
                    🎑 Set as Background
                  </label>
                </div>
              )}

              {/* Background colour */}
              {activeTab === "bg" && (
                <div className="lp-section">
                  <div className="lp-section-title">Canvas Background</div>
                  <div className="palette-grid">
                    {PALETTE.map(c => (
                      <button key={c} className="palette-swatch"
                        style={{ background:c, border:canvasBg===c?"2.5px solid #60A5FA":"2px solid transparent" }}
                        onClick={() => changeBg(c)}/>
                    ))}
                  </div>
                  <label className="rp-label" style={{ display:"flex", alignItems:"center", gap:8, marginTop:12 }}>
                    Custom:
                    <input type="color" value={canvasBg} onChange={e => changeBg(e.target.value)}
                      style={{ width:36, height:28, border:"none", cursor:"pointer", borderRadius:6 }}/>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* ── Canvas ──────────────────────────── */}
          <div className="designer-canvas-wrap">
            {!loaded && (
              <div className="canvas-loading">
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>🎨</div>
                  <div>Loading Circular Designer…</div>
                  <div style={{ fontSize:11, color:"#4B5563", marginTop:4 }}>Initialising canvas editor</div>
                </div>
              </div>
            )}
            <canvas ref={canvasEl} style={{ display: loaded ? "block" : "none" }} />
          </div>

          {/* ── Right Properties Panel ──────────── */}
          <div className="designer-right-panel">
            {!hasObj && (
              <div className="rp-empty">
                <div className="rp-empty-icon">☝️</div>
                <p>Click any element<br/>on the canvas to<br/>edit its properties</p>
              </div>
            )}

            {hasObj && (
              <>
                {isText && (
                  <div className="rp-section">
                    <div className="rp-label">Font</div>
                    <select className="rp-select" value={tFont}
                      onChange={e=>{ setTFont(e.target.value); applyText("fontFamily",e.target.value); }}>
                      {FONTS.map(f=><option key={f}>{f}</option>)}
                    </select>

                    <div className="rp-label" style={{ marginTop:10 }}>Size</div>
                    <div className="rp-row">
                      <button className="rp-stepper" onClick={()=>{ const v=Math.max(8,tSize-1); setTSize(v); applyText("fontSize",v); }}>−</button>
                      <input type="number" className="rp-size-input" value={tSize}
                        onChange={e=>{ const v=+e.target.value; setTSize(v); applyText("fontSize",v); }}/>
                      <button className="rp-stepper" onClick={()=>{ const v=tSize+1; setTSize(v); applyText("fontSize",v); }}>+</button>
                    </div>

                    <div className="rp-label" style={{ marginTop:10 }}>Colour</div>
                    <div className="rp-row">
                      <input type="color" value={tColor}
                        onChange={e=>{ setTColor(e.target.value); applyText("fill",e.target.value); }}
                        style={{ width:40, height:32, border:"1px solid #374151", borderRadius:6, cursor:"pointer" }}/>
                      <span className="rp-color-hex">{tColor}</span>
                    </div>

                    <div className="rp-label" style={{ marginTop:10 }}>Style</div>
                    <div className="rp-row" style={{ gap:4 }}>
                      {[
                        { l:"B", prop:"fontWeight", on:"bold",   off:"normal", state:tBold,   set:setTBold,   s:{ fontWeight:"bold" } },
                        { l:"I", prop:"fontStyle",  on:"italic", off:"normal", state:tItalic, set:setTItalic, s:{ fontStyle:"italic" } },
                        { l:"U", prop:"underline",  on:true,     off:false,    state:tULine,  set:setTULine,  s:{ textDecoration:"underline" } },
                      ].map(b=>(
                        <button key={b.l} className={`style-toggle ${b.state?"style-toggle-on":""}`} style={b.s}
                          onClick={()=>{ const nv=b.state?b.off:b.on; b.set(!b.state); applyText(b.prop,nv); }}>
                          {b.l}
                        </button>
                      ))}
                    </div>

                    <div className="rp-label" style={{ marginTop:10 }}>Align</div>
                    <div className="rp-row" style={{ gap:4 }}>
                      {["left","center","right"].map(a=>(
                        <button key={a} className={`style-toggle ${tAlign===a?"style-toggle-on":""}`}
                          onClick={()=>{ setTAlign(a); applyText("textAlign",a); }}>
                          {a==="left"?"⇤":a==="center"?"≡":"⇥"}
                        </button>
                      ))}
                    </div>

                    <div className="rp-label" style={{ marginTop:10 }}>Quick Colours</div>
                    <div className="palette-grid mini-palette">
                      {PALETTE.slice(0,12).map(c=>(
                        <button key={c} className="palette-swatch small-swatch"
                          style={{ background:c, border:tColor===c?"2px solid #60A5FA":"1.5px solid #374151" }}
                          onClick={()=>{ setTColor(c); applyText("fill",c); }}/>
                      ))}
                    </div>
                  </div>
                )}

                {!isText && (
                  <div className="rp-section">
                    <div className="rp-label">Fill Colour</div>
                    <div className="palette-grid">
                      {PALETTE.map(c=>(
                        <button key={c} className="palette-swatch"
                          style={{ background:c }} onClick={()=>applyObj("fill",c)}/>
                      ))}
                    </div>
                    <label className="rp-label" style={{ display:"flex",alignItems:"center",gap:8,marginTop:8 }}>
                      Custom:
                      <input type="color" onChange={e=>applyObj("fill",e.target.value)}
                        style={{ width:36,height:28,border:"none",cursor:"pointer",borderRadius:6 }}/>
                    </label>
                  </div>
                )}

                <div className="rp-section">
                  <div className="rp-label">Opacity — {Math.round(opacity*100)}%</div>
                  <input type="range" min="0.05" max="1" step="0.05" value={opacity}
                    className="rp-range"
                    onChange={e=>{ const v=+e.target.value; setOpacity(v); applyObj("opacity",v); }}/>
                </div>

                <div className="rp-section">
                  <div className="rp-label">Layer</div>
                  <div className="rp-row" style={{ gap:6 }}>
                    <button className="rp-layer-btn" onClick={bringFront}>↑ Front</button>
                    <button className="rp-layer-btn" onClick={sendBack}>↓ Back</button>
                  </div>
                  <button className="rp-delete-btn" onClick={delSelected}>🗑 Delete Selected</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Status bar ──────────────────────── */}
        <div className="designer-statusbar">
          <span>Canvas: {CW} × {CH}px</span>
          <span>Zoom: {Math.round(zoom*100)}%</span>
          {selected && <span>Selected: <strong>{selected.type}</strong></span>}
          <div className="designer-bottom-actions">
            <button className="statusbar-btn" onClick={bringFront} disabled={!hasObj}>↑ Front</button>
            <button className="statusbar-btn" onClick={sendBack}   disabled={!hasObj}>↓ Back</button>
            <button className="statusbar-btn danger" onClick={delSelected} disabled={!hasObj}>🗑 Delete</button>
          </div>
        </div>

        {/* ── Share / Send Modal ───────────────── */}
        {shareOpen && (
          <div className="modal-overlay" onClick={()=>setShareOpen(false)}>
            <div className="share-modal" onClick={e=>e.stopPropagation()}>
              <div className="share-modal-header">
                <div>
                  <h3>Send Circular to Users</h3>
                  <p style={{ fontSize:12, color:"#9CA3AF", marginTop:3 }}>Download and attach, or copy the link to share</p>
                </div>
                <button className="modal-close" onClick={()=>setShareOpen(false)}>✕</button>
              </div>
              <div className="share-modal-body">
                <img src={shareImg} alt="Circular Preview" className="share-preview-img"/>
                <div className="share-actions">
                  <a href={shareImg} download="circular.png" className="share-dl-btn">⬇ Download PNG</a>
                  <button className="share-copy-btn"
                    onClick={()=>{ navigator.clipboard.writeText(window.location.origin+"/documents"); toast("Document portal link copied!"); }}>
                    🔗 Copy Document Portal Link
                  </button>
                </div>
                <p className="share-hint">💡 Download the circular and attach it when submitting via the Document portal, or share the download link directly with staff.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
