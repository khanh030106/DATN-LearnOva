import "./TopTeacherRevenue.css";

const topTeachers = [
  {
    rank: 1,
    initials: "H",
    name: "Dr. Lê Hoàng",
    courses: 8,
    students: "16,400",
    revenue: "$385,000",
    avgRevenue: "$48,125",
    share: "21%",
  },
  {
    rank: 2,
    initials: "S",
    name: "Nguyễn Văn Sơn",
    courses: 12,
    students: "14,200",
    revenue: "$312,000",
    avgRevenue: "$26,000",
    share: "17%",
  },
  {
    rank: 3,
    initials: "T",
    name: "ThS. Đỗ Thị Thu",
    courses: 6,
    students: "11,800",
    revenue: "$245,000",
    avgRevenue: "$40,833",
    share: "13%",
  },
  {
    rank: 4,
    initials: "M",
    name: "Trần Thế Minh",
    courses: 5,
    students: "9,400",
    revenue: "$189,000",
    avgRevenue: "$37,800",
    share: "10%",
  },
  {
    rank: 5,
    initials: "N",
    name: "Phạm Thành Nam",
    courses: 7,
    students: "8,100",
    revenue: "$164,000",
    avgRevenue: "$23,429",
    share: "9%",
  },
];

const TopTeacherRevenue = () => {
  return (
    <section
      className="topRevenueBlockSection topTeacherRevenueCard"
      aria-label="Top earning instructor partners"
    >
      <div className="topRevenueBlockHeader">
        <div>
          <h2 className="topRevenueBlockTitle">
            Top Earning Instructor Partners
          </h2>
          <p className="topRevenueBlockSubtitle">
            Top 5 instructors with the highest platform payout earnings.
          </p>
        </div>
        <span className="topRevenueBlockBadge">Summary</span>
      </div>

      <div className="topRevenueBlockCard">
        <div className="topRevenueBlockTableWrapper">
          <table className="topRevenueBlockTable topTeacherTable">
            <thead>
              <tr>
                <th>RANK</th>
                <th>INSTRUCTOR</th>
                <th>COURSES</th>
                <th>TOTAL STUDENTS</th>
                <th>REVENUE EARNED</th>
                <th>AVG / COURSE</th>
                <th>SHARE</th>
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
                  <td>{teacher.avgRevenue}</td>
                  <td>{teacher.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TopTeacherRevenue;
