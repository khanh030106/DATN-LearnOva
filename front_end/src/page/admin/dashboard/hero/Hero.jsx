import { Binary, Download, LayoutDashboard, Plus } from "lucide-react";
import dashboardHeroImage from "../../../../assets/dashboard/dashbraod.png";
import "./Hero.css";

const heroContent = {
  badgeLabel: "Active AI Engine",
  title: "Overview",
  highlight: "LearnOva",
  description:
    "Track the overall activities of users, instructors, and the platform in real time. LearnOva provides comprehensive data and advanced analytical insights.",
  heroImage: dashboardHeroImage,
};

const HeroVideo = () => {
  return (
    <section className="adminHeroVideo">
      <div className="adminHeroVideoBackground" aria-hidden="true">
        <img
          className="adminHeroVideoMedia"
          src={heroContent.heroImage}
          alt=""
        />

        <div className="adminHeroVideoOverlay adminHeroVideoOverlayPrimary" />
        <div className="adminHeroVideoOverlay adminHeroVideoOverlaySoft" />
      </div>

      <div className="adminHeroVideoContent">
        <div className="adminHeroVideoText">
          <div className="adminHeroVideoBadgeRow">
            <div className="adminHeroVideoIconBox">
              <LayoutDashboard size={24} aria-hidden="true" />
            </div>

            <span className="adminHeroVideoDivider" aria-hidden="true" />

            <div className="adminHeroVideoBadge">
              <Binary
                size={12}
                className="adminHeroVideoBadgeIcon"
                aria-hidden="true"
              />
              <span className="adminHeroVideoBadgeText">
                {heroContent.badgeLabel}
              </span>
            </div>
          </div>

          <h2 className="adminHeroVideoTitle">
            {heroContent.highlight} <br />
            <span>{heroContent.title}</span>
          </h2>

          <p className="adminHeroVideoDescription">{heroContent.description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
