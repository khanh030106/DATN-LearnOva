import "./ActivityRow.css";

const activityLogs = [
  {
    id: 1,
    label: "Khóa học mới",
    title: "Đã thêm 2 khóa học vào hệ thống",
    time: "5 phút trước",
  },
  {
    id: 2,
    label: "Người dùng",
    title: "12 học viên mới đăng ký hôm nay",
    time: "30 phút trước",
  },
  {
    id: 3,
    label: "Doanh thu",
    title: "Cập nhật báo cáo doanh thu tháng hiện tại",
    time: "2 giờ trước",
  },
  {
    id: 4,
    label: "Hệ thống",
    title: "Đồng bộ dữ liệu thành công với máy chủ",
    time: "Hôm nay",
  },
];

const ActivityRow = () => {
  return (
    <section className="activityRowSection" aria-label="Hoạt động gần đây">
      <div className="activityRowCard">
        <div className="activityRowCardHeader">
          <div>
            <h3 className="activityRowCardTitle">Hoạt động gần đây</h3>
            <p className="activityRowCardSubtitle">
              Các thay đổi mới nhất trên hệ thống
            </p>
          </div>
        </div>

        <div className="activityRowList">
          {activityLogs.map((activity) => (
            <div key={activity.id} className="activityRowItem">
              <div className="activityRowDot" aria-hidden="true" />

              <div className="activityRowContent">
                <p className="activityRowLabel">{activity.label}</p>
                <p className="activityRowTitle">{activity.title}</p>
              </div>

              <span className="activityRowTime">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityRow;
