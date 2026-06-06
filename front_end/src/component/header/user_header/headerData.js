import courseOne from "../../../assets/course/course-1.jpg";
import courseTwo from "../../../assets/course/course-2.jpg";
import courseThree from "../../../assets/course/course-3.jpg";

export const homeMenuItems = [
  { id: "featured", label: "Featured Courses", path: "/learnova/courses?sort=featured" },
  { id: "new", label: "New Courses", path: "/learnova/courses?sort=new" },
  { id: "popular", label: "Popular Courses", path: "/learnova/courses?sort=popular" },
  { id: "trending", label: "Trending Courses", path: "/learnova/courses?sort=trending" },
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
  { id: "continue", label: "Continue Learning", path: "/learnova/my-learning/continue" },
  { id: "courses", label: "My Courses", path: "/learnova/my-learning/courses" },
  { id: "completed", label: "Completed Courses", path: "/learnova/my-learning/completed" },
  { id: "certificates", label: "Certificates", path: "/learnova/my-learning/certificates" },
  { id: "wishlist", label: "Wishlist", path: "/learnova/my-learning/wishlist" },
];

export const instructorItems = [
  { id: "all", label: "All Instructors", path: "/learnova/instructors" },
  { id: "top", label: "Top Rated Instructors", path: "/learnova/instructors?filter=top-rated" },
  { id: "new", label: "New Instructors", path: "/learnova/instructors?filter=new" },
  { id: "become", label: "Become Instructor", path: "/learnova/teacher" },
];

export const subscriptionPlans = [
  { id: "monthly", name: "Monthly Plan", price: 19, period: "month" },
  { id: "quarterly", name: "Quarterly Plan", price: 49, period: "quarter" },
  { id: "yearly", name: "Yearly Plan", price: 149, period: "year" },
  { id: "premium", name: "Premium Membership", price: 249, period: "year" },
];

export const searchSuggestions = [
  { id: "react", type: "Course", label: "React JS Masterclass" },
  { id: "node", type: "Course", label: "NodeJS API" },
  { id: "uiux", type: "Category", label: "UI UX Design" },
  { id: "java", type: "Course", label: "Java Programming" },
  { id: "ai", type: "Category", label: "AI & Machine Learning" },
  { id: "mentor", type: "Instructor", label: "Top React Instructor" },
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
  { id: "profile", label: "My Profile", path: "/learnova/profile" },
  { id: "settings", label: "Account Settings", path: "/learnova/account/settings" },
  { id: "certificates", label: "My Certificates", path: "/learnova/my-learning/certificates" },
  { id: "history", label: "Purchase History", path: "/learnova/purchase-history" },
  { id: "logout", label: "Logout", path: "/learnova/auth/login", danger: true },
];
