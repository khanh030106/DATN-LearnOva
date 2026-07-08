import "./UserRow.css";

const UserRowItem = ({ user }) => {
  return (
    <div className="userRowItem">
      <div className="userRowItemUser">

        <div className="userRowItemMeta">
          <p className="userRowItemName">{user.name}</p>
          <p className="userRowItemEmail">{user.email}</p>
        </div>
      </div>

      <div className="userRowItemRoleWrap">
        <span className="userRowItemRole">{user.role}</span>
      </div>
    </div>
  );
};

const UserRow = ({ users = [] }) => {
  return (
    <section className="userRowSection">
      <div className="userRowCard userRowRecentUsersCard">
        <div className="userRowCardHeader">
          <div>
            <h3 className="userRowCardTitle">Recent Users</h3>
          </div>
        </div>

        <div className="userRowTableHeader" aria-hidden="true">
          <span className="userRowTableHeaderName">User</span>
          <span className="userRowTableHeaderRole">Role</span>
        </div>

        <div className="userRowList">
          {users.length === 0 && <p className="userRowEmpty">No recent users yet.</p>}
          {users.map((user) => (
            <UserRowItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRow;
