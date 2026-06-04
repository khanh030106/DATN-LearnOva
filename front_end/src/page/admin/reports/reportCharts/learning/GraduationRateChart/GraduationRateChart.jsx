import { Line } from "react-chartjs-2";
import "../../chartConfig.js";
import "./GraduationRateChart.css";

const GraduationRateChart = () => {
  const data = {
    labels: ["Tháng 12", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Hoàn thành",
        data: [58, 60, 62, 63, 65, 67],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        fill: true,
        tension: 0.38,
        pointRadius: 5,
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
        max: 80,
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
    <div className="learningChartCard">
      <div className="chartCardHeader">
        <div>
          <div className="chartCardLabel">KHẢO SÁT TỐT NGHIỆP</div>
          <div className="chartCardTitle">
            Biểu đồ tỉ lệ hoàn thành học phần trung bình (%)
          </div>
        </div>
        <div className="chartCardBadge chartCardBadgeOrange">67%</div>
      </div>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraduationRateChart;
