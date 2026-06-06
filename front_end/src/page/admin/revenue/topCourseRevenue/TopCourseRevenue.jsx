import "./TopCourseRevenue.css";

const topCourses = [
  {
    rank: 1,
    title: "Comprehensive AI Course: From Zero to LLM...",
    teacher: "Dr. Lê Hoàng",
    students: "4,250 enrollments",
    revenue: "$127,500",
    tag: "HOT",
  },
  {
    rank: 2,
    title: "Full-Stack Web Development with Next.js, Node.js &...",
    teacher: "Nguyễn Văn Sơn",
    students: "3,820 enrollments",
    revenue: "$114,600",
  },
  {
    rank: 3,
    title: "Business Data Analytics Expert with...",
    teacher: "ThS. Đỗ Thị Thu",
    students: "2,910 enrollments",
    revenue: "$87,300",
  },
  {
    rank: 4,
    title: "UI/UX Design Masterclass: Grid-Based Design...",
    teacher: "Trần Thế Minh",
    students: "2,450 enrollments",
    revenue: "$73,500",
  },
  {
    rank: 5,
    title: "Startup and SME Business Operations...",
    teacher: "Phạm Thành Nam",
    students: "1,980 enrollments",
    revenue: "$59,400",
  },
];

const TopCourseRevenue = () => {
  return (
    <section className="topRevenueBlockCard" aria-label="Top revenue courses">
      <div className="topRevenueBlockHeader">
        <div>
          <h2 className="topRevenueBlockTitle">Top Revenue Courses</h2>
          <p className="topRevenueBlockSubtitle">
            Best-selling courses ranked by total student enrollments.
          </p>
        </div>
        <span className="topRevenueBlockBadge">Monthly</span>
      </div>

      <div className="topRevenueBlockTableWrapper">
        <table className="topRevenueBlockTable">
          <thead>
            <tr>
              <th>RANK</th>
              <th>COURSE</th>
              <th>STUDENTS</th>
              <th>REVENUE</th>
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
                      Taught by: {course.teacher}
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
