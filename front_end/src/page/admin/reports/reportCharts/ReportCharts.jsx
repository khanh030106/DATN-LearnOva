import { useState } from "react";
import DashboardTab from "./dashboard/DashboardTab.jsx";
import UsersTab from "./users/UsersTab.jsx";
import InstructorsTab from "./instructors/InstructorsTab.jsx";
import CoursesTab from "./courses/CoursesTab.jsx";
import LearningTab from "./learning/LearningTab.jsx";
import RevenueTab from "./revenue/RevenueTab.jsx";
import "./ReportCharts.css";

const tabs = [
  { id: "dashboard", label: "Bảng Tổng Hợp" },
  { id: "users", label: "Người Dùng" },
  { id: "instructors", label: "Giảng Viên" },
  { id: "courses", label: "Khóa Học" },
  { id: "learning", label: "Chi Số Học Tập" },
  { id: "revenue", label: "Doanh Thu & Voucher" },
];

const ReportCharts = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "users":
        return <UsersTab />;
      case "instructors":
        return <InstructorsTab />;
      case "courses":
        return <CoursesTab />;
      case "learning":
        return <LearningTab />;
      case "revenue":
        return <RevenueTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <section className="reportChartsSection">
      <div className="reportChartsHeader">
        <h2>CHI TIẾT TỪNG PHÂN TÍCH</h2>
      </div>

      <div className="reportChartsTabNav">
        <div className="tabNavContainer">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tabNavButton ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="reportChartsContent">{renderTabContent()}</div>
    </section>
  );
};

export default ReportCharts;
