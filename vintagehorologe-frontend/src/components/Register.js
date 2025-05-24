import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Spinner,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaHistory } from "react-icons/fa";
import { GiPocketWatch } from "react-icons/gi";

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // VintageHorologe theme constants
  const goldColor = "#C5A47E"; // Original gold for borders/accents
  const navyColor = "#0A1A2F"; // Original navy for background
  const creamColor = "#F8F5EF"; // Brighter cream for main text and header title
  const textGoldColor = "#D4AF37"; // Richer gold for labels and important secondary text
  const darkNavyAccent = "#071220"; // A slightly darker navy for subtle depth
  const goldGradient = "linear-gradient(135deg, #C5A47E 0%, #A8865E 100%)";
  const watchPattern = "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(197,164,126,0.1) 5px, rgba(197,164,126,0.1) 10px)";

  useEffect(() => {
    setErrors({});
    setApiError("");
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Horological identity required";
    if (!validateEmail(formData.email))
      newErrors.email = "Invalid chronometer email";
    if (formData.password.length < 8)
      newErrors.password = "Requires 8+ characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Winding discrepancy detected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/", { state: { registrationSuccess: true } });
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Horological registration failed. Please consult your timekeeper."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          box-shadow: 0 10px 30px rgba(0,0,0,0.5); /* More pronounced shadow */
        }

        .watch-header {
          background: linear-gradient(45deg, var(--dark-navy-accent) 40%, rgba(10,26,47,0.8)),
                      ${watchPattern};
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          border-bottom: 3px solid var(--horology-gold); /* Thicker border */
          position: relative; /* Ensure z-index works for overlapping effect */
          z-index: 2; /* Bring header slightly forward */
        }

        .watch-header h1 {
            font-size: 2.5rem; /* Larger title */
            text-shadow: 2px 2px 5px rgba(0,0,0,0.4); /* Text shadow for depth */
            letter-spacing: 2px; /* Add some spacing */
        }

        .watch-header p {
            font-size: 1.1rem; /* Slightly larger subtitle */
            color: var(--text-gold) !important; /* Gold for the subtitle */
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
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

        .input-icon {
          color: var(--horology-gold);
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
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
          font-weight: bold; /* Ensure font-weight is applied */
        }

        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(197,164,126,0.3);
          background: ${goldGradient};
        }

        .gear-animation {
          position: absolute;
          right: -30px;
          top: -30px;
          animation: gearSpin 20s linear infinite;
          opacity: 0.1;
        }

        .vintage-feedback {
          color: var(--horology-gold);
          font-size: 0.85rem;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .text-patina {
            color: var(--text-gold) !important; /* Labels and general text */
        }

        .text-cream {
            color: var(--patina-cream) !important;
        }

        .vintage-alert.alert-warning {
            background-color: rgba(10, 26, 47, 0.9) !important; /* Slightly more opaque alert */
            color: var(--patina-cream) !important;
            border-color: var(--horology-gold) !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3); /* Subtle shadow for alert */
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
          <Card className="horology-card shadow-lg border-0 overflow-hidden">
            <div className="watch-header py-5 text-center position-relative">
              <GiPocketWatch className="gear-animation" size="80" />
              <h1 className="mb-4" style={{ color: creamColor }}>
                <FaHistory className="me-2" />
                Horological Registry
              </h1>
              <p className="text-cream mb-0">Chronicle Your Collection</p>
            </div>

            <Card.Body className="p-4 p-md-5">
              {apiError && (
                <Alert variant="warning" dismissible className="vintage-alert">
                  <FaCheckCircle className="me-2" />
                  {apiError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="luxury-form">
                <Form.Group className="mb-4 position-relative">
                  <Form.Label className="text-patina">Curator's Name</Form.Label>
                  <div className="position-relative">
                    <FaUser className="input-icon" />
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="vintage-input ps-5"
                      placeholder="Enter your full name"
                      isInvalid={!!errors.name}
                    />
                  </div>
                  {errors.name && (
                    <div className="vintage-feedback">
                      <FaCheckCircle /> {errors.name}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4 position-relative">
                  <Form.Label className="text-patina">Horologist's Email</Form.Label>
                  <div className="position-relative">
                    <FaEnvelope className="input-icon" />
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="vintage-input ps-5"
                      placeholder="patina@vintagehorologe.com"
                      isInvalid={!!errors.email}
                    />
                  </div>
                  {errors.email && (
                    <div className="vintage-feedback">
                      <FaCheckCircle /> {errors.email}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4 position-relative">
                  <Form.Label className="text-patina">Chronometer Code</Form.Label>
                  <div className="position-relative">
                    <FaLock className="input-icon" />
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="vintage-input ps-5"
                      placeholder="Minimum 8 characters"
                      isInvalid={!!errors.password}
                    />
                  </div>
                  {errors.password && (
                    <div className="vintage-feedback">
                      <FaCheckCircle /> {errors.password}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4 position-relative">
                  <Form.Label className="text-patina">Verify Mechanism</Form.Label>
                  <div className="position-relative">
                    <FaLock className="input-icon" />
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="vintage-input ps-5"
                      placeholder="Re-enter chronometer code"
                      isInvalid={!!errors.confirmPassword}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="vintage-feedback">
                      <FaCheckCircle /> {errors.confirmPassword}
                    </div>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 auth-button fw-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Engraving Credentials...
                    </>
                  ) : (
                    "Enroll in Horology Society"
                  )}
                </Button>

                <p className="text-center mt-4 mb-0 text-cream">
                  Existing member?{" "}
                  <a
                    href="/login"
                    className="text-gold fw-semibold hover-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    Access The Archive
                  </a>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;