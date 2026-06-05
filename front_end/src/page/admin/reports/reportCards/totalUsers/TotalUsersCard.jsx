import { FiUsers } from "react-icons/fi";
import "./TotalUsersCard.css";

const TotalUsersCard = ({ count, note }) => {
  return (
    <div className="reportCard">
      <div className="reportCardHeader">
        <div className="reportCardIcon reportCardIconAccent">
          <FiUsers size={18} />
        </div>
        <span className="reportCardLabel">Total Users</span>
      </div>
      <div className="reportCardValue">{count}</div>
      <div className="reportCardNote">{note}</div>
    </div>
  );
};

export default TotalUsersCard;
