import { Line } from "react-chartjs-2";
import "../../chartConfig.js";
import "./InstructorActivityChart.css";

const InstructorActivityChart = () => {
  const data = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5"],
    datasets: [
      {
        label: "Buổi tương tác",
        data: [520, 590, 610, 670, 715],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.12)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#10b981",
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
          <div className="chartCardLabel">TƯƠNG TÁC CỦA GIẢNG VIÊN</div>
          <div className="chartCardTitle">Buổi giải đáp thắc mắc trực tiếp</div>
        </div>
        <div className="chartCardBadge chartCardBadgeGreen">+22%</div>
      </div>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default InstructorActivityChart;
