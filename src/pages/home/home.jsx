import { useTranslation } from "react-i18next";
import Video from "../../images/showcase.mp4";
import AboutVideo from "../../images/aboutvideo.mp4";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdHealthAndSafety } from "react-icons/md";
import { IoHeartHalfOutline } from "react-icons/io5";
import { FaPills } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import { TbUsers } from "react-icons/tb";
import { AiOutlineSafety } from "react-icons/ai";
import "./home.scss";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Showcase start */}
      <div className="showcase">
        <video src={Video} autoPlay loop muted />
        <div className="overlay"></div>
        <div className="showcase-content">
          <h1>{t("home.brand")}</h1>
          <h4>{t("home.slogan")}</h4>
          <p>{t("home.intro")}</p>
          <div className="showcase-btn">
            <div className="btn1">
              <Link to="/product">{t("home.products")}</Link>
              <FaArrowRight className="arrow" />
            </div>
            <div className="btn2">
              <Link to="/about">{t("home.about")}</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Showcase End */}

      {/* About Card Start */}
      <div className="about-card-big">
        <div className="about-card-text">
          <h1>{t("home.aboutTitle")}</h1>
          <p>{t("home.aboutText")}</p>
        </div>
        <div className="about-cards">
          <div className="about-card">
            <IoHeartHalfOutline className="i1" />
            <h1>{t("home.cardioTitle")}</h1>
            <p>{t("home.cardioText")}</p>
          </div>
          <div className="about-card">
            <FaPills className="i2" />
            <h1>{t("home.vitaminsTitle")}</h1>
            <p>{t("home.vitaminsText")}</p>
          </div>
          <div className="about-card">
            <MdHealthAndSafety className="i3" />
            <h1>{t("home.qualityTitle")}</h1>
            <p>{t("home.qualityText")}</p>
          </div>
        </div>
      </div>
      {/* About Card End */}

      {/* Company Start */}
      <div className="company">
        <div className="company-content">
          <div className="company-left">
            <video controls>
              <source src={AboutVideo} type="video/mp4" />
            </video>
          </div>
          <div className="company-right">
            <h1>{t("home.companyTitle")}</h1>
            <p>{t("home.companyText")}</p>

            <div className="company-cards">
              <div className="company-card">
                <div className="company-card-left">
                  <SlEnergy className="companyi" />
                </div>
                <div className="company-card-right">
                  <h1>{t("home.researchTitle")}</h1>
                  <p>{t("home.researchText")}</p>
                </div>
              </div>

              <div className="company-card">
                <div className="company-card-left">
                  <TbUsers className="companyi" />
                </div>
                <div className="company-card-right">
                  <h1>{t("home.teamTitle")}</h1>
                  <p>{t("home.teamText")}</p>
                </div>
              </div>

              <div className="company-card">
                <div className="company-card-left">
                  <AiOutlineSafety className="companyi" />
                </div>
                <div className="company-card-right">
                  <h1>{t("home.safetyTitle")}</h1>
                  <p>{t("home.safetyText")}</p>
                </div>
              </div>
            </div>

            <div className="company-btn">
              <Link to="/about">{t("home.learnMore")}</Link>
              <FaArrowRight className="arrow" />
            </div>
          </div>
        </div>
      </div>
      {/* Company End */}
    </>
  );
};

export default Home;
