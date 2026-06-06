import UserManagementStats from "./statistics/UserManagementStats";
import InstructorApprovalAlert from "./instructor/InstructorApprovalAlert";
import UserManagementFilters from "./filters/UserManagementFilters";
import UsersList from "./usersList/UsersList";
import "./UserManagement.css";

const UserManagement = () => {
  return (
    <section className="userManagementPage" aria-label="User management">
      <div className="userManagementContent">
        {/* <InstructorApprovalAlert /> */}
        <UserManagementStats />
        <UserManagementFilters />
        <UsersList />
      </div>
    </section>
  );
};

export default UserManagement;
