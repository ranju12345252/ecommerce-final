import React from "react";

const VintageTimepieces = () => {
  const timepieces = [
    {
      title: "Chronomètre Royal",
      description: "Manual-winding · 18K Rose Gold · Geneva Seal",
      image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZSUyMHdhdGNofGVufDB8fDB8fHww",
      price: "₹2,49,999",
      specs: "42mm · 50m Water Resistant"
    },
    {
      title: "Aviator's Companion",
      description: "Valjoux 7750 · Stainless Steel · Tachymeter",
      image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpbnRhZ2UlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      price: "₹1,89,999",
      specs: "40mm · Chronograph Certified"
    },
    {
      title: "Mariner's Precision",
      description: "Automatic · Bronze Case · COSC Certified",
      image: "https://images.unsplash.com/photo-1619785292559-a15caa28bde6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZpbnRhZ2UlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      price: "₹3,34,999",
      specs: "44mm · 300m Water Resistant"
    }
  ];

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-4 fw-light mb-3 text-vintage">
          <span className="d-block mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Horological Heritage
          </span>
          <span className="h4 d-block fw-normal text-patina">
            Mechanical Marvels of Yesteryear
          </span>
        </h2>
      </div>

      <div className="row g-4 g-lg-5">
        {timepieces.map((watch, index) => (
          <div key={index} className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm-hover overflow-hidden transition-all watch-card"
              style={{
                borderRadius: "4px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "#f5f3f0"
              }}
            >
              <div
                className="card-img-top position-relative overflow-hidden"
                style={{
                  height: "360px",
                  backgroundColor: "#e8e3dc",
                  borderBottom: "1px solid #d4d0c9"
                }}
              >
                <img
                  src={watch.image}
                  alt={watch.title}
                  className="img-fluid w-100 h-100 object-contain p-4"
                  loading="lazy"
                  style={{
                    transform: "scale(1.01)",
                    transition: "transform 0.3s ease",
                    mixBlendMode: "multiply"
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-3"
                  style={{
                    background: "linear-gradient(to top, rgba(87, 70, 57, 0.9), transparent)",
                    color: "#f5f3f0"
                  }}
                >
                  <h3 className="h5 mb-0 fw-normal" style={{ letterSpacing: "0.5px" }}>
                    {watch.title}
                  </h3>
                  <p className="small mb-0 opacity-75">{watch.specs}</p>
                </div>
                <div className="position-absolute top-0 end-0 m-3 bg-gold rounded-circle p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A2D7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="6" x2="12" y2="12" />
                    <line x1="12" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
              </div>

              <div className="card-body p-4 text-center bg-parchment">
                <p className="text-patina mb-2 font-italic small">{watch.description}</p>
                <div className="d-flex flex-column justify-content-center gap-2">
                  <span className="h5 mb-0 text-gold">{watch.price}</span>
                  <button
                    className="btn btn-outline-gold px-4 py-2 rounded-0 fw-light"
                    style={{
                      border: "1px solid #4A2D7A",
                      color: "#4A2D7A",
                      transition: "all 0.3s ease",
                      letterSpacing: "0.5px"
                    }}
                  >
                    View Movement
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-vintage { color: #4A2D7A; }
        .text-gold { color: #D4AF37; }
        .text-patina { color: #707a77; }
        .bg-parchment { background-color: #f9f6f2; }
        .bg-gold { background-color: #D4AF37; }
        .watch-card:hover {
          box-shadow: 0 0.5rem 1.5rem rgba(74,45,122,0.08) !important;
          transform: translateY(-3px);
        }
        .btn-outline-gold:hover {
          background: #4A2D7A;
          color: #f5f3f0 !important;
          transform: translateY(-2px);
        }
        .object-contain {
          object-fit: contain;
          object-position: center;
        }
      `}</style>
    </section>
  );
};

export default VintageTimepieces;