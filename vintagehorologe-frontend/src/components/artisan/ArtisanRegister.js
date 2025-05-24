import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiUploadCloud,
  FiUser,
  FiMail,
  FiBriefcase,
  FiAward,
  FiPhone,
  FiMapPin,
  FiTool,
  FiLock,
} from "react-icons/fi";

const ArtisanRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    experience: "",
    certificate: null,
    mobile: "",
    location: "",
    materialsUsed: "",
    password: "",
    confirmPassword: "",
  });

  const categories = [
    "Mechanical Watches",
    "Vintage Chronographs",
    "Luxury Dress Watches",
    "Pocket Watches",
    "Diving Watches",
    "Aviator Watches",
    "Limited Editions",
    "Skeleton Watches",
    "Art Deco Pieces",
    "Swiss Heritage"
  ];

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modern Horology theme constants
  const primaryColor = "#1A202C"; // Dark Charcoal
  const accentColor = "#D69E2E"; // Muted Gold
  const textColor = "#E2E8F0"; // Light Gray
  const borderColor = "#4A5568"; // Dark Gray
  const successColor = "#38A169"; // Green
  const errorColor = "#E53E3E"; // Red
  const bgColor = "#0F172A"; // Deep Navy Blue
  const subtlePattern =
    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)";

  useEffect(() => {
    if (alert.show && alert.type === "success") {
      const timer = setTimeout(() => navigate("/artisan-login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = "Artisan name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.category) newErrors.category = "Craft specialization required";
    if (!formData.experience) newErrors.experience = "Years of experience required";
    if (!mobileRegex.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number (10 digits)";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.certificate)
      newErrors.certificate = "Certification document is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.materialsUsed.trim())
      newErrors.materialsUsed = "Materials & techniques are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formDataToSend.append(key, value);
      });

      await axios.post(
        "http://localhost:8080/api/artisan/auth/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAlert({
        show: true,
        message: "Registration successful! Redirecting to login...",
        type: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ background: bgColor, backgroundImage: subtlePattern, backgroundSize: '100px 100px' }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-12 col-lg-10 col-xl-8"> {/* Adjusted column size for larger card */}
          <div
            className="card shadow-lg"
            style={{
              maxWidth: "1200px", // Increased max-width
              margin: "0 auto",
              backgroundColor: primaryColor,
              border: `1px solid ${borderColor}`,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {alert.show && (
              <div
                className={`alert d-flex align-items-center gap-3 p-3 mb-0`}
                style={{
                  backgroundColor: alert.type === "success" ? successColor : errorColor,
                  color: "#fff",
                  borderRadius: "0",
                }}
              >
                {alert.type === "success" ? (
                  <FiCheckCircle className="fs-4" />
                ) : (
                  <FiAlertCircle className="fs-4" />
                )}
                <div>
                  <h5 className="mb-1 text-uppercase fw-bold">
                    {alert.type === "success" ? "Success!" : "Error!"}
                  </h5>
                  <p className="mb-0 small">{alert.message}</p>
                </div>
              </div>
            )}

            <div
              className="card-header text-center py-4"
              style={{
                backgroundColor: primaryColor,
                borderBottom: `1px solid ${borderColor}`,
                color: textColor,
              }}
            >
              <h2 className="mb-3" style={{ color: accentColor }}>
                <span className="d-block h2 mb-2 font-display">
                  Horologist Registration
                </span>
                <span className="h6 fw-light" style={{ color: textColor }}>
                  Join our community of skilled watchmakers and horology artisans
                </span>
              </h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Left Column for Name, Email, Category, Experience, Mobile, Location */}
                  <div className="col-12 col-lg-6">
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiUser className="me-2" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className={`form-control ${errors.name && "is-invalid"}`}
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.name && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiMail className="me-2" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email && "is-invalid"}`}
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.email && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiBriefcase className="me-2" />
                            Craft Specialization
                          </label>
                          <select
                            name="category"
                            className={`form-select ${errors.category && "is-invalid"}`}
                            value={formData.category}
                            onChange={handleChange}
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              appearance: 'none',
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%23E2E8F0' d='M2.2 0L0 2.2l4 4 4-4L5.8 0 4 1.8 2.2 0z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right .75rem center',
                              backgroundSize: '.65em auto',
                            }}
                          >
                            <option value="" style={{ backgroundColor: primaryColor, color: textColor }}>Select your craft</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat} style={{ backgroundColor: primaryColor, color: textColor }}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.category}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiAward className="me-2" />
                            Years of Experience
                          </label>
                          <input
                            type="number"
                            name="experience"
                            className={`form-control ${errors.experience && "is-invalid"}`}
                            value={formData.experience}
                            onChange={handleChange}
                            min="0"
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.experience && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.experience}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiPhone className="me-2" />
                            Mobile Number
                          </label>
                          <input
                            type="tel"
                            name="mobile"
                            className={`form-control ${errors.mobile && "is-invalid"}`}
                            value={formData.mobile}
                            onChange={handleChange}
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.mobile && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.mobile}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiMapPin className="me-2" />
                            Location / Atelier
                          </label>
                          <input
                            type="text"
                            name="location"
                            className={`form-control ${errors.location && "is-invalid"}`}
                            value={formData.location}
                            onChange={handleChange}
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.location && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column for Passwords, Materials, and Certificate Upload */}
                  <div className="col-12 col-lg-6">
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiLock className="me-2" />
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password && "is-invalid"}`}
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.password && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.password}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiLock className="me-2" />
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword && "is-invalid"}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.confirmPassword && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.confirmPassword}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label className="form-label" style={{ color: textColor }}>
                            <FiTool className="me-2" />
                            Materials & Techniques
                          </label>
                          <textarea
                            name="materialsUsed"
                            className={`form-control ${errors.materialsUsed && "is-invalid"}`}
                            value={formData.materialsUsed}
                            onChange={handleChange}
                            rows="5"
                            style={{
                              backgroundColor: primaryColor,
                              border: `1px solid ${borderColor}`,
                              color: textColor,
                              borderRadius: "4px",
                            }}
                          />
                          {errors.materialsUsed && (
                            <div className="invalid-feedback d-flex align-items-center gap-2">
                              <FiAlertCircle /> {errors.materialsUsed}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div
                          className={`file-upload-card p-4 text-center cursor-pointer`}
                          style={{
                            border: `2px dashed ${borderColor}`,
                            backgroundColor: primaryColor,
                            borderRadius: "8px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <label className="d-block w-100 h-100" style={{ cursor: "pointer", color: textColor }}>
                            <div className="mb-3">
                              <FiUploadCloud className="h3" style={{ color: accentColor }} />
                            </div>
                            <div className="mb-2" style={{ color: accentColor }}>
                              <strong>Upload Certification Document</strong>
                            </div>
                            <small className="d-block" style={{ color: textColor }}>
                              PDF format (max 5MB)
                            </small>
                            {formData.certificate && (
                              <div className="mt-2" style={{ color: accentColor }}>
                                {formData.certificate.name}
                              </div>
                            )}
                            <input
                              type="file"
                              name="certificate"
                              className="d-none"
                              accept="application/pdf"
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        {errors.certificate && (
                          <div className="text-danger small mt-2 d-flex align-items-center gap-2">
                            <FiAlertCircle /> {errors.certificate}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button - remains full width */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn w-100 py-3 fw-bold"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: accentColor,
                        color: primaryColor,
                        border: "none",
                        borderRadius: "4px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Submitting...
                        </>
                      ) : (
                        "Register as Artisan"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanRegister;