import courseOne from "../../../../assets/course/course-1.jpg";
import courseTwo from "../../../../assets/course/course-2.jpg";
import courseThree from "../../../../assets/course/course-3.jpg";

export const homeMenuItems = [
  { id: "featured", label: "Featured Courses", labelKey: "featured_course", path: "/learnova/courses?sort=featured" },
  { id: "new", label: "New Courses", labelKey: "new_courses", path: "/learnova/courses?sort=new" },
  { id: "popular", label: "Popular Courses", labelKey: "popular_courses", path: "/learnova/courses?sort=popular" },
  { id: "trending", label: "Trending Courses", labelKey: "trending_courses", path: "/learnova/courses?sort=trending" },
];

export const courseCategories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "AI & Machine Learning",
  "DevOps",
  "Cyber Security",
  "Business",
  "Marketing",
];

export const levelFilters = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export const priceFilters = ["Free", "Paid", "Discount"];

export const durationFilters = [
  "Under 2 Hours",
  "2-10 Hours",
  "10-20 Hours",
  "20+ Hours",
];

export const ratingFilters = ["4 Stars+", "4.5 Stars+", "5 Stars"];

export const myLearningItems = [
  { id: "continue", label: "Continue Learning", labelKey: "continue_learning", path: "/learnova/user/profile/courses" },
  { id: "courses", label: "My Courses", labelKey: "my_courses", path: "/learnova/user/profile/courses" },
  { id: "completed", label: "Completed Courses", labelKey: "completed_courses", path: "/learnova/user/profile/courses" },
  { id: "certificates", label: "Certificates", labelKey: "certificates", path: "/learnova/user/profile/courses" },
  { id: "wishlist", label: "Wishlist", labelKey: "wishlist", path: "/learnova/user/profile/favorites" },
];

export const instructorItems = [
  { id: "all", label: "All Instructors", labelKey: "all_instructors", path: "/learnova/intructors" },
  { id: "top", label: "Top Rated Instructors", labelKey: "top_rated_instructors", path: "/learnova/intructors?filter=top-rated" },
  { id: "new", label: "New Instructors", labelKey: "new_instructors", path: "/learnova/intructors?filter=new" },
  { id: "become", label: "Become Instructor", labelKey: "become_instructor", path: "/learnova/teacher" },
];

export const subscriptionPlans = [
  { id: "monthly", name: "Monthly Plan", price: 19, period: "month" },
  { id: "quarterly", name: "Quarterly Plan", price: 49, period: "quarter" },
  { id: "yearly", name: "Yearly Plan", price: 149, period: "year" },
  { id: "premium", name: "Premium Membership", price: 249, period: "year" },
];

export const searchSuggestions = [
  { id: "react", type: "Course", label: "React JS Masterclass", labelKey: "react_masterclass" },
  { id: "node", type: "Course", label: "NodeJS API", labelKey: "node_api" },
  { id: "uiux", type: "Category", label: "UI UX Design", labelKey: "uiux_design" },
  { id: "java", type: "Course", label: "Java Programming", labelKey: "java_programming" },
  { id: "ai", type: "Category", label: "AI & Machine Learning", labelKey: "ai_ml" },
  { id: "mentor", type: "Instructor", label: "Top React Instructor", labelKey: "top_react_instructor" },
];

export const cartItems = [
  {
    id: "react-pro",
    name: "React JS Masterclass",
    price: 39,
    image: courseOne,
  },
  {
    id: "node-api",
    name: "NodeJS API Development",
    price: 29,
    image: courseTwo,
  },
  {
    id: "uiux",
    name: "UI UX Design Essentials",
    price: 24,
    image: courseThree,
  },
];

export const notificationItems = [
  { id: "course", title: "New Course Available", description: "AI workflow course is ready.", unread: true },
  { id: "discount", title: "Discount 50%", description: "Your wishlist courses are on sale.", unread: true },
  { id: "reply", title: "Instructor Replied", description: "A mentor answered your question.", unread: true },
];

export const userData = {
  name: "Learnova Student",
  avatar: "https://i.pravatar.cc/96?img=32",
};

export const userMenuItems = [
  { id: "profile", label: "My Profile", path: "/learnova/user/profile" },
  { id: "courses", label: "My Courses", path: "/learnova/user/profile/courses" },
  { id: "favorites", label: "Favorite Courses", path: "/learnova/user/profile/favorites" },
  { id: "security", label: "Security", path: "/learnova/user/profile/security" },
  { id: "logout", label: "Logout", path: "/learnova/auth/login", danger: true },
];
