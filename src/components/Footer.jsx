import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = ['Solar Energy', 'Wind Power', 'Hydroelectric', 'Geothermal'];
  const resources = ['Energy Calculator', 'Installation Guide', 'Government Incentives', 'Environmental Impact'];

  return (
    <footer className="footer-container">
          © 2025 Green Genie. All rights reserved.
    </footer>
  );
};

export default Footer;
