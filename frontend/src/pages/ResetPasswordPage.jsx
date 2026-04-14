import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  );

const getStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const strengthConfig = [
  { label: "", color: "#e5e7eb", width: "0%" },
  { label: "Weak", color: "#ef4444", width: "25%" },
  { label: "Fair", color: "#f97316", width: "50%" },
  { label: "Good", color: "#eab308", width: "75%" },
  { label: "Strong", color: "#22c55e", width: "100%" },
];

export default function ResetPasswordPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const resetToken = state?.resetToken || "";

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!resetToken) navigate("/forgot-password");
  }, []);

  const strength = getStrength(form.password);
  const sc = strengthConfig[strength];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.password || !form.confirmPassword) { setError("Please fill in all fields."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/reset-password", { resetToken, ...form });
      setSuccess(data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">Create a new strong password for your account.</p>

        {error && <div className="alert-error">{error}</div>}
        {success && <div className="success-msg">✓ {success} Redirecting to login...</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <div className="input-wrapper">
              <span className="input-icon"><LockIcon /></span>
              <input
                name="password"
                type={showPass ? "text" : "password"}
                className="form-input"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
              />
              <button type="button" className="toggle-password" onClick={() => setShowPass(!showPass)}>
                <EyeIcon open={showPass} />
              </button>
            </div>
            {form.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div className="strength-fill" style={{ width: sc.width, background: sc.color }} />
                </div>
                <span className="strength-text" style={{ color: sc.color }}>{sc.label}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <div className="input-wrapper">
              <span className="input-icon"><LockIcon /></span>
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                className={`form-input${form.confirmPassword && form.password !== form.confirmPassword ? " error" : ""}`}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button type="button" className="toggle-password" onClick={() => setShowConfirm(!showConfirm)}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="error-msg">Passwords do not match</p>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={loading || !!success}>
            {loading ? <span className="spinner" /> : "Reset Password"}
          </button>

          <Link to="/login" style={{ display: "block", textAlign: "center", marginTop: 16 }} className="link">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}