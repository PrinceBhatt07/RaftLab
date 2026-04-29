import { useState } from "react";
import { adminLogin } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const user = await adminLogin({ email, password });
      setUser(user);
      toast.success("Welcome, Admin! 🎉");
      navigate("/admin");
    } catch {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
          padding: "40px 24px",
        }}
      >
        <div
          className="glass-card animate-fade-in-up"
          style={{ width: "100%", maxWidth: "420px", padding: "40px 36px" }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                margin: "0 auto 16px",
                boxShadow: "0 8px 24px rgba(255,107,53,0.35)",
              }}
            >
              🍔
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "var(--color-text)",
              }}
            >
              Admin Login
            </h1>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.88rem",
                marginTop: "6px",
              }}
            >
              Sign in to manage orders
            </p>
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "6px",
                  fontWeight: 500,
                }}
              >
                Email Address
              </label>
              <input
                id="auth-email"
                className="input-field"
                placeholder="admin@raftlabs.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "6px",
                  fontWeight: 500,
                }}
              >
                Password
              </label>
              <input
                id="auth-password"
                className="input-field"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <button
              id="auth-continue-btn"
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", marginTop: "8px", fontSize: "1rem" }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Please wait…" : "Login →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;