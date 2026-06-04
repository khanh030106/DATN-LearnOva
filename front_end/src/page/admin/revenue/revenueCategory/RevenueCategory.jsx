import "./RevenueCategory.css";

const categories = [
  {
    label: "Programming (Lập trình)",
    percent: 35,
    amount: "$857,500",
    color: "#daa520",
  },
  {
    label: "AI & Data Science (Trí tuệ nhân tạo)",
    percent: 25,
    amount: "$612,500",
    color: "#2f4f4f",
  },
  {
    label: "Business (Kinh doanh & Khởi nghiệp)",
    percent: 15,
    amount: "$367,500",
    color: "#4b5563",
  },
  {
    label: "Design & UX/UI (Thiết kế đồ họa)",
    percent: 10,
    amount: "$245,000",
    color: "#9ca3af",
  },
  {
    label: "Subscriptions (Thành viên)",
    percent: 9,
    amount: "$220,500",
    color: "#b8860b",
  },
  {
    label: "Certificates (Chứng chỉ chuyên môn)",
    percent: 6,
    amount: "$147,000",
    color: "#f3e5ab",
  },
];

const RevenueCategory = () => {
  return (
    <section
      className="revenueCategoryCard"
      aria-label="Chỉ số doanh thu danh mục"
    >
      <div className="revenueCategoryHeader">
        <h3>Chỉ số Doanh thu Danh mục</h3>
        <span className="revenueCategoryBadge">Tỷ trọng %</span>
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
