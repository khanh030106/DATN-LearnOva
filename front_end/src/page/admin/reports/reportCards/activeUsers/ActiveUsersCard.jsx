import { FiActivity } from "react-icons/fi";
import "./ActiveUsersCard.css";

const ActiveUsersCard = ({ count, note }) => {
  return (
    <div className="reportCard">
      <div className="reportCardHeader">
        <div className="reportCardIcon reportCardIconAccentBlue">
          <FiActivity size={18} />
        </div>
        <span className="reportCardLabel">Người dùng hoạt động</span>
      </div>
      <div className="reportCardValue">{count}</div>
      <div className="reportCardNote">{note}</div>
    </div>
  );
};

export default ActiveUsersCard;
