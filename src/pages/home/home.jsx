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
import { useEffect, useRef } from "react";
import "./home.scss";

const Home = () => {
  const { t } = useTranslation();
  const aboutVideoRef = useRef(null);

  useEffect(() => {
    const el = aboutVideoRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.pause();
      return;
    }

    const handlePlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          const tryPlay = () => {
            el.play().finally(() => {
              window.removeEventListener("scroll", tryPlay);
              window.removeEventListener("touchstart", tryPlay);
              window.removeEventListener("click", tryPlay);
            });
          };
          window.addEventListener("scroll", tryPlay, { once: true });
          window.addEventListener("touchstart", tryPlay, { once: true });
          window.addEventListener("click", tryPlay, { once: true });
        });
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            handlePlay();
          } else {
            el.pause();
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleShowcaseCanPlay = (e) => {
    const v = e.currentTarget;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        const retry = () => {
          v.play().finally(() => {
            window.removeEventListener("scroll", retry);
            window.removeEventListener("touchstart", retry);
            window.removeEventListener("click", retry);
          });
        };
        window.addEventListener("scroll", retry, { once: true });
        window.addEventListener("touchstart", retry, { once: true });
        window.addEventListener("click", retry, { once: true });
      });
    }
  };

  return (
    <>
      <div className="showcase">
        <video
          className="showcase-video"
          src={Video}
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          onCanPlay={handleShowcaseCanPlay}
          onError={(e) => {
            e.currentTarget.closest('.showcase')?.classList.add('video-error');
          }}
        />
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

      <div className="company">
        <div className="company-content">
          <div className="company-left">
            <video
              ref={aboutVideoRef}
              muted
              playsInline
              preload="metadata"
              loop
            >
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
    </>
  );
};

export default Home;
