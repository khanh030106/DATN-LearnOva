import { useState } from "react";
import InstructorStatistics from "./statistics/InstructorStatistics";
import InstructorFilters from "./filters/InstructorFilters";
import InstructorTable from "./instructorTable/InstructorTable";
import "./InstructorManagement.css";

const InstructorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
          onAddInstructor={() => setIsCreateOpen(true)}
        />
        <InstructorTable
          searchTerm={searchTerm}
          isCreateOpen={isCreateOpen}
          onCreateClose={() => setIsCreateOpen(false)}
        />
      </div>
    </section>
  );
};

export default InstructorManagement;
