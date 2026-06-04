import { FiBookOpen } from "react-icons/fi";
import "./PublishedCoursesCard.css";

const PublishedCoursesCard = ({ count, note }) => {
  return (
    <div className="reportCard">
      <div className="reportCardHeader">
        <div className="reportCardIcon reportCardIconAccentPeach">
          <FiBookOpen size={18} />
        </div>
        <span className="reportCardLabel">Khóa học đã xuất bản</span>
      </div>
      <div className="reportCardValue">{count}</div>
      <div className="reportCardNote">{note}</div>
    </div>
  );
};

export default PublishedCoursesCard;
