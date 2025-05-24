import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./herosection.css"; // Ensure this path is correct

const HeroSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const elements = document.querySelectorAll(".parallax-element");
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      elements.forEach((element) => {
        const speed = element.dataset.speed || 1;
        const xOffset = (x - 0.5) * 15 * speed;
        const yOffset = (y - 0.5) * 15 * speed;
        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="vintage-hero">
      <div className="hero-chronograph-background">
        <div className="hero-watch-movement"></div>
        <div className="hero-patina-overlay"></div>
        <div className="hero-gold-particles"></div>
      </div>

      <div className="horology-content">
        <h1 className="heritage-title">
          <span data-speed="0.8" className="parallax-element">
            Horological
          </span>
          <span data-speed="1.1" className="accent-illumination parallax-element">
            Heritage
          </span>
        </h1>
        <p className="provenance-tagline parallax-element" data-speed="0.9">
          Curating Timeless Masterpieces with Certified Provenance
        </p>
        <div className="connoisseur-actions" data-speed="1.1">
          <button onClick={() => navigate("/marketplace")} className="btn-horology">
            <span className="btn-guilloche"></span>
            <span className="btn-label">
              Explore Collection
              <svg className="btn-crown" viewBox="0 0 24 24">
                <path d="M12 2L8.46 7.36 2 8.18l4.17 4.6L5.82 21 12 17.77 18.18 21l-1.35-8.22L22 8.18l-6.46-.82L12 2z" />
              </svg>
            </span>
          </button>
          <button onClick={() => navigate("/artisan-responsibilities")} className="btn-horology">
            <span className="btn-guilloche"></span>
            <span className="btn-label">
              Verify Provenance
              <svg className="btn-seal" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="horology-scroll">
        <div className="scroll-gear"></div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);