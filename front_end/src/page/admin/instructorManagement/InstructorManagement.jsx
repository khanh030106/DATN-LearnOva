import InstructorStatistics from "./statistics/InstructorStatistics";
import InstructorFilters from "./filters/InstructorFilters";
import InstructorTable from "./instructorTable/InstructorTable";
import "./InstructorManagement.css";

const InstructorManagement = () => {
  return (
    <section
      className="instructorManagementPage"
      aria-label="Instructor management"
    >
      <div className="instructorManagementContent">
        <InstructorStatistics />
        <InstructorFilters />
        <InstructorTable />
      </div>
    </section>
  );
};

export default InstructorManagement;
