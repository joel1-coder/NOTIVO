import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

/* ── Icons ──────────────────────────────────── */
const ChevronRight = () => (
  <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const CloudUpIcon = () => (
  <svg width="52" height="52" fill="none" stroke="#2563EB" strokeWidth="1.5" viewBox="0 0 24 24">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

/* ── File type icons & colours ──────────────── */
const fileTypes = {
  pdf:   { label: "PDF",   bg: "#FEE2E2", color: "#B91C1C" },
  zip:   { label: "ZIP",   bg: "#F3F4F6", color: "#374151" },
  xlsx:  { label: "XLS",   bg: "#DCFCE7", color: "#166534" },
  docx:  { label: "DOC",   bg: "#DBEAFE", color: "#1E40AF" },
  pptx:  { label: "PPT",   bg: "#FEF3C7", color: "#92400E" },
  png:   { label: "IMG",   bg: "#EDE9FE", color: "#5B21B6" },
};

const getType = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  return fileTypes[ext] || { label: ext.toUpperCase(), bg: "#F3F4F6", color: "#374151" };
};

/* ── Sample uploads ─────────────────────────── */
const initialUploads = [
  { id: 1, name: "Q3_Financial_Report.pdf",         size: "2.4 MB",  date: "Oct 24, 2023 · 10:32 AM" },
  { id: 2, name: "Staff_Records_Oct23.zip",          size: "14.7 MB", date: "Oct 23, 2023 · 03:15 PM" },
  { id: 3, name: "Budget_Forecast_2024.xlsx",        size: "1.1 MB",  date: "Oct 22, 2023 · 09:50 AM" },
  { id: 4, name: "Onboarding_Manual_v3.docx",        size: "890 KB",  date: "Oct 21, 2023 · 02:00 PM" },
  { id: 5, name: "Marketing_Deck_Q4.pptx",           size: "5.6 MB",  date: "Oct 20, 2023 · 11:45 AM" },
];

/* ── Component ──────────────────────────────── */
export default function FileUploadPage() {
  const [uploads, setUploads]   = useState(initialUploads);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccess]  = useState("");
  const inputRef = useRef();

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      const newItems = Array.from(files).map((f, i) => ({
        id: Date.now() + i,
        name: f.name,
        size: f.size > 1024 * 1024
          ? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(f.size / 1024)} KB`,
        date: new Date().toLocaleString("en-US", {
          month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
        }),
      }));
      setUploads((prev) => [...newItems, ...prev]);
      setUploading(false);
      setSuccess(`${files.length} file${files.length > 1 ? "s" : ""} uploaded successfully!`);
      setTimeout(() => setSuccess(""), 3000);
    }, 1200);
  };

  const removeFile = (id) => setUploads((prev) => prev.filter((u) => u.id !== id));

  return (
    <Layout>
      <div className="file-upload-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/dashboard" className="bc-link">Dashboard</Link>
          <ChevronRight />
          <span className="bc-current">File Upload</span>
        </nav>

        {/* Header */}
        <div className="fu-header">
          <div>
            <h1 className="tasks-title">File Upload</h1>
            <p className="tasks-subtitle">Add new documents and manage uploaded files.</p>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          className={`drop-zone ${dragging ? "drop-zone-active" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="drop-zone-icon">
            <CloudUpIcon />
          </div>
          {uploading ? (
            <p className="drop-zone-text">Uploading<span className="dots">...</span></p>
          ) : (
            <>
              <p className="drop-zone-text">Drag &amp; drop files here</p>
              <p className="drop-zone-sub">or</p>
              <button
                className="browse-btn"
                onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}
              >
                Browse Files
              </button>
              <p className="drop-zone-hint">PDF, ZIP, Excel, Word, PowerPoint · Max 50 MB per file</p>
            </>
          )}
        </div>

        {/* Success toast */}
        {successMsg && (
          <div className="upload-success-toast">
            ✅ {successMsg}
          </div>
        )}

        {/* Recent Uploads */}
        <div className="recent-uploads-card">
          <div className="ru-header">
            <h3 className="ru-title">Recent Uploads</h3>
            <span className="ru-count">{uploads.length} files</span>
          </div>

          {uploads.length === 0 ? (
            <div className="ru-empty">No files uploaded yet.</div>
          ) : (
            <ul className="ru-list">
              {uploads.map((u) => {
                const ft = getType(u.name);
                return (
                  <li key={u.id} className="ru-item">
                    <div className="ru-type-badge" style={{ background: ft.bg, color: ft.color }}>
                      {ft.label}
                    </div>
                    <div className="ru-info">
                      <span className="ru-name">{u.name}</span>
                      <span className="ru-meta">{u.size} · {u.date}</span>
                    </div>
                    <div className="ru-actions">
                      <button className="ru-action-btn download" title="Download">
                        <DownloadIcon />
                      </button>
                      <button
                        className="ru-action-btn delete"
                        title="Delete"
                        onClick={() => removeFile(u.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
