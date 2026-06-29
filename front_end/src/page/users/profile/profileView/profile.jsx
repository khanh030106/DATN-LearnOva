import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ProfileView.css";
import AvatarModal from "./components/AvatarModal";
import {
  buildAchievements,
  DEFAULT_ACTIVITIES,
  DEFAULT_PROFILE,
} from "./data/profileData";
import { useAuth } from "../../../../hook/UseAuth.jsx";
import { getWishlistApi } from "../../../../api/WishlistApi.js";
import { toast } from "../../../../util/toast.js";
import AchievementsSection from "./sections/AchievementsSection.jsx";
import ActivitiesSection from "./sections/ActivitiesSection.jsx";
import CoursesSection from "./sections/CoursesSection";
import LearningCourseDetailSection from "./sections/courseDetail/CourseDetailSection";
import FavoriteCourseDetailSection from "./sections/favoriteCourseDetail/FavoriteCourseDetailSection";
import FavoritesSection from "./sections/FavoritesSection";
import SecuritySection from "./sections/SecuritySection";
import ProfileFormSection from "./sections/ProfileFormSection";

const readStorage = (key, fallback) => {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;

  try {
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
};

const ProfileView = ({
  purchasedCourses = [],
  onStartCourse,
  onBack,
  initialTab = "profile",
}) => {
  const activeTab = initialTab;
  const [profileData, setProfileData] = useState(() =>
    readStorage("learnova_user_profile", DEFAULT_PROFILE),
  );
  const [activities, setActivities] = useState(() =>
    readStorage("learnova_user_activities", DEFAULT_ACTIVITIES),
  );
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newLogText, setNewLogText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const hasMountedRef = useRef(false);
  const { currentUser, loading: authLoading } = useAuth();

  const achievements = useMemo(
    () => buildAchievements(profileData, purchasedCourses),
    [profileData, purchasedCourses],
  );

  const scrollToPageTop = (behavior = "smooth") => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior });
    });
  };

  useEffect(() => {
    scrollToPageTop("auto");
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    scrollToPageTop();
  }, [activeTab, selectedCourse]);

  useEffect(() => {
    const loadFavoriteCourses = async () => {
      if (!currentUser || authLoading) return;
      setFavoritesLoading(true);

      try {
        const courses = await getWishlistApi();
        setFavoriteCourses(
          courses.map((course) => ({
            ...course,
            image:
              course.thumbnailUrl ||
              "https://via.placeholder.com/400x225?text=Course+Cover",
          })),
        );
      } catch (error) {
        console.error("Failed to load favorite courses", error);
        toast.error("Unable to load wishlist courses.");
      } finally {
        setFavoritesLoading(false);
      }
    };

    loadFavoriteCourses();
  }, [currentUser, authLoading]);

  const saveProfile = (nextProfile) => {
    localStorage.setItem("learnova_user_profile", JSON.stringify(nextProfile));
    setProfileData(nextProfile);
  };

  const handleInputChange = (field, value) => {
    setProfileData((current) => ({ ...current, [field]: value }));
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    localStorage.setItem("learnova_user_profile", JSON.stringify(profileData));

    const nextActivity = {
      id: Date.now(),
      type: "system",
      text: "Updated personal account settings",
      date: "Just now",
    };
    const nextActivities = [nextActivity, ...activities];
    setActivities(nextActivities);
    localStorage.setItem(
      "learnova_user_activities",
      JSON.stringify(nextActivities),
    );

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSelectAvatar = (url) => {
    saveProfile({ ...profileData, avatar: url });
    setShowAvatarModal(false);
  };

  const handleCustomAvatarSubmit = (event) => {
    event.preventDefault();
    if (!customAvatarUrl.trim()) return;

    handleSelectAvatar(customAvatarUrl.trim());
    setCustomAvatarUrl("");
  };

  const handleAddCustomActivity = (event) => {
    event.preventDefault();
    if (!newLogText.trim()) return;

    const nextActivity = {
      id: Date.now(),
      type: "custom",
      text: newLogText.trim(),
      date: "Just now",
    };
    const nextActivities = [nextActivity, ...activities];
    setActivities(nextActivities);
    localStorage.setItem(
      "learnova_user_activities",
      JSON.stringify(nextActivities),
    );
    setNewLogText("");
  };

  const handleClearActivities = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your entire activity history?",
      )
    )
      return;

    setActivities([]);
    localStorage.removeItem("learnova_user_activities");
  };

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    scrollToPageTop();
  };

  const handleCloseCourseDetail = () => {
    setSelectedCourse(null);
    scrollToPageTop();
  };

  const renderContent = () => {
    if (activeTab === "courses") {
      if (selectedCourse) {
        return (
          <LearningCourseDetailSection
            course={selectedCourse}
            onBack={handleCloseCourseDetail}
          />
        );
      }

      return (
        <CoursesSection
          purchasedCourses={purchasedCourses}
          onStartCourse={onStartCourse}
          onOpenCourse={handleOpenCourse}
          onBack={onBack}
        />
      );
    }

    if (activeTab === "favorites") {
      if (selectedCourse) {
        return (
          <FavoriteCourseDetailSection
            course={selectedCourse}
            onBack={handleCloseCourseDetail}
          />
        );
      }

      return (
        <FavoritesSection
          favoriteCourses={favoriteCourses}
          achievements={achievements}
          points={profileData.points}
          onBack={onBack}
        />
      );
    }

    if (activeTab === "activities") {
      return (
        <ActivitiesSection
          activities={activities}
          newLogText={newLogText}
          setNewLogText={setNewLogText}
          onAddCustomActivity={handleAddCustomActivity}
          onClearActivities={handleClearActivities}
        />
      );
    }

    return (
      <ProfileFormSection
        profileData={profileData}
        saveSuccess={saveSuccess}
        onInputChange={handleInputChange}
        onSaveProfile={handleSaveProfile}
        onOpenAvatarModal={() => setShowAvatarModal(true)}
      />
    );
  };

  return (
    <div className="profile-view">
      {showAvatarModal && (
        <AvatarModal
          profileData={profileData}
          customAvatarUrl={customAvatarUrl}
          setCustomAvatarUrl={setCustomAvatarUrl}
          onClose={() => setShowAvatarModal(false)}
          onSelectAvatar={handleSelectAvatar}
          onCustomAvatarSubmit={handleCustomAvatarSubmit}
        />
      )}

      <div className="profile-wrapper">
        <main className="profile-main">
          <div className="content-area">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default ProfileView;
