import { FiUsers } from "react-icons/fi";
import "./TotalUsersCard.css";

const TotalUsersCard = ({ count, note }) => {
  return (
    <div className="reportCard">
      <div className="reportCardHeader">
        <div className="reportCardIcon reportCardIconAccent">
          <FiUsers size={18} />
        </div>
        <span className="reportCardLabel">Tổng người dùng</span>
      </div>
      <div className="reportCardValue">{count}</div>
      <div className="reportCardNote">{note}</div>
    </div>
  );
};

export default TotalUsersCard;
