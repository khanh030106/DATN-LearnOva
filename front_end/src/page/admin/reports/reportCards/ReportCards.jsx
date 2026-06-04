import TotalUsersCard from "./totalUsers/TotalUsersCard.jsx";
import ActiveUsersCard from "./activeUsers/ActiveUsersCard.jsx";
import TotalTeachersCard from "./totalTeachers/TotalTeachersCard.jsx";
import PublishedCoursesCard from "./publishedCourses/PublishedCoursesCard.jsx";
import "./ReportCards.css";

const ReportCards = () => {
  const cards = [
    {
      id: "total-users",
      component: TotalUsersCard,
      count: "45,280",
      note: "Tăng 14.2% so với tháng trước",
    },
    {
      id: "active-users",
      component: ActiveUsersCard,
      count: "21,840",
      note: "Đang học trực tuyến ngay bây giờ",
    },
    {
      id: "total-teachers",
      component: TotalTeachersCard,
      count: "1,260",
      note: "Giảng viên chất lượng cao",
    },
    {
      id: "published-courses",
      component: PublishedCoursesCard,
      count: "320",
      note: "Khóa học mới ra mắt trong tháng",
    },
  ];

  return (
    <section className="reportCardsSection">
      <div className="reportCardsGrid">
        {cards.map(({ id, component: CardComponent, count, note }) => (
          <CardComponent key={id} count={count} note={note} />
        ))}
      </div>
    </section>
  );
};

export default ReportCards;
