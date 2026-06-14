import { ShieldCheck } from "lucide-react";
import InstructorStatistics from "./statistics/InstructorStatistics";
import InstructorFilters from "./filters/InstructorFilters";
import InstructorTable from "./instructorTable/InstructorTable";
import instructorOverviewImage from "../../../assets/dashboard/instructor.png";
import "./InstructorManagement.css";

const InstructorManagement = () => {
  return (
    <section
      className="instructorManagementPage"
      aria-label="Instructor management"
    >
      <div className="instructorManagementContent">
        <div className="instructorManagementHero">
          <div className="instructorManagementHeroImageWrap">
            <img
              className="instructorManagementHeroImage"
              src={instructorOverviewImage}
              alt="Instructor management overview"
            />
          </div>

          <div className="instructorManagementHeroText">
            <h1>Instructors</h1>
            <p>Manage and review instructor accounts and their performance.</p>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Keep instructor quality visible and organized
            </span>
          </div>
        </div>

        <InstructorStatistics />
        <InstructorFilters />
        <InstructorTable />
      </div>
    </section>
  );
};

export default InstructorManagement;
