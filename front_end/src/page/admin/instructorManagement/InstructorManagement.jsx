import { useState } from "react";
import InstructorStatistics from "./statistics/InstructorStatistics";
import InstructorFilters from "./filters/InstructorFilters";
import InstructorTable from "./instructorTable/InstructorTable";
import "./InstructorManagement.css";

const InstructorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section
      className="instructorManagementPage"
      aria-label="Instructor management"
    >
      <div className="instructorManagementContent">
        <InstructorStatistics />
        <InstructorFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <InstructorTable searchTerm={searchTerm} />
      </div>
    </section>
  );
};

export default InstructorManagement;
