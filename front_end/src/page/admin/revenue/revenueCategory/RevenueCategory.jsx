import "./RevenueCategory.css";

const categories = [
  {
    label: "Programming",
    percent: 35,
    amount: "$857,500",
    color: "#daa520",
  },
  {
    label: "AI & Data Science",
    percent: 25,
    amount: "$612,500",
    color: "#2f4f4f",
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
    color: "#9ca3af",
  },
  {
    label: "Subscriptions",
    percent: 9,
    amount: "$220,500",
    color: "#b8860b",
  },
  {
    label: "Professional Certificates",
    percent: 6,
    amount: "$147,000",
    color: "#f3e5ab",
  },
];

const RevenueCategory = () => {
  return (
    <section
      className="revenueCategoryCard"
      aria-label="Revenue Category Metrics"
    >
      <div className="revenueCategoryHeader">
        <h3>Revenue Category Metrics</h3>
        <span className="revenueCategoryBadge">Percentage Share</span>
      </div>

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
    </section>
  );
};

export default RevenueCategory;
