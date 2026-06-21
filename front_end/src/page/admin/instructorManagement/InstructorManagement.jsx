import { useState } from "react";
import InstructorStatistics from "./statistics/InstructorStatistics";
import InstructorFilters from "./filters/InstructorFilters";
import InstructorTable from "./instructorTable/InstructorTable";
import "./InstructorManagement.css";

const InstructorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <section
      className="instructorManagementPage"
      aria-label="Instructor management"
    >
      <div className="instructorManagementContent">
        <InstructorStatistics />
        <InstructorFilters
          activeTab={statusFilter}
          searchTerm={searchTerm}
          onFilterChange={setStatusFilter}
          onSearchChange={setSearchTerm}
          onAddInstructor={() => setIsCreateOpen(true)}
        />
        <InstructorTable
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          isCreateOpen={isCreateOpen}
          onCreateClose={() => setIsCreateOpen(false)}
        />
      </div>
    </section>
  );
};

export default InstructorManagement;
