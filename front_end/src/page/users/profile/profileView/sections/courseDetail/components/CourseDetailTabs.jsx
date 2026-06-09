import { BookOpen, Info, Star, Users } from "lucide-react";
import { COURSE_DETAIL_TABS } from "../data/courseDetailData";

const tabIcons = {
  curriculum: BookOpen,
  about: Info,
  instructor: Users,
  reviews: Star,
};

const CourseDetailTabs = ({ activeTab, onChangeTab, reviews }) => (
  <div className="learning-detail-tabs">
    {COURSE_DETAIL_TABS.map((tab) => {
      const Icon = tabIcons[tab.id];
      const label = tab.id === "reviews" ? `${tab.label} (${reviews})` : tab.label;

      return (
        <button
          key={tab.id}
          className={activeTab === tab.id ? "active" : ""}
          type="button"
          onClick={() => onChangeTab(tab.id)}
        >
          <Icon size={18} />
          {label}
        </button>
      );
    })}
  </div>
);

export default CourseDetailTabs;
