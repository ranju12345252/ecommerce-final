import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaSortAlphaDown, FaCalendarAlt } from 'react-icons/fa';

const BrandsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const luxuryWatchBrands = [
    {
      id: 1,
      name: 'Rolex',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Rolex_logo.svg/2560px-Rolex_logo.svg.png',
      description: 'Iconic Swiss watchmaker known for precision and status',
      origin: 'Switzerland',
      established: 1905,
    },
    {
      id: 2,
      name: 'Patek Philippe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Patek_Philippe_Logo.svg/2560px-Patek_Philippe_Logo.svg.png',
      description: 'Masters of complicated watchmaking since the 19th century',
      origin: 'Switzerland',
      established: 1839,
    },
    {
      id: 3,
      name: 'Audemars Piguet',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Audemars_Piguet_Logo.svg/2560px-Audemars_Piguet_Logo.svg.png',
      description: 'Creators of the Royal Oak, luxury with innovation',
      origin: 'Switzerland',
      established: 1875,
    },
    {
      id: 4,
      name: 'Vacheron Constantin',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Vacheron_Constantin_logo.svg/2560px-Vacheron_Constantin_logo.svg.png',
      description: 'Oldest continuously operating Swiss watch manufacturer',
      origin: 'Switzerland',
      established: 1755,
    },
    {
      id: 5,
      name: 'Omega',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Omega_Logo.svg/2560px-Omega_Logo.svg.png',
      description: 'Watches for space missions and Olympic timing',
      origin: 'Switzerland',
      established: 1848,
    },
    {
      id: 6,
      name: 'Jaeger-LeCoultre',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jaeger-LeCoultre_logo.svg/2560px-Jaeger-LeCoultre_logo.svg.png',
      description: 'Inventive Swiss brand behind the Reverso and Atmos',
      origin: 'Switzerland',
      established: 1833,
    },
    {
      id: 7,
      name: 'Richard Mille',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Richard_Mille_logo.svg/2560px-Richard_Mille_logo.svg.png',
      description: 'Futuristic design and ultra-high-tech materials',
      origin: 'Switzerland',
      established: 2001,
    },
    {
      id: 8,
      name: 'Cartier',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Cartier_logo.svg/2560px-Cartier_logo.svg.png',
      description: 'Luxury watches and jewelry with Parisian elegance',
      origin: 'France',
      established: 1847,
    },
    {
      id: 9,
      name: 'Blancpain',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Blancpain_logo.svg/2560px-Blancpain_logo.svg.png',
      description: 'Oldest watch brand, blending tradition and innovation',
      origin: 'Switzerland',
      established: 1735,
    },
    {
      id: 10,
      name: 'Hublot',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Hublot_Logo.svg/2560px-Hublot_Logo.svg.png',
      description: 'Art of Fusion: Swiss tradition meets modern tech',
      origin: 'Switzerland',
      established: 1980,
    },
    {
      id: 11,
      name: 'IWC Schaffhausen',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/IWC_Schaffhausen_logo.svg/2560px-IWC_Schaffhausen_logo.svg.png',
      description: 'Precision engineering meets classic design',
      origin: 'Switzerland',
      established: 1868,
    },
    {
      id: 12,
      name: 'Panerai',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Panerai_logo.svg/2560px-Panerai_logo.svg.png',
      description: 'Italian design and Swiss technology for divers',
      origin: 'Italy',
      established: 1860,
    },
    {
      id: 13,
      name: 'Breguet',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Breguet_logo.svg/2560px-Breguet_logo.svg.png',
      description: 'Innovator of tourbillon and fine Swiss craftsmanship',
      origin: 'Switzerland',
      established: 1775,
    },
    {
      id: 14,
      name: 'TAG Heuer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/TAG_Heuer_Logo.svg/2560px-TAG_Heuer_Logo.svg.png',
      description: 'Pioneer in chronographs and sports timing',
      origin: 'Switzerland',
      established: 1860,
    },
    {
      id: 15,
      name: 'Grand Seiko',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Grand_Seiko_logo.svg/2560px-Grand_Seiko_logo.svg.png',
      description: 'Japanese precision, artistry, and innovation',
      origin: 'Japan',
      established: 1960,
    },
    {
      id: 16,
      name: 'A. Lange & Söhne',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/A._Lange_%26_S%C3%B6hne_logo.svg/2560px-A._Lange_%26_S%C3%B6hne_logo.svg.png',
      description: 'Exquisite German watchmaking tradition',
      origin: 'Germany',
      established: 1845,
    },
  ];


  const [brands] = useState(luxuryWatchBrands);
  const handleImageError = (e) => {
    if (!e.target.src.includes('via.placeholder.com')) {
      e.target.src = 'https://via.placeholder.com/200x100.png?text=Brand+Logo+Not+Found';
      e.target.style.objectFit = 'contain';
      e.target.style.padding = '1rem';
    }
  };

  const filteredBrands = brands
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'established') return a.established - b.established;
      return 0;
    });

  return (
    <Container fluid className="cosmic-bg p-5 min-vh-100">
      <Row className="mb-4 justify-content-center">
        <Col md={8} className="mb-3 mb-md-0">
          <InputGroup className="cosmic-search-wrapper">
            <InputGroup.Text className="cosmic-search-prepend">
              <FaSearch className="search-icon" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search luxury brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cosmic-search-input"
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cosmic-select"
          >
            <option value="name">Sort by Name</option>
            <option value="established">Sort by Established</option>
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4 px-3">
        {filteredBrands.map((brand) => (
          <Col key={brand.id}>
            <Card className="cosmic-brand-card h-100">
              <div className="brand-image-container">
                <Card.Img
                  loading="lazy"
                  variant="top"
                  src={brand.logo}
                  className="brand-logo-img"
                  alt={`${brand.name} logo`}
                  onError={handleImageError}
                  onLoad={(e) => {
                    e.target.style.objectFit = 'contain';
                    e.target.style.width = 'auto';
                    e.target.style.height = 'auto';
                    e.target.style.maxWidth = '100%';
                    e.target.style.maxHeight = '100%';
                  }}
                />
              </div>
              <Card.Body className="card-body-content">
                <Card.Title className="brand-name">
                  {brand.name}
                </Card.Title>
                <Card.Text className="brand-description">
                  {brand.description}
                </Card.Text>
                <div className="brand-meta-info">
                  <div className="meta-item">
                    <FaSortAlphaDown className="meta-icon" />
                    <span>{brand.origin}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span>Est. {brand.established}</span>
                  </div>
                </div>
                <Card.Footer className="card-footer">
                  <Link
                    to={`/brands/${brand.id}`}
                    className="view-collections-btn"
                  >
                    View Collections
                  </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>{`
        :root {
          --cosmic-bg: #f4f4f9;
          --stellar-purple: #5a4fcf;
          --cosmic-gold: #f4b400;
          --space-black: #ffffff;
          --star-dust: #444444;
          --transition: 0.3s ease-in-out;
        }

        .cosmic-bg {
          background: var(--cosmic-bg);
          color: var(--star-dust);
        }

        .cosmic-search-wrapper {
          border-radius: 2rem;
          background: var(--space-black);
          border: 1px solid rgba(90, 79, 207, 0.3);
          transition: all var(--transition);
        }

        .cosmic-search-wrapper:focus-within {
          border-color: var(--stellar-purple);
          box-shadow: 0 0 15px rgba(90, 79, 207, 0.4);
        }

        .cosmic-search-prepend {
          background: transparent;
          border: none;
          border-right: 1px solid rgba(90, 79, 207, 0.4);
          border-radius: 2rem 0 0 2rem;
          padding-left: 1.5rem;
        }

        .search-icon {
          color: var(--stellar-purple);
          font-size: 1.1rem;
        }

        .cosmic-search-input {
          background: transparent;
          border: none;
          color: var(--star-dust);
          padding: 0.75rem 1rem;
          border-radius: 0 2rem 2rem 0;
        }

        .cosmic-search-input::placeholder {
          color: rgba(68, 68, 68, 0.6);
        }

        .cosmic-select {
          background: var(--space-black);
          border: 1px solid rgba(90, 79, 207, 0.3);
          color: var(--star-dust);
          border-radius: 2rem;
          width: 100%;
          transition: all var(--transition);
          padding: 0.75rem 1.5rem;
        }

        .cosmic-select:focus {
          border-color: var(--stellar-purple);
          box-shadow: 0 0 15px rgba(90, 79, 207, 0.4);
        }

        .cosmic-brand-card {
          background: var(--space-black);
          border: 1px solid rgba(90, 79, 207, 0.3);
          border-radius: 1rem;
          transition: all var(--transition);
          overflow: hidden;
        }

        .cosmic-brand-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(90, 79, 207, 0.2);
        }

        .brand-image-container {
          height: 200px;
          background: rgba(244, 244, 249, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
        }

        .brand-logo-img {
          transition: transform 0.3s ease;
        }

        .cosmic-brand-card:hover .brand-logo-img {
          transform: scale(1.05);
        }

        .card-body-content {
          padding: 1.5rem;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(244, 244, 249, 0.9) 100%
          );
          position: relative;
          z-index: 1;
        }

        .brand-name {
          color: var(--cosmic-gold);
          font-weight: 600;
          margin-bottom: 1rem;
          min-height: 3rem;
          font-size: 1.25rem;
        }

        .brand-description {
          color: rgba(68, 68, 68, 0.8);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          min-height: 4rem;
          line-height: 1.5;
        }

        .brand-meta-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          color: rgba(68, 68, 68, 0.7);
          font-size: 0.9rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .meta-icon {
          color: var(--stellar-purple);
          font-size: 0.9rem;
        }

        .card-footer {
          background: transparent;
          border-top: 1px solid rgba(90, 79, 207, 0.3);
          padding: 1rem 0 0 0;
        }

        .view-collections-btn {
          background: transparent;
          border: 2px solid var(--stellar-purple);
          color: var(--stellar-purple);
          border-radius: 2rem;
          padding: 0.5rem 1.5rem;
          width: 100%;
          text-align: center;
          text-decoration: none;
          transition: all var(--transition);
          font-weight: 500;
        }

        .view-collections-btn:hover {
          background: var(--stellar-purple);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(90, 79, 207, 0.5);
        }

        @media (max-width: 768px) {
          .cosmic-brand-card {
            margin-bottom: 1.5rem;
          }

          .brand-name {
            font-size: 1.1rem;
          }

          .brand-description {
            font-size: 0.85rem;
          }

          .cosmic-select {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default BrandsPage;