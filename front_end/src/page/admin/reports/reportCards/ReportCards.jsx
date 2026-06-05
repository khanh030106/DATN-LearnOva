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
      note: "Up 14.2% from last month",
    },
    {
      id: "active-users",
      component: ActiveUsersCard,
      count: "21,840",
      note: "Currently online learners",
    },
    {
      id: "total-teachers",
      component: TotalTeachersCard,
      count: "1,260",
      note: "Top quality instructors",
    },
    {
      id: "published-courses",
      component: PublishedCoursesCard,
      count: "320",
      note: "New courses released this month",
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
