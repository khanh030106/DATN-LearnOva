import "./RevenueCategory.css";

const categories = [
  {
    label: "Programming",
    percent: 35,
    amount: "$857,500",
    color: "#1f2937",
  },
  {
    label: "chat-bot & Data Science",
    percent: 25,
    amount: "$612,500",
    color: "#334155",
  },
  {
    label: "Business & Entrepreneurship",
    percent: 15,
    amount: "$367,500",
    color: "#4b5563",
  },
  {
    label: "Design & UX/UI",
    percent: 10,
    amount: "$245,000",
    color: "#6b7280",
  },
  {
    label: "Subscriptions",
    percent: 9,
    amount: "$220,500",
    color: "#94a3b8",
  },
  {
    label: "Professional Certificates",
    percent: 6,
    amount: "$147,000",
    color: "#cbd5e1",
  },
];

const RevenueCategory = () => {
  return (
    <section
      className="revenueCategorySection"
      aria-label="Revenue Category Metrics"
    >
      <div className="revenueCategoryHeader">
        <h3>Revenue Category Metrics</h3>
        <span className="revenueCategoryBadge">Percentage Share</span>
      </div>

      <div className="revenueCategoryCard">
        <div className="revenueCategoryList">
          {categories.map((item) => (
            <div key={item.label} className="revenueCategoryItem">
              <div className="revenueCategoryLabel">
                <span>{item.label}</span>
                <strong>{item.percent}%</strong>
              </div>

              <div className="revenueCategoryAmount">({item.amount})</div>

              <div className="revenueCategoryBarWrapper">
                <div
                  className="revenueCategoryBar"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RevenueCategory;
