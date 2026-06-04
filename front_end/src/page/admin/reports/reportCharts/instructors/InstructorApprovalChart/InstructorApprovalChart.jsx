import { Bar } from "react-chartjs-2";
import "../../chartConfig.js";
import "./InstructorApprovalChart.css";

const InstructorApprovalChart = () => {
  const data = {
    labels: ["Tháng 12", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Tỉ lệ duyệt",
        data: [62, 65, 63, 67, 69, 71],
        backgroundColor: "#3b82f6",
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
        max: 100,
        ticks: {
          color: "#8b7355",
          font: { size: 12, family: "system-ui" },
          callback: (value) => `${value}%`,
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
          <div className="chartCardLabel">TỈ LỆ PHÊ DUYỆT</div>
          <div className="chartCardTitle">Duyệt hồ sơ ứng tuyển giảng viên</div>
        </div>
        <div className="chartCardBadge chartCardBadgeBlue">71%</div>
      </div>
      <div className="chartContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default InstructorApprovalChart;
