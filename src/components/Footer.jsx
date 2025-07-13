import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = ['Solar Energy', 'Wind Power', 'Hydroelectric', 'Geothermal'];
  const resources = ['Energy Calculator', 'Installation Guide', 'Government Incentives', 'Environmental Impact'];

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">

          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Zap />
              </div>
              <span>Green Genie</span>
            </div>
            <p>
              Empowering communities with knowledge about renewable energy through intelligent conversations and educational resources.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              {resources.map((resource, index) => (
                <li key={index}><a href="#">{resource}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Green Genie. All rights reserved. Built for a sustainable future.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
