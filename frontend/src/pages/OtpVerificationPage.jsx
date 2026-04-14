import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"/></svg>
);

export default function OtpVerificationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) navigate("/forgot-password");
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    paste.split("").forEach((char, i) => { if (i < 6) newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpStr = otp.join("");
    if (otpStr.length < 6) { setError("Please enter all 6 digits."); return; }
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.post("/auth/verify-otp", { email, otp: otpStr });
      setSuccess("OTP verified! Redirecting...");
      setTimeout(() => navigate("/reset-password", { state: { resetToken: data.resetToken } }), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setSuccess("New OTP sent!");
      setCountdown(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/forgot-password" className="back-link"><BackIcon /> Back</Link>

        <h1 className="auth-title">Verify OTP</h1>
        <p className="auth-subtitle">
          We've sent a 6-digit code to <strong>{email}</strong>. Enter it below.
        </p>

        {error && <div className="alert-error">{error}</div>}
        {success && <div className="success-msg">✓ {success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="otp-container" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`otp-input${digit ? " filled" : ""}`}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="spinner" /> : "Verify OTP"}
          </button>
        </form>

        <div className="resend-row" style={{ marginTop: 20 }}>
          {countdown > 0 ? (
            <span>Resend OTP in <strong>{countdown}s</strong></span>
          ) : (
            <span>
              Didn't receive it?{" "}
              <button className="resend-btn" onClick={handleResend} disabled={resendLoading}>
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}