import "./TopTeacherRevenue.css";

const topTeachers = [
  {
    rank: 1,
    initials: "H",
    name: "Dr. Lê Hoàng",
    courses: 8,
    students: "16,400",
    revenue: "$385,000",
  },
  {
    rank: 2,
    initials: "S",
    name: "Nguyễn Văn Sơn",
    courses: 12,
    students: "14,200",
    revenue: "$312,000",
  },
  {
    rank: 3,
    initials: "T",
    name: "ThS. Đỗ Thị Thu",
    courses: 6,
    students: "11,800",
    revenue: "$245,000",
  },
  {
    rank: 4,
    initials: "M",
    name: "Trần Thế Minh",
    courses: 5,
    students: "9,400",
    revenue: "$189,000",
  },
  {
    rank: 5,
    initials: "N",
    name: "Phạm Thành Nam",
    courses: 7,
    students: "8,100",
    revenue: "$164,000",
  },
];

const TopTeacherRevenue = () => {
  return (
    <section
      className="topRevenueBlockCard"
      aria-label="Đối tác giảng viên thu nhập xuất sắc"
    >
      <div className="topRevenueBlockHeader">
        <div>
          <h2 className="topRevenueBlockTitle">
            Đối Tác Giảng Viên Thu Nhập Xuất Sắc
          </h2>
          <p className="topRevenueBlockSubtitle">
            Top 5 giảng viên có tổng thu nhập lớn nhất thực lĩnh qua nền tảng.
          </p>
        </div>
        <span className="topRevenueBlockBadge">Tổng hợp</span>
      </div>

      <div className="topRevenueBlockTableWrapper">
        <table className="topRevenueBlockTable topTeacherTable">
          <thead>
            <tr>
              <th>HẠNG</th>
              <th>GIẢNG VIÊN</th>
              <th>KHÓA HỌC</th>
              <th>TỔNG HỌC VIÊN</th>
              <th>DOANH THU THU VỀ</th>
            </tr>
          </thead>
          <tbody>
            {topTeachers.map((teacher) => (
              <tr key={teacher.rank}>
                <td>
                  <span className="topRevenueBlockRank">{teacher.rank}</span>
                </td>
                <td>
                  <div className="topTeacherCell">
                    <span className="topTeacherName">{teacher.name}</span>
                  </div>
                </td>
                <td>{teacher.courses}</td>
                <td>{teacher.students}</td>
                <td className="topTeacherRevenue">{teacher.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopTeacherRevenue;
