import Laboratory from '../../images/slider3.jpg';
import { FiTarget } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { PiMedalBold } from "react-icons/pi";
import { TbUsers } from "react-icons/tb";
import { useTranslation } from 'react-i18next';

import './about.scss';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-big">
      <div className="about-text">
        <h1>{t("about.title")}</h1>
        <p>{t("about.description")}</p>
      </div>

      <div className="about-image-and-boxes">
        <div className="about-image">
          <img src={Laboratory} alt="laboratory" />
        </div>
        <div className="about-box">
          <div className="about-boxes">
            <div className="about-box-icon">
              <FiTarget className='aboutbox-icon blue' />
              <h2>{t("about.missionTitle")}</h2>
            </div>
            <p>{t("about.missionText")}</p>
          </div>
          <div className="about-boxes">
            <div className="about-box-icon">
              <FaEye className='aboutbox-icon red' />
              <h2>{t("about.visionTitle")}</h2>
            </div>
            <p>{t("about.visionText")}</p>
          </div>
        </div>
      </div>

      <div className="value-section">
        <h2 className="value-title">{t("about.valuesTitle")}</h2>
        <div className="value-cards">
          <div className="value-card">
            <PiMedalBold className="value-icon blue" />
            <h3>{t("about.qualityExcellenceTitle")}</h3>
            <p>{t("about.qualityExcellenceText")}</p>
          </div>
          <div className="value-card">
            <TbUsers className="value-icon red" />
            <h3>{t("about.patientFocusTitle")}</h3>
            <p>{t("about.patientFocusText")}</p>
          </div>
          <div className="value-card">
            <FiTarget className="value-icon blue" />
            <h3>{t("about.innovationTitle")}</h3>
            <p>{t("about.innovationText")}</p>
          </div>
        </div>
      </div>

      <div className="about-story">
        <h2>{t("about.historyTitle")}</h2>

        <div className="card history">
          <h3><span>📖</span> {t("about.history1Title")}</h3>
          <p>{t("about.history1Text1")}</p>
          <p>{t("about.history1Text2")}</p>
        </div>

        <div className="card direction">
          <h3><span>🧪</span> {t("about.history2Title")}</h3>
          <ul>
            <li>{t("about.history2List1")}</li>
            <li>{t("about.history2List2")}</li>
          </ul>
        </div>

        <div className="card products">
          <h3><span>🧴</span> {t("about.history4Title")}</h3>
          <p>{t("about.history4Text")}</p>
        </div>

        <div className="card substances">
          <h3><span>✅</span> {t("about.history5Title")}</h3>
          <p>{t("about.history5Text")}</p>
        </div>
      </div>
    </div>
  );
};

export default About; 