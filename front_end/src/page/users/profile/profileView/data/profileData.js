import { ShieldCheck, Award, BookOpen, Flame, Star, User } from "lucide-react";

export const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
];

export const DEFAULT_PROFILE = {
  fullName: "Nguyễn Minh Anh",
  email: "minhanh.nguyen@gmail.com",
  phone: "090 123 4567",
  address: "Quận 1, TP. Hồ Chí Minh",
  bio: "Tôi là một nhà thiết kế đồ họa trẻ với niềm đam mê học hỏi về UI/UX và AI.",
  goal: "Lập trình viên Fullstack & thiết kế UI/UX",
  avatar: PRESET_AVATARS[0],
  streakDays: 15,
  studyHours: 42,
  points: 1250,
};

export const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    type: "course",
    text: 'Bắt đầu học chương 3 khóa "Thiết kế Đồ họa chuyên nghiệp"',
    date: "Hôm nay, 10:15",
  },
  {
    id: 2,
    type: "achievement",
    text: 'Nhận được huy hiệu "Học viên siêng năng" hạng Vàng',
    date: "Hôm qua, 18:30",
  },
  {
    id: 3,
    type: "quiz",
    text: "Hoàn thành bài trắc nghiệm chương 1 đạt điểm tối đa",
    date: "3 ngày trước",
  },
  {
    id: 4,
    type: "streak",
    text: "Đạt chuỗi streak học tập liên tục 15 ngày.",
    date: "4 ngày trước",
  },
  {
    id: 5,
    type: "login",
    text: "Đăng nhập vào hệ thống học trực tuyến LearnOva",
    date: "1 tuần trước",
  },
];

export const sidebarItems = [
  { id: "profile", label: "Hồ sơ cá nhân", icon: User },
  { id: "courses", label: "Khóa học của tôi", icon: BookOpen },
  { id: "favorites", label: "Khóa học yêu thích", icon: Star },
  { id: "security", label: "Bảo mật", icon: ShieldCheck },
];

export const DEFAULT_ENROLLED_COURSES = [
  {
    title: "React.js Từ Cơ Bản Đến Nâng Cao",
    instructor: "Nguyễn Văn A",
    progress: 65,
    lessonsDone: 32,
    lessonsTotal: 48,
    remaining: "Còn 5h 30m",
    rating: 4.8,
    reviews: "1.2k",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "JavaScript Nâng Cao Cho Lập Trình Viên",
    instructor: "Trần Hoàng B",
    progress: 40,
    lessonsDone: 16,
    lessonsTotal: 40,
    remaining: "Còn 3h 15m",
    rating: 4.7,
    reviews: "856",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Node.js & Express.js Xây Dựng Backend",
    instructor: "Lê Thanh C",
    progress: 20,
    lessonsDone: 8,
    lessonsTotal: 40,
    remaining: "Còn 6h 45m",
    rating: 4.9,
    reviews: "732",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "SQL Cơ Bản Đến Nâng Cao",
    instructor: "Phạm Minh D",
    progress: 10,
    lessonsDone: 4,
    lessonsTotal: 36,
    remaining: "Còn 4h 20m",
    rating: 4.6,
    reviews: "512",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=900",
  },
];

export const FAVORITE_COURSE_TABS = [
  { id: "all", label: "Tất cả" },
  { id: "purchased", label: "Đã mua" },
  { id: "unpurchased", label: "Chưa mua" },
];

export const FAVORITE_COURSE_STATUS = {
  purchased: "purchased",
  unpurchased: "unpurchased",
};

export const DEFAULT_UNPURCHASED_FAVORITE_COURSES = [
  {
    title: "UI/UX Design Thực Chiến Cho Sản Phẩm Số",
    instructor: "Đỗ Hà My",
    progress: 0,
    lessonsDone: 0,
    lessonsTotal: 42,
    remaining: "12h 10m",
    rating: 4.8,
    reviews: "964",
    purchaseStatus: FAVORITE_COURSE_STATUS.unpurchased,
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Python Data Analysis Cho Người Mới",
    instructor: "Vũ Quốc Huy",
    progress: 0,
    lessonsDone: 0,
    lessonsTotal: 38,
    remaining: "10h 45m",
    rating: 4.7,
    reviews: "688",
    purchaseStatus: FAVORITE_COURSE_STATUS.unpurchased,
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=900",
  },
];

export const mapFavoriteCourse = (
  course,
  purchaseStatus = FAVORITE_COURSE_STATUS.purchased,
) => ({
  ...course,
  purchaseStatus: course.purchaseStatus || purchaseStatus,
  progress: course.progress || 0,
  lessonsDone: course.lessonsDone || 0,
  lessonsTotal: course.lessonsTotal || 0,
  remaining: course.remaining || "Chưa bắt đầu",
  rating: course.rating || 4.8,
  reviews: course.reviews || "0",
});

export const buildFavoriteCourses = (favoriteCourses = []) => {
  const purchasedFavorites =
    favoriteCourses.length > 0 ? favoriteCourses : DEFAULT_ENROLLED_COURSES;

  return [
    ...purchasedFavorites.map((course) =>
      mapFavoriteCourse(course, FAVORITE_COURSE_STATUS.purchased),
    ),
    ...DEFAULT_UNPURCHASED_FAVORITE_COURSES.map((course) =>
      mapFavoriteCourse(course, FAVORITE_COURSE_STATUS.unpurchased),
    ),
  ];
};

export const buildAchievements = (profileData, purchasedCourses) => [
  {
    id: "stellar",
    title: "Học viên Ưu tú",
    description: "Học tập liên tục tích lũy hơn 30 giờ học đầy cảm hứng.",
    icon: Award,
    threshold: profileData.studyHours >= 30,
    detail: `${profileData.studyHours}/30 Giờ`,
  },
  {
    id: "streak",
    title: "Chiến binh Kỷ luật",
    description: "Đạt chuỗi streak học liên tục trên 10 ngày.",
    icon: Flame,
    threshold: profileData.streakDays >= 10,
    detail: `${profileData.streakDays}/10 Ngày`,
  },
  {
    id: "investor",
    title: "Nhà Kiến tạo Tương lai",
    description: "Đã đầu tư học tập và sở hữu ít nhất một khóa học chuyên môn.",
    icon: Star,
    threshold: purchasedCourses.length >= 1,
    detail: `${purchasedCourses.length}/1 Khóa`,
  },
  {
    id: "contributor",
    title: "Tự hào Chia sẻ",
    description: "Viết lời giới thiệu bản thân truyền cảm hứng trong hồ sơ.",
    icon: User,
    threshold: profileData.bio && profileData.bio.length > 20,
    detail: "Đã hoàn thành",
  },
];
