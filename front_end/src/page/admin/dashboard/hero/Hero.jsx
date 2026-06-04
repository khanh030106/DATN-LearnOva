import { Binary, Download, LayoutDashboard, Plus } from "lucide-react";
import dashboardHeroImage from "../../../../assets/dashboard/dashbraod.png";
import "./Hero.css";

const heroContent = {
  badgeLabel: "Active AI Engine",
  title: "Tổng quan",
  highlight: "LearnOva",
  description:
    "Theo dõi tổng thể hoạt động của người dùng, giảng viên và nền tảng trong thời gian thực. LearnOva cung cấp dữ liệu phân tích chuyên sâu.",
  heroImage: dashboardHeroImage,
};

const heroActions = [
  {
    id: "exportReport",
    label: "Xuất báo cáo",
    icon: Download,
    variant: "secondary",
  },
  {
    id: "createReport",
    label: "Tạo thống kê mới",
    icon: Plus,
    variant: "primary",
  },
];

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
            {heroContent.title} <br />
            <span>{heroContent.highlight}</span>
          </h2>

          <p className="adminHeroVideoDescription">{heroContent.description}</p>
        </div>

        <div className="adminHeroVideoActions">
          {heroActions.map((action) => {
            const ActionIcon = action.icon;

            return (
              <button
                key={action.id}
                type="button"
                className={`adminHeroVideoButton ${
                  action.variant === "primary"
                    ? "adminHeroVideoButtonPrimary"
                    : "adminHeroVideoButtonSecondary"
                }`}
              >
                <ActionIcon size={18} aria-hidden="true" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
