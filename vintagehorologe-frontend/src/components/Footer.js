import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaClock, FaCertificate, FaTools, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="horology-footer">
      <Container>
        <Row className="g-4 footer-content">
          {/* Horology Services */}
          <Col md={3}>
            <h5 className="footer-title mb-4">
              <FaTools className="me-2" />
              Horology Services
            </h5>
            <ul className="footer-links">
              <li><a href="/servicing">Movement Servicing</a></li>
              <li><a href="/authentication">Timepiece Authentication</a></li>
              <li><a href="/restoration">Vintage Restoration</a></li>
              <li><a href="/appraisal">Appraisal Services</a></li>
            </ul>
          </Col>

          {/* The Workshop */}
          <Col md={3}>
            <h5 className="footer-title mb-4">
              <FaClock className="me-2" />
              The Workshop
            </h5>
            <ul className="footer-links">
              <li><a href="/craftsmanship">Our Craftsmanship</a></li>
              <li><a href="/history">House History</a></li>
              <li><a href="/journals">Horology Journals</a></li>
              <li><a href="/collections">Archive Collection</a></li>
            </ul>
          </Col>

          {/* Atelier Contact */}
          <Col md={3}>
            <h5 className="footer-title mb-4">
              <FaMapMarkerAlt className="me-2" />
              Atelier de Horlogerie
            </h5>
            <div className="contact-info">
              <p>14 Rue du Rhône</p>
              <p>1204 Genève</p>
              <p>Switzerland</p>
              <div className="business-hours mt-3">
                <p>Mon-Fri: 9AM - 6PM CET</p>
                <p>By Appointment Only</p>
              </div>
            </div>
          </Col>

          {/* Guild Newsletter */}
          <Col md={3}>
            <h5 className="footer-title mb-4">
              <FaCertificate className="me-2" />
              Guild Newsletter
            </h5>
            <Form className="newsletter-form">
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email for horology insights"
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="gold" className="w-100">
                Join the Guild
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Legal & Copyright */}
        <Row className="legal-section mt-5 pt-4">
          <Col className="text-center">
            <div className="legal-links">
              <a href="/heritage">Heritage Preservation</a>
              <a href="/terms">Horological Terms</a>
              <a href="/privacy">Discretion Policy</a>
              <a href="/patrons">Patron Services</a>
            </div>
            <div className="copyright mt-3">
              <p>© {new Date().getFullYear()} VintageHorologe</p>
              <p className="tagline">
                Guardians of Mechanical Horology Since 1922
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;