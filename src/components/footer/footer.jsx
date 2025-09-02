import React from 'react';
import Logo from '../../images/Logo.png';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa"; // для Telegram
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './footer.scss';

const Footer = () => {
  const { t } = useTranslation();

  // Данные контактов
  const email = "assuna01@gmail.com";
  const phone = "+998882540001";  

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section left">
          <img src={Logo} alt="As-Sunna Logo" className="footer-logo" />
          <p>{t('footer.desc')}</p>
        </div>

        <div className="footer-section center">
          <h3>{t('footer.contact')}</h3>
          <div className="contact-item">
            <FaLocationDot />{" "}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Chilanzar,+9th+Quarter,+Building+12,+Tashkent,+Uzbekistan+100097"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.location')}
            </a>
          </div>
          <div className="contact-item">
            <FaPhoneAlt /> <a href={`tel:${phone}`}>{t('footer.phone')}</a>
          </div>
          <div className="contact-item">
            <MdEmail /> <a href={`mailto:${email}`}>{t('footer.email')}</a>
          </div>
          <div className="social-icons">
            <a href="https://www.instagram.com/assunna.uz" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/assunnapharmaceuticaluz/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://t.me/As_Sunna_Pharmaceuitical" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
            <a href="https://www.youtube.com/channel/UCF0844a8FtIGBD2S9kDB1dw" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>

        {/* Right Section: About Company Links */}
        <div className="footer-section right">
          <h3>{t('footer.navigation')}</h3>
          <ul>
            <li><Link className='footerlink' to="/">{t('nav.home')}</Link></li>
            <li><Link className='footerlink' to="/about">{t('nav.about')}</Link></li>
            <li><Link className='footerlink' to="/product">{t('nav.product')}</Link></li>
            <li><Link className='footerlink' to="/contact">{t('nav.contact')}</Link></li>
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