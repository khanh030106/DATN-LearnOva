import "./UserRow.css";

const recentUsers = [
  {
    id: 1,
    name: "Michael Anderson",
    email: "michael@learnoa.com",
    role: "Student",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
  {
    id: 2,
    name: "Daniel Wilson",
    email: "daniel@learnoa.com",
    role: "Instructor",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: 3,
    name: "Sophia Johnson",
    email: "sophia@learnoa.com",
    role: "Student",
    avatar: "https://i.pravatar.cc/120?img=44",
  },
  {
    id: 4,
    name: "James Brown",
    email: "james@learnoa.com",
    role: "Admin",
    avatar: "https://i.pravatar.cc/120?img=56",
  },
];

const UserRowItem = ({ user }) => {
  return (
    <div className="userRowItem">
      <div className="userRowItemUser">
        <img className="userRowAvatar" src={user.avatar} alt={user.name} />

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

const UserRow = () => {
  return (
    <section className="userRowSection">
      <div className="userRowCard userRowRecentUsersCard">
        <div className="userRowCardHeader">
          <div>
            <h3 className="userRowCardTitle">Recent Users</h3>
            <p className="userRowCardSubtitle">
              List of users who have recently been active on the system
            </p>
          </div>

          <button type="button" className="userRowLinkButton">
            View All
          </button>
        </div>

        <div className="userRowTableHeader" aria-hidden="true">
          <span className="userRowTableHeaderName">User</span>
          <span className="userRowTableHeaderRole">Role</span>
        </div>

        <div className="userRowList">
          {recentUsers.map((user) => (
            <UserRowItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRow;
