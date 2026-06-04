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
    title: "Tổng người dùng",
    value: "18,520",
    trend: "+ 12% so với tháng trước",
    trendTone: "success",
  },
  {
    id: "students",
    component: StudentsCard,
    title: "Học viên",
    value: "15,230",
    trend: "+ 10% so với tháng trước",
    trendTone: "success",
  },
  {
    id: "teachers",
    component: TeachersCard,
    title: "Giảng viên",
    value: "2,280",
    trend: "+ 8% so với tháng trước",
    trendTone: "info",
  },
  {
    id: "admins",
    component: AdminsCard,
    title: "Admin",
    value: "10",
    trend: "Không đổi",
    trendTone: "neutral",
  },
  {
    id: "locked-accounts",
    component: LockedAccountsCard,
    title: "Tài khoản bị khóa",
    value: "440",
    trend: "↓ 5% so với tháng trước",
    trendTone: "danger",
  },
];

const UserManagementStats = () => {
  return (
    <section className="userManagementStats" aria-label="Thống kê người dùng">
      {statisticsCards.map((card) => {
        const StatCard = card.component;

        return <StatCard key={card.id} {...card} />;
      })}
    </section>
  );
};

export default UserManagementStats;
