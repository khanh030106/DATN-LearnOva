import { Bar } from "react-chartjs-2";
import "../../chartConfig.js";
import "./CourseProgressChart.css";

const CourseProgressChart = () => {
  const data = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Courses",
        data: [150, 200, 180, 220, 250, 280],
        backgroundColor: "#4f46e5",
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
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 12, family: "system-ui" },
          color: "#a89a85",
          callback: (value) => value + " Courses",
        },
        grid: {
          color: "rgba(232, 190, 116, 0.15)",
          drawBorder: false,
        },
      },
      x: {
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
    <div className="courseProgressChartCard">
      <div className="chartCardHeader">
        <div>
          <div className="chartCardLabel">COURSE GROWTH VOLUME</div>
          <div className="chartCardTitle">New Course Release Trend</div>
        </div>
        <div className="chartCardBadge chartCardBadgeBlue">Courses</div>
      </div>
      <div className="chartContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CourseProgressChart;
