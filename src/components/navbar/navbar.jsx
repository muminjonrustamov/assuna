import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/Logo.png";
import "./navbar.scss";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { supabase } from "../../utils/supabase";

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
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language || "en";

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("Category").select("*");
      if (!error) setCategories(data || []);
    };
    fetchCategories();
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
  };

  const handleCategorySelect = (catId) => {
    setDropdownOpen(false);
    setIsOpen(false);
    navigate(`/product?category=${catId}`);
  };

  const getCategoryName = (cat) => {
    return lang === "uz"
      ? cat.name_uz
      : lang === "ru"
      ? cat.name_ru
      : cat.name_en;
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

          {/* Products with dropdown */}
          <li
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            {/* Сам линк на все продукты */}
            <NavLink to="/product">{t("nav.product")}</NavLink>

            {/* Кнопка-стрелка для открытия категорий */}
            <button
              type="button"
              className="dropdown-toggle"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <FaChevronDown className={`arrow ${dropdownOpen ? "open" : ""}`} />
            </button>

            {/* Выпадающее меню категорий */}
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button onClick={() => handleCategorySelect(cat.id)}>
                    {getCategoryName(cat)}
                  </button>
                </li>
              ))}
            </ul>
          </li>

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
