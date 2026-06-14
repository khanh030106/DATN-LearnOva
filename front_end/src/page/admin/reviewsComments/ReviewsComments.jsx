import { Eye, EyeOff, MessageSquareText, ShieldCheck, Star, Trash2, TriangleAlert } from "lucide-react";
import reviewsOverviewImage from "../../../assets/dashboard/reviews_comments.png";
import "../shared/AdminDataPage.css";
import "./ReviewsComments.css";

const stats = [
  { label: "Total Reviews", value: "1,284", note: "course rating records", icon: Star },
  { label: "Lesson Comments", value: "4,920", note: "student discussions", icon: MessageSquareText },
  { label: "Reported Items", value: "18", note: "need moderation review", icon: TriangleAlert },
  { label: "Hidden Items", value: "42", note: "not visible to learners", icon: EyeOff },
];

const moderationRows = [
  {
    id: "REV-1024",
    type: "Review",
    user: "Nguyễn Minh Anh",
    course: "React Frontend Foundation",
    content: "Clear lesson flow and practical project examples.",
    rating: "5",
    status: "Visible",
  },
  {
    id: "COM-8841",
    type: "Comment",
    user: "Trần Quốc Bảo",
    course: "Python for Beginners",
    content: "The video at lesson 6 needs updated captions.",
    rating: "-",
    status: "Reported",
  },
  {
    id: "REV-1025",
    type: "Review",
    user: "Lê Thanh Hà",
    course: "UI/UX Design Masterclass",
    content: "Good content, but some assignments are too short.",
    rating: "4",
    status: "Visible",
  },
  {
    id: "COM-8842",
    type: "Comment",
    user: "Phạm Duy Khang",
    course: "Digital Marketing Strategy",
    content: "Hidden by admin after duplicate spam reports.",
    rating: "-",
    status: "Hidden",
  },
];

const ReviewsComments = () => {
  return (
    <section className="adminDataPage" aria-label="Reviews and comments moderation">
      <div className="adminDataContent">
        <div className="reviewsCommentsHero">
          <div className="reviewsCommentsHeroImageWrap">
            <img
              className="reviewsCommentsHeroImage"
              src={reviewsOverviewImage}
              alt="Reviews and comments overview"
            />
          </div>

          <div className="reviewsCommentsHeroText">
            <h1>Reviews & Comments</h1>
            <p>Moderate course reviews, lesson comments and reported feedback.</p>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Keep learner discussions helpful and respectful
            </span>
          </div>
        </div>

        <div className="adminDataStats">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article className="adminDataStatCard" key={item.label}>
                <span className="adminDataStatIcon">
                  <Icon size={22} />
                </span>
                <div>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                  <small>{item.note}</small>
                </div>
              </article>
            );
          })}
        </div>

        <div className="adminDataFilters">
          <input type="search" placeholder="Search course, user, review, comment..." />
          <button type="button">All Courses</button>
          <button type="button">All Users</button>
          <button type="button">All Statuses</button>
        </div>

        <div className="adminDataTableCard">
          <table className="adminDataTable reviewsCommentsTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>User</th>
                <th>Course</th>
                <th>Content</th>
                <th>Stars</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {moderationRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.type}</td>
                  <td>{row.user}</td>
                  <td>
                    <span className="reviewsCommentsClamp">{row.course}</span>
                  </td>
                  <td>
                    <span className="reviewsCommentsClamp">{row.content}</span>
                  </td>
                  <td>{row.rating}</td>
                  <td>
                    <span className={`adminDataStatus adminDataStatus--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="adminDataActions">
                      <button type="button" className="adminDataIconButton" aria-label={`View ${row.id}`}>
                        <Eye size={16} />
                      </button>
                      <button type="button" className="adminDataIconButton" aria-label={`Hide ${row.id}`}>
                        <EyeOff size={16} />
                      </button>
                      <button type="button" className="adminDataIconButton" aria-label={`Delete ${row.id}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ReviewsComments;
