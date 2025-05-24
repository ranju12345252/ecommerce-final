import React from "react";
import {
  FaLock,
  FaCertificate,
  FaTruck,
  FaRegClock,

  FaGem,
  FaTools
} from "react-icons/fa";

const TrustBadges = () => {
  const badges = [
    {
      icon: <FaLock className="text-gold" />,
      title: "Escrow Protection",
      description: "Bank-grade transaction security"
    },
    {
      icon: <FaCertificate className="text-gold" />,
      title: "Certified Authenticity",
      description: "COSC & Geneva Seal certified"
    },
    {
      icon: <FaTruck className="text-gold" />,
      title: "Global Concierge",
      description: "Insured precision shipping"
    },
    {
      icon: <FaTools className="text-gold" />,
      title: "Master Restoration",
      description: "Horologist-certified servicing"
    },
    {
      icon: <FaRegClock className="text-gold" />,
      title: "Timeless Warranty",
      description: "10-year mechanical guarantee"
    },
    {
      icon: <FaGem className="text-gold" />,
      title: "Premium Materials",
      description: "18K gold & sapphire crystals"
    }
  ];

  return (
    <section className="py-5 bg-parchment">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-light mb-3 text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>
            Horological Assurance
          </h2>
          <p className="text-patina">
            Preserving mechanical legacy since 1927
          </p>
        </div>

        <div className="row g-4 g-lg-5">
          {badges.map((badge, index) => (
            <div key={index} className="col-md-4 col-lg-2">
              <div className="trust-card p-4 text-center h-100 transition-all hover-shadow">
                <div className="icon-wrapper mb-3 mx-auto">
                  {badge.icon}
                  <div className="icon-border"></div>
                </div>
                <h5 className="h6 fw-normal mb-2 text-navy">{badge.title}</h5>
                <p className="small text-patina mb-0">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .text-gold { color: #D4AF37; }
        .text-navy { color: #2A2D3B; }
        .text-patina { color: #707a77; }
        .bg-parchment { background-color: #f9f6f2; }

        .trust-card {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 4px;
          border: 1px solid #e5e0d7;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 40px rgba(42,45,59,0.08);
        }

        .icon-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f3f0;
          border-radius: 50%;
          font-size: 1.75rem;
          transition: all 0.3s ease;
        }

        .icon-border {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid #D4AF37;
          border-radius: 50%;
          opacity: 0.3;
        }

        .trust-card:hover .icon-wrapper {
          background: #2A2D3B;
          transform: rotate(360deg);
        }

        .trust-card:hover .icon-border {
          opacity: 0.8;
          border-width: 2px;
        }

        .trust-card:hover .text-gold {
          color: #fff !important;
        }
      `}</style>
    </section>
  );
};

export default TrustBadges;