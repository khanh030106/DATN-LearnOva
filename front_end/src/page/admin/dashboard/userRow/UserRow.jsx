import "./UserRow.css";

const recentUsers = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    email: "minhanh@learnoa.com",
    role: "Học viên",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
  {
    id: 2,
    name: "Trần Quốc Huy",
    email: "quochuy@learnoa.com",
    role: "Giảng viên",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: 3,
    name: "Phạm Gia Hân",
    email: "giahann@learnoa.com",
    role: "Học viên",
    avatar: "https://i.pravatar.cc/120?img=44",
  },
  {
    id: 4,
    name: "Lê Thanh Tùng",
    email: "thanhtung@learnoa.com",
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
            <h3 className="userRowCardTitle">Người dùng gần đây</h3>
            <p className="userRowCardSubtitle">
              Danh sách người dùng vừa hoạt động trên hệ thống
            </p>
          </div>

          <button type="button" className="userRowLinkButton">
            Xem tất cả
          </button>
        </div>

        <div className="userRowTableHeader" aria-hidden="true">
          <span className="userRowTableHeaderName">Người dùng</span>
          <span className="userRowTableHeaderRole">Vai trò</span>
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
