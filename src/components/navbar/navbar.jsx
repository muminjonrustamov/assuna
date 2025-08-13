import { Link, NavLink } from "react-router-dom";
import Logo from "../../images/Logo.png";
import "./navbar.scss";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

// флаги
import FlagEn from "../../flags/us.png";
import FlagRu from "../../flags/ru.png";
import FlagUz from "../../flags/uz.png";

const languages = [
  { code: "en", label: "English", flag: FlagEn },
  { code: "uz", label: "O‘zbekcha", flag: FlagUz },
  { code: "ru", label: "Русский", flag: FlagRu },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code); // сохраняем выбранный язык
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul onClick={() => setIsOpen(false)}>
          <li><NavLink to="/" end>{t("nav.home")}</NavLink></li>
          <li><NavLink to="/about">{t("nav.about")}</NavLink></li>
          <li><NavLink to="/product">{t("nav.product")}</NavLink></li>
          <li><NavLink to="/contact">{t("nav.contact")}</NavLink></li>
        </ul>

        <div className="language-switcher">
          {languages.map((lang) => (
            <img
              key={lang.code}
              src={lang.flag}
              alt={lang.label}
              title={lang.label}
              className={`flag ${i18n.language === lang.code ? "active" : ""}`}
              onClick={() => changeLanguage(lang.code)}
            />
          ))}
        </div>
      </nav>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>
    </header>
  );
};

export default Navbar;