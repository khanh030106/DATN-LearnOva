import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./RoleDistribution.css";

const roleData = [
  {
    name: "Students",
    value: 75,
    color: "#2563EB",
    amount: "18.7k",
  },
  {
    name: "Instructors",
    value: 15,
    color: "#93C5FD",
    amount: "3.8k",
  },
  {
    name: "Administrators",
    value: 10,
    color: "#1D4ED8",
    amount: "2.5k",
  },
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
            borderColor: "#F8FAFC",
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
            backgroundColor: "#FFFFFF",
            titleColor: "#0F172A",
            bodyColor: "#475569",
            borderColor: "#CBD5E1",
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
    <section className="roleDistributionCard" aria-label="Role Distribution">
      <div className="roleDistributionHeader">
        <h3 className="roleDistributionTitle">Role Distribution</h3>
      </div>

      <div className="roleDistributionChartWrap">
        <div className="roleDistributionChart">
          <canvas ref={canvasRef} />
        </div>

        <div className="roleDistributionCenterLabel" aria-hidden="true">
          <span className="roleDistributionCenterValue">{totalUsers}</span>
          <span className="roleDistributionCenterText">Total Users</span>
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
