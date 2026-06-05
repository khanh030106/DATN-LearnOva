import { Download, Search } from "lucide-react";
import { useState } from "react";
import "./InstructorFilters.css";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "paused", label: "Paused" },
  { id: "locked", label: "Locked" },
];

const InstructorFilters = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="instructorFilters" aria-label="Instructor Filters">
      <div className="instructorFiltersMain">
        <div className="instructorFiltersSearch">
          <Search size={18} />
          <input
            type="text"
            className="instructorFiltersInput"
            placeholder="Search by instructor name, email, or expertise..."
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
