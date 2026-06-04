import { Line } from "react-chartjs-2";
import "../../chartConfig.js";
import "./InstructorGrowthChart.css";

const InstructorGrowthChart = () => {
  const data = {
    labels: ["Tháng 12", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Giảng viên mới",
        data: [92, 105, 110, 118, 125, 134],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.12)",
        fill: true,
        tension: 0.45,
        pointRadius: 4,
        pointBackgroundColor: "#f59e0b",
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
          <div className="chartCardLabel">QUY MÔ GIẢNG VIÊN</div>
          <div className="chartCardTitle">
            Tốc độ tăng trưởng giảng viên mới
          </div>
        </div>
        <div className="chartCardBadge chartCardBadgeOrange">+16%</div>
      </div>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default InstructorGrowthChart;
