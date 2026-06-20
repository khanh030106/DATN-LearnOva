import { useState } from "react";

import UserManagementStats from "./statistics/UserManagementStats";
import InstructorApprovalAlert from "./instructor/InstructorApprovalAlert";
import UserManagementFilters from "./filters/UserManagementFilters";
import UsersList from "./usersList/UsersList";
import AddUserModal from "./filters/AddUserModal";
import "./UserManagement.css";


const UserManagement = () => {

  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleCreateUser = (userData) => {

    console.log("New User:", userData);
    setShowAddUserModal(false);

  };
  return (

    <section
      className="userManagementPage"
      aria-label="User management"
    >


      <div className="userManagementContent">
        <UserManagementStats />
        <UserManagementFilters
          onAddUser={() => setShowAddUserModal(true)}
        />
        <UsersList />
        <AddUserModal

          isOpen={showAddUserModal}

          onClose={() => setShowAddUserModal(false)}

          onSubmit={handleCreateUser}

        />
      </div>
    </section>
  );
};


export default UserManagement;
