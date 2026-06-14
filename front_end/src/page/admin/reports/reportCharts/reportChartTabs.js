import CoursesTab from "./courses/CoursesTab.jsx";
import DashboardTab from "./dashboard/DashboardTab.jsx";
import InstructorsTab from "./instructors/InstructorsTab.jsx";
import LearningTab from "./learning/LearningTab.jsx";
import RevenueTab from "./revenue/RevenueTab.jsx";
import UsersTab from "./users/UsersTab.jsx";

export const reportChartTabs = [
  { id: "dashboard", label: "Summary", Component: DashboardTab },
  { id: "users", label: "Users", Component: UsersTab },
  { id: "instructors", label: "Instructors", Component: InstructorsTab },
  { id: "courses", label: "Courses", Component: CoursesTab },
  { id: "learning", label: "Learning Metrics", Component: LearningTab },
  { id: "revenue", label: "Revenue & Vouchers", Component: RevenueTab },
];
