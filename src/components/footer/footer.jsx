import React from 'react';
import Logo from '../../images/Logo.png';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './footer.scss';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo and Description */}
        <div className="footer-section left">
          <img src={Logo} alt="As-Sunna Logo" className="footer-logo" />
          <p>{t('footer.desc')}</p>
        </div>

        {/* Center Section: Contact Info */}
        <div className="footer-section center">
          <h3>{t('footer.contact')}</h3>
          <div className="contact-item"><FaLocationDot /> {t('footer.location')}</div>
          <div className="contact-item"><FaPhoneAlt /> {t('footer.phone')}</div>
          <div className="contact-item"><MdEmail /> {t('footer.email')}</div>
        </div>

        {/* Right Section: About Company Links */}
        <div className="footer-section right">
          <h3>{t('footer.navigation')}</h3>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
            <li><Link to="/product">{t('nav.product')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        {t('footer.copyright')}
      </div>
    </footer>
  );
};

export default Footer;
