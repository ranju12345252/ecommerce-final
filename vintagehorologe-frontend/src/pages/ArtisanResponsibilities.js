import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock,
  FaTools,
  FaGem,
  FaAward,
  FaGlobe,
  FaCoins,
  FaBoxOpen,
  FaChartLine,
  FaCertificate,
  FaRegHandshake,
} from "react-icons/fa";

const watchmakerStandards = [
  {
    icon: <FaTools />,
    title: "Movement Precision",
    text: "Maintain certified chronometer standards",
  },
  {
    icon: <FaClock />,
    title: "Heritage Craftsmanship",
    text: "Adhere to traditional watchmaking techniques",
  },
  {
    icon: <FaRegHandshake />,
    title: "Client Consultations",
    text: "Provide expert horological guidance",
  },
  {
    icon: <FaGem />,
    title: "Premium Materials",
    text: "Use only certified luxury components",
  },
];

const watchmakerBenefits = [
  {
    icon: <FaGlobe />,
    title: "Global Exposure",
    text: "Present creations to international collectors",
  },
  {
    icon: <FaCoins />,
    title: "Premium Earnings",
    text: "Retain 85% of every authenticated sale",
  },
  {
    icon: <FaBoxOpen />,
    title: "Presentation Excellence",
    text: "Luxury packaging & certification support",
  },
  {
    icon: <FaChartLine />,
    title: "Market Insights",
    text: "Access luxury watch market analytics",
  },
];

const HorologistResponsibilities = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f8f5ff 0%, #f3e9ff 100%)",
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(90deg, #4A2D7A 60%, #6f42c1 100%)",
          color: "#fff",
          padding: "3rem 1rem 2rem 1rem",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(74,45,122,0.08)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: "0.5px",
            marginBottom: "1rem",
            textShadow: "0 2px 12px #2a1b3d33",
          }}
        >
          <FaCertificate style={{ fontSize: "1.8rem", verticalAlign: "middle", marginRight: "0.5rem" }} />
          Horological Excellence
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#D4AF37",
            fontWeight: 500,
            marginBottom: "0.5rem",
          }}
        >
          Join Our Guild of Master Watchmakers
        </p>
        <p
          style={{
            color: "#f8f5ff",
            opacity: 0.8,
            fontSize: "0.9rem",
            maxWidth: 600,
            margin: "0 auto",
            padding: "0 1rem",
            lineHeight: 1.5,
          }}
        >
          Elevate your craft, connect with global collectors, and access exclusive resources for certified horologists.
        </p>
      </div>

      {/* Standards & Benefits */}
      <div
        className="container"
        style={{
          marginTop: "-2rem",
          zIndex: 2,
          position: "relative",
          maxWidth: 1100,
          padding: "0 1rem",
        }}
      >
        <div
          className="row g-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {/* Standards */}
          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 4px 24px rgba(74,45,122,0.10)",
              padding: "1.5rem 1rem",
              width: "100%",
              flex: "1 1 300px",
              maxWidth: "500px",
              marginBottom: "1rem",
            }}
          >
            <h3
              style={{
                color: "#4A2D7A",
                fontWeight: 700,
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaCertificate /> Master Watchmaker Standards
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {watchmakerStandards.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                    gap: "0.8rem",
                  }}
                >
                  <span
                    style={{
                      background: "#4A2D7A",
                      color: "#D4AF37",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      boxShadow: "0 2px 8px #4A2D7A22",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div style={{
                      fontWeight: 600,
                      color: "#4A2D7A",
                      fontSize: "0.95rem",
                    }}>
                      {item.title}
                    </div>
                    <div style={{
                      color: "#6f42c1",
                      fontSize: "0.85rem",
                    }}>
                      {item.text}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 4px 24px rgba(212,175,55,0.10)",
              padding: "1.5rem 1rem",
              width: "100%",
              flex: "1 1 300px",
              maxWidth: "500px",
              marginBottom: "1rem",
            }}
          >
            <h3
              style={{
                color: "#D4AF37",
                fontWeight: 700,
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaAward /> Certified Horologist Benefits
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {watchmakerBenefits.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                    gap: "0.8rem",
                  }}
                >
                  <span
                    style={{
                      background: "#D4AF37",
                      color: "#4A2D7A",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      boxShadow: "0 2px 8px #D4AF3722",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div style={{
                      fontWeight: 600,
                      color: "#D4AF37",
                      fontSize: "0.95rem",
                    }}>
                      {item.title}
                    </div>
                    <div style={{
                      color: "#4A2D7A",
                      fontSize: "0.85rem",
                    }}>
                      {item.text}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          margin: "2rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <button
            className="btn btn-lg fw-bold text-white border-0"
            style={{
              background: "linear-gradient(45deg, #4A2D7A, #6f42c1)",
              borderRadius: "2rem",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              width: "100%",
              maxWidth: "300px",
              boxShadow: "0 4px 16px #4A2D7A22",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 24px #4A2D7A33";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 16px #4A2D7A22";
            }}
            onClick={() => navigate("/artisan-register")}
          >
            Submit Your Timepiece
          </button>

          <button
            className="btn btn-lg fw-bold"
            style={{
              border: "2px solid #D4AF37",
              color: "#D4AF37",
              background: "transparent",
              borderRadius: "2rem",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              width: "100%",
              maxWidth: "300px",
              boxShadow: "0 4px 16px #D4AF3722",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#D4AF3710";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/artisan-login")}
          >
            Master Watchmaker Portal
          </button>
        </div>

        <div
          style={{
            color: "#4A2D7A",
            fontWeight: 500,
            fontSize: "0.85rem",
            opacity: 0.8,
            letterSpacing: "0.3px",
            textAlign: "center",
            lineHeight: 1.4,
            padding: "0 1rem",
          }}
        >
          15% Commission &bull; Escrow Payments &bull; Horological Mentorship
        </div>
      </div>
    </section>
  );
};

export default HorologistResponsibilities;