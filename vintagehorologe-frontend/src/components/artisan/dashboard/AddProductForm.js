import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GiPocketWatch } from "react-icons/gi";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    materials: "",
    ethicalScore: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("artisanToken");
  const navigate = useNavigate();

  const categoryOptions = [
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

  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
    }
  }, [token, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.stock || formData.stock <= 0)
      newErrors.stock = "Valid stock quantity is required";
    if (!formData.materials.trim())
      newErrors.materials = "Materials are required";
    if (
      !formData.ethicalScore ||
      formData.ethicalScore < 1 ||
      formData.ethicalScore > 5
    )
      newErrors.ethicalScore = "Ethical score must be between 1-5";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const MAX_IMAGES = 4;
    const imageErrors = {};

    if (files.length > MAX_IMAGES) {
      imageErrors.images = `Maximum ${MAX_IMAGES} images allowed`;
    }

    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      imageErrors.images = "Each image must be smaller than 5MB";
    }

    if (Object.keys(imageErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...imageErrors }));
      return;
    }

    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images" && value !== "") data.append(key, value);
    });

    formData.images.forEach((image) => data.append("images", image));

    try {
      await axios.post("http://localhost:8080/api/products/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      navigate("/artisan/dashboard/products");
    } catch (error) {
      setErrors({
        server:
          error.response?.data?.message ||
          "Failed to add product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vintage-container py-5">
      <div className="horology-card shadow-lg">
        <div className="card-header horology-form-header">
          <GiPocketWatch className="header-icon" />
          <h2 className="serif-font">Enlist Horological Creation</h2>
          <p className="text-patina">Document Your Timeless Masterpiece</p>
        </div>

        <div className="card-body px-md-5 py-4">
          {errors.server && (
            <div className="vintage-alert">
              <GiPocketWatch className="me-2" />
              {errors.server}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-patina">Timepiece Name</label>
                  <input
                    type="text"
                    className={`vintage-input ${errors.name && "is-invalid"}`}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. 1947 Chronometre Royal"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="text-patina">Horological Category</label>
                  <select
                    className={`vintage-select ${errors.category && "is-invalid"}`}
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Heritage Category</option>
                    {categoryOptions.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-patina">Valuation (USD)</label>
                  <input
                    type="number"
                    className={`vintage-input ${errors.price && "is-invalid"}`}
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 2499.99"
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-patina">Inventory</label>
                  <input
                    type="number"
                    className={`vintage-input ${errors.stock && "is-invalid"}`}
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="Available units"
                  />
                  {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="text-patina">Craftsmanship Rating</label>
                  <input
                    type="number"
                    className={`vintage-input ${errors.ethicalScore && "is-invalid"}`}
                    name="ethicalScore"
                    value={formData.ethicalScore}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    step="0.1"
                    placeholder="1-10 Scale"
                  />
                  {errors.ethicalScore && <div className="invalid-feedback">{errors.ethicalScore}</div>}
                </div>
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="text-patina">Horological Narrative</label>
              <textarea
                className={`vintage-textarea ${errors.description && "is-invalid"}`}
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detail the timepiece's provenance and mechanical significance..."
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="form-group mb-4">
              <label className="text-patina">Materials & Complications</label>
              <input
                type="text"
                className={`vintage-input ${errors.materials && "is-invalid"}`}
                name="materials"
                value={formData.materials}
                onChange={handleInputChange}
                placeholder="e.g. 18k Rose Gold, Manual Winding Caliber"
              />
              {errors.materials && <div className="invalid-feedback">{errors.materials}</div>}
            </div>

            <div className="form-group mb-5">
              <label className="text-patina">Horological Documentation</label>
              <div className="vintage-upload">
                <input
                  type="file"
                  className={`${errors.images && "is-invalid"}`}
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <div className="upload-label">
                  <GiPocketWatch className="me-2" />
                  Upload Certification & Gallery Images
                </div>
                {errors.images && <div className="invalid-feedback">{errors.images}</div>}
                <div className="upload-instructions">Maximum 4 Images • 5MB Each</div>
              </div>

              {imagePreviews.length > 0 && (
                <div className="gallery-grid mt-4">
                  {imagePreviews.map((src, index) => (
                    <div className="gallery-item" key={index}>
                      <img src={src} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => {
                          const newPreviews = [...imagePreviews];
                          newPreviews.splice(index, 1);
                          setImagePreviews(newPreviews);
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-gold w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Enlisting Masterpiece...
                </>
              ) : (
                "Enshrine in Horology Archives"
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        :root {
          --vintage-navy: #0A1A2F;
          --horology-gold: #C5A47E;
          --patina-cream: #F4F1EA;
          --watchsteel: #2A3541;
        }

        .vintage-container {
          background: var(--patina-cream); /* Changed to a light background */
          min-height: 100vh;
          display: flex; /* For centering content */
          justify-content: center; /* For centering content */
          align-items: center; /* For centering content */
          padding: 2rem 1rem; /* Added padding to ensure content isn't flush with edges */
        }

        .horology-card {
          background: rgba(10, 26, 47, 0.95);
          border: 1px solid var(--horology-gold);
          max-width: 1000px;
          width: 100%; /* Ensure it takes full width up to max-width */
          margin: 0 auto; /* Center the card horizontally */
          border-radius: 8px; /* Added slight border-radius */
          overflow: hidden; /* Ensures header clip-path is contained */
        }

        .horology-form-header {
          background: linear-gradient(45deg, var(--vintage-navy) 40%, rgba(10,26,47,0.8));
          border-bottom: 2px solid var(--horology-gold);
          padding: 2rem;
          text-align: center;
          clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
        }

        .header-icon {
          font-size: 2.5rem;
          color: var(--horology-gold);
          margin-bottom: 1rem;
        }

        .serif-font {
          font-family: 'Playfair Display', serif;
          color: var(--patina-cream);
          margin-bottom: 0.5rem;
        }

        .text-patina {
          color: var(--patina-cream);
          font-family: 'Helvetica Neue', sans-serif;
        }

        .vintage-input, .vintage-select, .vintage-textarea {
          background: transparent;
          border: 1px solid var(--horology-gold);
          color: var(--patina-cream);
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0;
          transition: all 0.3s ease;
          appearance: none; /* Removes default OS styling for select */
        }

        .vintage-select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23C5A47E' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 16px 12px;
        }

        .vintage-input:focus, .vintage-select:focus, .vintage-textarea:focus {
          background: rgba(197, 164, 126, 0.05);
          border-color: var(--horology-gold);
          box-shadow: 0 0 0 3px rgba(197, 164, 126, 0.1);
          outline: none; /* Remove default outline */
        }

        /* Style for options within the select to be visible */
        .vintage-select option {
            background: var(--vintage-navy); /* Dark background for options */
            color: var(--patina-cream); /* Light text for options */
        }

        .vintage-upload {
          border: 2px solid var(--horology-gold);
          padding: 2rem;
          text-align: center;
          position: relative;
          background: rgba(10, 26, 47, 0.8);
          cursor: pointer; /* Indicate it's clickable */
        }

        .vintage-upload input[type="file"] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0; /* Hide the default file input */
          cursor: pointer;
        }

        .upload-label {
          color: var(--horology-gold);
          font-family: 'Helvetica Neue', sans-serif;
          pointer-events: none; /* Allow clicks to pass through to the hidden input */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-instructions {
          color: rgba(244, 241, 234, 0.7);
          font-size: 0.9rem;
          margin-top: 0.5rem;
          pointer-events: none; /* Allow clicks to pass through */
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* Responsive grid */
          gap: 1rem;
          margin-top: 1rem; /* Adjust margin if needed */
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          border: 1px solid var(--horology-gold);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block; /* Remove extra space below image */
        }

        .remove-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          background: var(--vintage-navy);
          border: 1px solid var(--horology-gold);
          color: var(--horology-gold);
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%; /* Make remove button circular */
          font-size: 1rem;
          line-height: 1;
          padding: 0;
          transition: background-color 0.2s;
        }

        .remove-btn:hover {
            background-color: rgba(197, 164, 126, 0.2);
        }

        .btn-gold {
          background: linear-gradient(135deg, #C5A47E 0%, #A8865E 100%);
          color: var(--vintage-navy);
          border: none;
          padding: 1rem;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-gold:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(197, 164, 126, 0.3);
        }

        .btn-gold:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .vintage-alert {
          background: rgba(10, 26, 47, 0.9);
          border: 1px solid var(--horology-gold);
          color: var(--horology-gold);
          padding: 1rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
        }

        .invalid-feedback {
          color: var(--horology-gold);
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        /* Specific style for inputs with errors */
        .vintage-input.is-invalid,
        .vintage-select.is-invalid,
        .vintage-textarea.is-invalid,
        .vintage-upload .is-invalid /* for file input container */ {
            border-color: var(--horology-gold); /* Keep existing gold border, but you might want to change this to a standard error color like red if preferred */
            box-shadow: 0 0 0 0.25rem rgba(197, 164, 126, 0.25); /* Or a red shadow */
        }


        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
          margin-right: 0.5rem;
        }

        /* Media Queries for responsiveness */
        @media (max-width: 768px) {
            .horology-card {
                padding: 1rem;
            }
            .gallery-grid {
                grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            }
        }
      `}</style>
    </div>
  );
};

export default AddProductForm;