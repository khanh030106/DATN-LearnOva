import { useMemo, useState } from "react";
import { buildCourseDetail } from "./data/courseDetailData";
import CourseAbout from "./components/CourseAbout";
import CourseCurriculum from "./components/CourseCurriculum";
import CourseDetailHero from "./components/CourseDetailHero";
import CourseDetailSidebar from "./components/CourseDetailSidebar";
import CourseDetailTabs from "./components/CourseDetailTabs";
import CourseInstructor from "./components/CourseInstructor";
import CourseReviews from "./components/CourseReviews";

const CourseDetailSection = ({ course, onBack }) => {
  const [activeTab, setActiveTab] = useState("curriculum");
  const courseDetail = useMemo(() => buildCourseDetail(course), [course]);

  const renderTabContent = () => {
    if (activeTab === "about") {
      return <CourseAbout course={courseDetail} />;
    }

    if (activeTab === "instructor") {
      return <CourseInstructor instructor={courseDetail.instructor} />;
    }

    if (activeTab === "reviews") {
      return <CourseReviews course={courseDetail} />;
    }

    return <CourseCurriculum course={courseDetail} />;
  };

  return (
    <div className="learning-detail-page">
      <div className="learning-detail-main">
        <CourseDetailHero course={courseDetail} onBack={onBack} />
        <CourseDetailTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          reviews={courseDetail.reviews}
        />
        {renderTabContent()}
      </div>

      <CourseDetailSidebar course={courseDetail} />
    </div>
  );
};

export default CourseDetailSection;
