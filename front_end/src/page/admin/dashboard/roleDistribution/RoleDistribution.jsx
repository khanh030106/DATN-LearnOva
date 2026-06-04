import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./RoleDistribution.css";

const roleData = [
  { name: "Học viên", value: 75, color: "#ffad19", amount: "18.7k" },
  { name: "Giảng viên", value: 15, color: "#e8be74", amount: "3.8k" },
  { name: "Admin", value: 10, color: "#1a2e6e", amount: "2.5k" },
];

const totalUsers = "25k+";

const chartLabels = roleData.map((item) => item.name);
const chartValues = roleData.map((item) => item.value);
const chartColors = roleData.map((item) => item.color);

const RoleDistribution = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const chartInstance = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: chartValues,
            backgroundColor: chartColors,
            borderColor: "#ffffff",
            borderWidth: 4,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        rotation: -90,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            padding: 12,
            backgroundColor: "#ffffff",
            titleColor: "#1b140c",
            bodyColor: "#1f2937",
            borderColor: "rgba(232, 190, 116, 0.45)",
            borderWidth: 1,
            cornerRadius: 6,
            callbacks: {
              label(context) {
                return `${context.label}: ${context.parsed}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <section className="roleDistributionCard" aria-label="Phân bổ vai trò">
      <div className="roleDistributionHeader">
        <h3 className="roleDistributionTitle">Phân bổ vai trò</h3>
        <p className="roleDistributionSubtitle">Chi tiết tỷ lệ người dùng</p>
      </div>

      <div className="roleDistributionChartWrap">
        <div className="roleDistributionChart">
          <canvas ref={canvasRef} />
        </div>

        <div className="roleDistributionCenterLabel" aria-hidden="true">
          <span className="roleDistributionCenterValue">{totalUsers}</span>
          <span className="roleDistributionCenterText">Tổng User</span>
        </div>
      </div>

      <div className="roleDistributionLegend">
        {roleData.map((item) => (
          <div key={item.name} className="roleDistributionLegendItem">
            <div
              className="roleDistributionLegendDot"
              style={{ backgroundColor: item.color }}
            />

            <div className="roleDistributionLegendContent">
              <p className="roleDistributionLegendName">{item.name}</p>
              <p className="roleDistributionLegendValue">
                {item.value}% · {item.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoleDistribution;
