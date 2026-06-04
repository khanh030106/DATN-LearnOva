import { Bar } from "react-chartjs-2";
import "../../chartConfig.js";
import "./CourseLaunchChart.css";

const CourseLaunchChart = () => {
  const data = {
    labels: ["Tháng 12", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Khóa học mới",
        data: [180, 210, 195, 235, 260, 285],
        backgroundColor: "#f59e0b",
        borderRadius: 8,
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
        ticks: { color: "#8b7355", font: { size: 12, family: "system-ui" } },
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
          <div className="chartCardLabel">GIA TĂNG THƯ VIỆN</div>
          <div className="chartCardTitle">Khóa học khởi tạo theo tháng</div>
        </div>
        <div className="chartCardBadge chartCardBadgeOrange">+18%</div>
      </div>
      <div className="chartContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CourseLaunchChart;
