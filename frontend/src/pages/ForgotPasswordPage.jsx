import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"/></svg>
);

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.post("/auth/forgot-password", { email });
      setSuccess(data.message);
      setTimeout(() => navigate("/verify-otp", { state: { email } }), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/login" className="back-link"><BackIcon /> Back to Login</Link>

        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-subtitle">Enter your registered email address and we'll send you a 6-digit OTP to reset your password.</p>

        {error && <div className="alert-error">{error}</div>}
        {success && <div className="success-msg">✓ {success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon"><MailIcon /></span>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}