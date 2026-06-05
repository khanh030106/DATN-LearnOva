import { FiAward } from "react-icons/fi";
import "./TotalTeachersCard.css";

const TotalTeachersCard = ({ count, note }) => {
  return (
    <div className="reportCard">
      <div className="reportCardHeader">
        <div className="reportCardIcon reportCardIconAccentGold">
          <FiAward size={18} />
        </div>
        <span className="reportCardLabel">Instructors</span>
      </div>
      <div className="reportCardValue">{count}</div>
      <div className="reportCardNote">{note}</div>
    </div>
  );
};

export default TotalTeachersCard;
