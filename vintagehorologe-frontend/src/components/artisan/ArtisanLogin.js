import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FiLock, FiMail, FiLoader } from "react-icons/fi";
import { GiPocketWatch } from "react-icons/gi";

const ArtisanLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // VintageHorologe theme constants
  const goldColor = "#C5A47E";
  const navyColor = "#0A1A2F";
  const creamColor = "#F4F1EA";
  const watchPattern = "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(197,164,126,0.1) 5px, rgba(197,164,126,0.1) 10px)";

  useEffect(() => {
    const token = localStorage.getItem("artisanToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (Date.now() < decoded.exp * 1000 && decoded.role === "ROLE_ARTISAN") {
          navigate("/artisan/dashboard", { replace: true });
        }
      } catch (err) {
        localStorage.removeItem("artisanToken");
        localStorage.removeItem("artisanId");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/artisan/auth/login",
        credentials
      );

      if (response.data.token) {
        const decoded = jwtDecode(response.data.token);
        localStorage.setItem("artisanToken", response.data.token);
        localStorage.setItem("artisanId", decoded.artisanId);
        navigate("/artisan/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Horological authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center vintage-auth-bg">
      <div className="card horology-auth-card shadow-luxe">
        <div className="card-header horology-header text-center position-relative">
          <div className="watch-pattern-overlay" />
          <GiPocketWatch className="header-icon mb-3" />
          <h1 className="serif-font mb-2">Horology Artisan Gateway</h1>
          <p className="text-patina">Master Watchmaker Workshop Access</p>
        </div>

        <div className="card-body p-4 p-xl-5">
          {error && (
            <div className="vintage-alert mb-4">
              <div className="d-flex align-items-center gap-2">
                <FiLoader className="text-gold spinner" />
                <div className="small text-patina">{error}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <div className="form-group vintage-input-group">
                <label className="text-patina">
                  <FiMail className="me-2 text-gold" /> Horology ID
                </label>
                <input
                  type="email"
                  className="vintage-input"
                  placeholder="horologist@vintagehorologe.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="form-group vintage-input-group">
                <label className="text-patina">
                  <FiLock className="me-2 text-gold" /> Secure Access Code
                </label>
                <input
                  type="password"
                  className="vintage-input"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-gold w-100 py-3 fw-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FiLoader className="spinner me-2" />
                  Authenticating...
                </>
              ) : (
                "Enter Horology Workshop"
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top border-gold">
            <p className="small text-patina mb-2">
              New to the legacy?{" "}
              <Link
                to="/artisan-register"
                className="text-gold hover-underline"
              >
                Join Guild
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="small text-gold hover-underline"
            >
              Recover Authentication
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --vintage-navy: ${navyColor};
          --horology-gold: ${goldColor};
          --patina-cream: ${creamColor};
        }

        .vintage-auth-bg {
          background: var(--vintage-navy) ${watchPattern};
        }

        .horology-auth-card {
          background: rgba(10, 26, 47, 0.95);
          border: 1px solid var(--horology-gold);
          border-radius: 0;
          max-width: 440px;
          backdrop-filter: blur(10px);
        }

        .horology-header {
          background: linear-gradient(45deg, var(--vintage-navy) 40%, rgba(10,26,47,0.8)) !important;
          border-bottom: 2px solid var(--horology-gold);
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          padding: 2rem 1.5rem;
        }

        .watch-pattern-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            rgba(197,164,126,0.05),
            rgba(197,164,126,0.05) 10px,
            transparent 10px,
            transparent 20px
          );
        }

        .header-icon {
          color: var(--horology-gold);
          font-size: 2.5rem;
        }

        .serif-font {
          font-family: 'Playfair Display', serif;
          color: var(--patina-cream);
        }

        .text-patina {
          color: var(--patina-cream);
        }

        .text-gold {
          color: var(--horology-gold);
        }

        .vintage-input-group {
          position: relative;
        }

        .vintage-input {
          background: transparent !important;
          border: 1px solid var(--horology-gold) !important;
          color: var(--patina-cream) !important;
          border-radius: 0;
          padding: 1rem;
          width: 100%;
          transition: all 0.3s ease;
        }

        .vintage-input:focus {
          box-shadow: 0 0 0 3px rgba(197, 164, 126, 0.2);
          border-color: var(--horology-gold);
        }

        .btn-gold {
          background: linear-gradient(135deg, #C5A47E 0%, #A8865E 100%);
          color: var(--vintage-navy);
          border: none;
          transition: all 0.3s ease;
        }

        .btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(197,164,126,0.3);
        }

        .vintage-alert {
          background: rgba(10, 26, 47, 0.9);
          border: 1px solid var(--horology-gold);
          padding: 1rem;
          border-radius: 0;
        }

        .hover-underline {
          position: relative;
          text-decoration: none;
        }

        .hover-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background: var(--horology-gold);
          transition: width 0.3s ease;
        }

        .hover-underline:hover::after {
          width: 100%;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ArtisanLogin;