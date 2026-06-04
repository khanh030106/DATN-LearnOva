import { Bar } from "react-chartjs-2";
import "../../chartConfig.js";
import "./ConversionChart.css";

const ConversionChart = () => {
  const data = {
    labels: ["Tháng 12", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Tỷ lệ chuyển đổi",
        data: [4, 5, 6, 7, 8, 10],
        backgroundColor: "#10b981",
        borderRadius: 4,
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
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14, weight: "600" },
        bodyFont: { size: 13 },
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.x}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 12,
        ticks: {
          font: { size: 12, family: "system-ui" },
          color: "#a89a85",
          callback: (value) => value + "%",
        },
        grid: {
          color: "rgba(232, 190, 116, 0.15)",
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          font: { size: 12, family: "system-ui" },
          color: "#8b7355",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="conversionChartCard">
      <div className="chartCardHeader">
        <div>
          <div className="chartCardLabel">CHỈ SỐ CHUYỂN ĐỔI</div>
          <div className="chartCardTitle">
            Ti lệ học viên ứng tuyển thành giảng viên (Student to Instructor
            Conversion Rate)
          </div>
        </div>
        <div className="chartCardBadge chartCardBadgeGreen">12%</div>
      </div>
      <div className="horizontalChartContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ConversionChart;
