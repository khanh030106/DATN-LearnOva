import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { adminNotifySuccess } from "../../../api/NotificationApi.js";
import { useAuth } from "../../../hook/UseAuth.jsx";
import {
  getUserProfileApi,
  updateUserProfileApi,
  uploadAvatarApi,
} from "../../../api/UserApi.js";
import { DEFAULT_PROFILE } from "../../users/profile/profileView/data/profileData";
import ProfileFormSection from "../../users/profile/profileView/sections/ProfileFormSection";
import "../../users/profile/profileView/ProfileView.css";
import "./AdminProfilePage.css";

const AdminProfilePage = () => {
  const { loading: authLoading, setCurrentUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileData, setProfileData] = useState(DEFAULT_PROFILE);
  const [pendingAvatarFile, setPendingAvatarFile] = useState(null);
  const avatarPreviewUrlRef = useRef(null);

  const clearAvatarPreviewUrl = () => {
    if (avatarPreviewUrlRef.current) {
      URL.revokeObjectURL(avatarPreviewUrlRef.current);
      avatarPreviewUrlRef.current = null;
    }
  };

  useEffect(() => () => clearAvatarPreviewUrl(), []);

  const validateProfile = () => {
    const newErrors = {};

    if (!profileData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!profileData.phone?.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{9,11}$/.test(profileData.phone)) {
      newErrors.phone = "Phone must be 9-11 digits";
    }

    if (!profileData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!profileData.gender) {
      newErrors.gender = "Gender is required";
    }

    return newErrors;
  };

  useEffect(() => {
    if (authLoading) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfileApi();
        clearAvatarPreviewUrl();
        setPendingAvatarFile(null);
        setProfileData({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar: data.avatar || "",
          coverImage: data.coverImage || "",
          dateOfBirth: data.dateOfBirth || "",
          gender: data.gender || "",
          status: data.status || "",
        });
      } catch (error) {
        console.error("Failed to load profile", error);
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [authLoading]);

  const handleInputChange = (field, value) => {
    setProfileData((current) => ({ ...current, [field]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    clearAvatarPreviewUrl();
    const previewUrl = URL.createObjectURL(file);
    avatarPreviewUrlRef.current = previewUrl;
    setPendingAvatarFile(file);
    setProfileData((prev) => ({
      ...prev,
      avatar: previewUrl,
    }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    const validationErrors = validateProfile();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      let uploadedAvatar = null;

      if (pendingAvatarFile) {
        const formData = new FormData();
        formData.append("file", pendingAvatarFile);
        const res = await uploadAvatarApi(formData);
        uploadedAvatar = res.avatar || res.url || res;
        clearAvatarPreviewUrl();
        setPendingAvatarFile(null);
      }

      const response = await updateUserProfileApi({
        fullName: profileData.fullName,
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
      });

      setProfileData((prev) => ({
        ...prev,
        ...response,
        avatar: uploadedAvatar || response.avatar || prev.avatar,
      }));

      setCurrentUser((prev) => ({
        ...prev,
        fullName: response.fullName ?? prev?.fullName,
        ...(uploadedAvatar ? { avatar: uploadedAvatar } : {}),
      }));

      setSaveSuccess(true);
      await adminNotifySuccess("Profile updated successfully!", { title: "Profile" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed!");
    }
  };

  return (
    <div className="profile-view admin-profile-view">
      <div className="profile-wrapper">
        <main className="profile-main">
          <div className="content-area">
            <ProfileFormSection
              profileData={profileData}
              saveSuccess={saveSuccess}
              onInputChange={handleInputChange}
              onSaveProfile={handleSaveProfile}
              onAvatarChange={handleAvatarChange}
              errors={errors}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfilePage;
