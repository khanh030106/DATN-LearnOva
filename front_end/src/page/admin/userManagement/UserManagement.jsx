import { ShieldCheck } from "lucide-react";
import UserManagementStats from "./statistics/UserManagementStats";
import InstructorApprovalAlert from "./instructor/InstructorApprovalAlert";
import UserManagementFilters from "./filters/UserManagementFilters";
import UsersList from "./usersList/UsersList";
import usersOverviewImage from "../../../assets/dashboard/users.png";
import "./UserManagement.css";

const UserManagement = () => {
  return (
    <section className="userManagementPage" aria-label="User management">
      <div className="userManagementContent">
        <div className="userManagementHero">
          <div className="userManagementHeroImageWrap">
            <img
              className="userManagementHeroImage"
              src={usersOverviewImage}
              alt="User management overview"
            />
          </div>

          <div className="userManagementHeroText">
            <h1>User Management</h1>
            <p>Manage students, instructors and admin accounts</p>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Keep your learning community safe and organized
            </span>
          </div>
        </div>

        {/* <InstructorApprovalAlert /> */}
        <UserManagementStats />
        <UserManagementFilters />
        <UsersList />
      </div>
    </section>
  );
};

export default UserManagement;
