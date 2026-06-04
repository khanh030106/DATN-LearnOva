import "./TopCourseRevenue.css";

const topCourses = [
  {
    rank: 1,
    title: "Khóa học AI toàn diện: Từ Zero đến LLM...",
    teacher: "Dr. Lê Hoàng",
    students: "4,250 đăng ký",
    revenue: "$127,500",
    tag: "HOT",
  },
  {
    rank: 2,
    title: "Lập trình web Full-Stack với Next.js, Node.js &...",
    teacher: "Nguyễn Văn Sơn",
    students: "3,820 đăng ký",
    revenue: "$114,600",
  },
  {
    rank: 3,
    title: "Chuyên gia Phân tích dữ liệu kinh doanh với...",
    teacher: "ThS. Đỗ Thị Thu",
    students: "2,910 đăng ký",
    revenue: "$87,300",
  },
  {
    rank: 4,
    title: "UI/UX Design Masterclass: Thiết kế chuẩn Grid...",
    teacher: "Trần Thế Minh",
    students: "2,450 đăng ký",
    revenue: "$73,500",
  },
  {
    rank: 5,
    title: "Khởi nghiệp và Vận hành doanh nghiệp SME...",
    teacher: "Phạm Thành Nam",
    students: "1,980 đăng ký",
    revenue: "$59,400",
  },
];

const TopCourseRevenue = () => {
  return (
    <section
      className="topRevenueBlockCard"
      aria-label="Khóa học doanh thu số 1"
    >
      <div className="topRevenueBlockHeader">
        <div>
          <h2 className="topRevenueBlockTitle">Khóa Học Doanh Thu Số 1</h2>
          <p className="topRevenueBlockSubtitle">
            Danh sách khóa học bán chạy nhất tính theo tổng số đăng ký học viên.
          </p>
        </div>
        <span className="topRevenueBlockBadge">Hàng tháng</span>
      </div>

      <div className="topRevenueBlockTableWrapper">
        <table className="topRevenueBlockTable">
          <thead>
            <tr>
              <th>HẠNG</th>
              <th>KHÓA HỌC</th>
              <th>HỌC VIÊN</th>
              <th>DOANH THU</th>
            </tr>
          </thead>
          <tbody>
            {topCourses.map((course) => (
              <tr key={course.rank}>
                <td>
                  <span className="topRevenueBlockRank">{course.rank}</span>
                </td>
                <td>
                  <div className="topRevenueBlockCourseInfo">
                    <span className="topRevenueBlockCourseName">
                      {course.title}
                    </span>
                    <span className="topRevenueBlockCourseMeta">
                      Giảng dạy bởi: {course.teacher}
                    </span>
                  </div>
                </td>
                <td>{course.students}</td>
                <td>
                  <div className="topRevenueBlockRevenueCell">
                    <span>{course.revenue}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopCourseRevenue;
