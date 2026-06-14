import "./TotalRevenueCard.css";

const TotalRevenueCard = ({ title, value, delta, subtitle, icon: Icon }) => {
  return (
    <article className="totalRevenueCard">
      <header className="totalRevenueCardHeader">
        <p className="totalRevenueCardTitle">{title}</p>
        {Icon && <Icon className="totalRevenueCardIcon" />}
      </header>

      <div className="totalRevenueCardBody">
        <p className="totalRevenueCardValue">{value}</p>
        <div className="totalRevenueCardMeta">
          <span className="revenueDelta positive">{delta}</span>
          <span className="totalRevenueCardSubtitle">{subtitle}</span>
        </div>
      </div>
    </article>
  );
};

export default TotalRevenueCard;
