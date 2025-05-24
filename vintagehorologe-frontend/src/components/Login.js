import React, { useState, useCallback, memo } from "react";
import { Form, Button, Container, Alert, Card, InputGroup, Spinner, Row, Col } from "react-bootstrap";
import { Envelope, Lock, Person } from "react-bootstrap-icons";
import { GiPocketWatch } from "react-icons/gi";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // VintageHorologe theme constants - MATCHING REGISTER.JS
  const goldColor = "#C5A47E"; // Original gold for borders/accents
  const navyColor = "#0A1A2F"; // Original navy for background
  const creamColor = "#F8F5EF"; // Brighter cream for main text and header title
  const textGoldColor = "#D4AF37"; // Richer gold for labels and important secondary text
  const darkNavyAccent = "#071220"; // A slightly darker navy for subtle depth
  const goldGradient = "linear-gradient(135deg, #C5A47E 0%, #A8865E 100%)";
  const watchPattern = "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(197,164,126,0.1) 5px, rgba(197,164,126,0.1) 10px)";

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login({ email, password });
      if (!success) {
        throw new Error("Authentication failed. Please verify your credentials.");
      }
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Authentication error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, navigate]);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 vintage-auth-container">
      <style>{`
        :root {
          --vintage-navy: ${navyColor};
          --horology-gold: ${goldColor};
          --patina-cream: ${creamColor};
          --text-gold: ${textGoldColor};
          --dark-navy-accent: ${darkNavyAccent};
        }

        @keyframes gearSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .vintage-auth-container {
          background: var(--vintage-navy) ${watchPattern};
        }

        .horology-card {
          background: rgba(10, 26, 47, 0.95) !important;
          border: 1px solid var(--horology-gold) !important;
          backdrop-filter: blur(10px);
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .watch-header {
          background: linear-gradient(45deg, var(--dark-navy-accent) 40%, rgba(10,26,47,0.8)),
                      ${watchPattern};
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          border-bottom: 3px solid var(--horology-gold);
          position: relative;
          z-index: 2;
          padding: 2.5rem 2rem 2.5rem;
        }

        .watch-header h3 {
            font-size: 2.2rem;
            color: var(--patina-cream);
            text-shadow: 2px 2px 5px rgba(0,0,0,0.4);
            letter-spacing: 1.5px;
            font-weight: bold;
        }

        .watch-header p {
            font-size: 1.1rem;
            color: var(--text-gold) !important;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
            margin-top: 0.5rem;
        }

        .vintage-input {
          background: transparent !important;
          border: 1px solid var(--horology-gold) !important;
          color: var(--patina-cream) !important;
          border-radius: 0 !important;
          transition: all 0.3s ease;
        }

        .vintage-input::placeholder {
            color: rgba(248, 245, 239, 0.6) !important;
        }

        .vintage-input:focus {
          box-shadow: 0 0 0 3px rgba(197,164,126,0.2) !important;
          border-color: var(--horology-gold) !important;
        }

        .input-group-text {
            background-color: var(--vintage-navy) !important;
            border: 1px solid var(--horology-gold) !important;
            border-right: none !important;
            border-radius: 0 !important;
            padding: 0.75rem 1rem;
        }
        /* Directly target the SVG icons within InputGroup.Text for reliable coloring */
        .input-group-text svg {
            color: var(--horology-gold) !important; /* Ensure icon color is gold */
        }

        .auth-button {
          background: var(--horology-gold);
          color: var(--vintage-navy);
          border: none;
          border-radius: 0;
          padding: 1rem 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(197,164,126,0.3);
          background: ${goldGradient};
        }

        .gear-animation {
          animation: gearSpin 20s linear infinite;
          opacity: 0.1;
          position: absolute;
          right: -30px;
          top: -30px;
        }

        /* Custom text colors for improved readability */
        .text-patina {
            color: var(--text-gold) !important;
        }

        .text-cream {
            color: var(--patina-cream) !important;
        }

        .vintage-alert.alert-warning {
            background-color: rgba(10, 26, 47, 0.9) !important;
            color: var(--patina-cream) !important;
            border-color: var(--horology-gold) !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
        }

        .vintage-alert .btn-close {
            filter: invert(1);
        }

        .hover-underline:hover {
            text-decoration: underline !important;
        }

      `}</style>

      <Row className="w-100">
        <Col xs={12} md={8} lg={6} xl={5} className="mx-auto">
          <Card className="horology-card shadow-lg border-0">
            <div className="watch-header text-center position-relative">
              <GiPocketWatch className="gear-animation" size="80" />
              <h3 className="mb-2">
                <Person className="me-2" />
                Horology Connoisseur Access
              </h3>
              <p className="text-gold mb-0">Authenticate Your Legacy</p>
            </div>

            <Card.Body className="p-4 p-md-5">
              {error && (
                <Alert variant="warning" className="vintage-alert">
                  <GiPocketWatch className="me-2" />
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="luxury-form">
                <Form.Group className="mb-4">
                  <Form.Label className="text-patina">Horology ID</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      {/* Removed text-gold class from here, now targeted by CSS */}
                      <Envelope size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="horology@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="vintage-input"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-patina">Secure Access Code</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      {/* Removed text-gold class from here, now targeted by CSS */}
                      <Lock size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="vintage-input"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Authenticating...
                    </>
                  ) : (
                    "Access Timeless Collection"
                  )}
                </Button>

                <div className="text-center mt-4 text-cream">
                  New to the legacy?{" "}
                  <a href="/register" className="text-gold hover-underline">
                    Join Horology Circle
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Login;