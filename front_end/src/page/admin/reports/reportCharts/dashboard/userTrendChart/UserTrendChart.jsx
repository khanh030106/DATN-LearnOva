import { Line } from "react-chartjs-2";
import "../../chartConfig.js";
import "./UserTrendChart.css";

const UserTrendChart = () => {
  const data = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Users",
        data: [3000, 4000, 3500, 4500, 5000, 5500],
        borderColor: "#ff8c00",
        backgroundColor: "rgba(255, 140, 0, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#ff8c00",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
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
          callback: (value) => (value / 1000).toFixed(1) + "k Users",
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
    <div className="userTrendChartCard">
      <div className="chartCardHeader">
        <div>
          <div className="chartCardLabel">USER GROWTH TREND</div>
          <div className="chartCardTitle">Monthly New Registration Trend</div>
        </div>
        <div className="chartCardBadge">Users</div>
      </div>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default UserTrendChart;
