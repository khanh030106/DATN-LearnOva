import { useEffect, useMemo, useState } from "react";
import { buildCourseDetail } from "./data/courseDetailData";

import CourseAbout from "./components/CourseAbout";
import CourseCurriculum from "./components/CourseCurriculum";
import CourseDetailHero from "./components/CourseDetailHero";
import CourseDetailSidebar from "./components/CourseDetailSidebar";
import CourseDetailTabs from "./components/CourseDetailTabs";
import CourseInstructor from "./components/CourseInstructor";
import CourseReviews from "./components/CourseReviews";

import {
  getCourseCurriculumApi,
  getCourseReviewsApi,
} from "../../../../../../api/EnrollmentApi.js";

import { useAuth } from "../../../../../../hook/UseAuth.jsx";
import { useAxiosPrivate } from "../../../../../../hook/UseAxiosPrivate.js";




const CourseDetailSection = ({ course, onBack, reloadCourses }) => {
  const [activeTab, setActiveTab] = useState("curriculum");
  const axiosPrivate = useAxiosPrivate();
  const { accessToken } = useAuth();

  const [curriculum, setCurriculum] = useState(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState(true);
  const courseDetail = useMemo(() => buildCourseDetail(course), [course]);


  const [reviewsData, setReviewsData] = useState(null);

  const renderTabContent = () => {
    if (activeTab === "about") {
      return <CourseAbout course={curriculum} />;
    }

    if (activeTab === "instructor") {
      return <CourseInstructor instructor={courseDetail.instructor} />;
    }

    if (activeTab === "reviews") {
      return <CourseReviews
          course={courseDetail}
          reviewsData={reviewsData}
      />;
    }

    if (loadingCurriculum) {
      return <p>Loading curriculum...</p>;
    }

    if (!curriculum) {
      return <p>No curriculum found.</p>;
    }

    return <CourseCurriculum course={curriculum} />;
  };
  useEffect(() => {
    if (!course?.courseId) return;

    const fetchCurriculum = async () => {
      try {
        setLoadingCurriculum(true);

        const data = await getCourseCurriculumApi(
            axiosPrivate,
            course.courseId,
            accessToken
        );

        setCurriculum(data);
        console.log("Curriculum API:", data);
      } catch (err) {
        console.error("Failed to load curriculum", err);
      } finally {
        setLoadingCurriculum(false);
      }
    };

    fetchCurriculum();
  },
      [course, axiosPrivate, accessToken]);
  useEffect(() => {
    if (!course?.courseId) return;

    const fetchReviews = async () => {
      try {
        const data = await getCourseReviewsApi(
            axiosPrivate,
            course.courseId,
            accessToken
        );

        console.log("Reviews:", data);

        setReviewsData(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchReviews();
  }, [course, axiosPrivate, accessToken]);

  return (
    <div className="learning-detail-page">
      <div className="learning-detail-main">
        <CourseDetailHero
            course={{
              ...courseDetail,
              categories: curriculum?.categories ?? []
            }}
            onBack={onBack}
        />
        <CourseDetailTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          reviews={courseDetail.reviews}
        />
        {renderTabContent()}
      </div>

      <CourseDetailSidebar
          course={{
            ...course,
            duration: curriculum?.duration,
            updatedAt: curriculum?.updatedAt,
            lessonsTotal: curriculum?.lessonsTotal,
            categories: curriculum?.categories,
            description: curriculum?.description,
            whatYouLearn: curriculum?.whatYouLearn,
          }}
          reloadCourses={reloadCourses}
      />
    </div>
  );
};

export default CourseDetailSection;
