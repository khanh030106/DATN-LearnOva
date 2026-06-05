import TotalUsersCard from "./cards/totalUsers/TotalUsersCard";
import StudentsCard from "./cards/students/StudentsCard";
import TeachersCard from "./cards/teachers/TeachersCard";
import AdminsCard from "./cards/admins/AdminsCard";
import LockedAccountsCard from "./cards/lockedAccounts/LockedAccountsCard";
import "./UserManagementStats.css";

const statisticsCards = [
  {
    id: "total-users",
    component: TotalUsersCard,
    title: "Total Users",
    value: "18,520",
    trend: "+ 12% vs last month",
    trendTone: "success",
  },
  {
    id: "students",
    component: StudentsCard,
    title: "Students",
    value: "15,230",
    trend: "+ 10% vs last month",
    trendTone: "success",
  },
  {
    id: "teachers",
    component: TeachersCard,
    title: "Instructors",
    value: "2,280",
    trend: "+ 8% vs last month",
    trendTone: "info",
  },
  {
    id: "admins",
    component: AdminsCard,
    title: "Admins",
    value: "10",
    trend: "No change",
    trendTone: "neutral",
  },
  {
    id: "locked-accounts",
    component: LockedAccountsCard,
    title: "Locked Accounts",
    value: "440",
    trend: "↓ 5% vs last month",
    trendTone: "danger",
  },
];

const UserManagementStats = () => {
  return (
    <section
      className="userManagementStats"
      aria-label="User Management Statistics"
    >
      {statisticsCards.map((card) => {
        const StatCard = card.component;

        return <StatCard key={card.id} {...card} />;
      })}
    </section>
  );
};

export default UserManagementStats;
