import { Line } from "react-chartjs-2";
import "../../chartConfig.js";
import "./CourseSignupChart.css";

const CourseSignupChart = () => {
  const data = {
    labels: ["Tháng 12", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Đăng ký mới",
        data: [9800, 11300, 10750, 12100, 13700, 15500],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: "#2563eb",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: { displayColors: false, padding: 12, cornerRadius: 6 },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#8b7355",
          font: { size: 12, family: "system-ui" },
          callback: (value) => `${value / 1000}k`,
        },
        grid: { color: "rgba(232, 190, 116, 0.15)", drawBorder: false },
      },
      x: {
        ticks: { color: "#8b7355", font: { size: 12, family: "system-ui" } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="chartCard">
      <div className="chartCardHeader">
        <div>
          <div className="chartCardLabel">LƯỢNG ĐĂNG KÝ TỰ NHIÊN</div>
          <div className="chartCardTitle">Đăng nhập học mới hàng tháng</div>
        </div>
        <div className="chartCardBadge chartCardBadgeBlue">+28%</div>
      </div>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CourseSignupChart;
