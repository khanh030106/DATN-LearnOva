import { Download, Search } from "lucide-react";
import { useState } from "react";
import "./InstructorFilters.css";

const filterTabs = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Hoạt động" },
  { id: "paused", label: "Tạm ngưng" },
  { id: "locked", label: "Bị khóa" },
];

const InstructorFilters = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="instructorFilters" aria-label="Bộ lọc giảng viên">
      <div className="instructorFiltersMain">
        <div className="instructorFiltersSearch">
          <Search size={18} />
          <input
            type="text"
            className="instructorFiltersInput"
            placeholder="Tìm theo tên giảng viên, email hoặc chuyên môn..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="instructorFiltersTabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`instructorFiltersTab ${activeTab === tab.id ? "instructorFiltersTab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorFilters;
