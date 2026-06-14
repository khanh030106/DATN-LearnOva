import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./GrowthChart.css";

const growthChartYears = [
  { value: "2023-2024", label: "2023 - 2024" },
  { value: "2022-2023", label: "2022 - 2023" },
  { value: "2021-2022", label: "2021 - 2022" },
];

const growthChartSeries = [
  { month: "May", value: 4000 },
  { month: "June", value: 5500 },
  { month: "July", value: 4800 },
  { month: "August", value: 7200 },
  { month: "September", value: 9100 },
  { month: "October", value: 12400 },
];

const chartData = growthChartSeries.map((item) => item.value);

const chartLabels = growthChartSeries.map((item) => item.month);

const GrowthChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const chartInstance = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Users",
            data: chartData,
            backgroundColor: "#2563EB",
            hoverBackgroundColor: "#1D4ED8",
            borderRadius: 0,
            borderSkipped: false,
            barThickness: 80,
            maxBarThickness: 44,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
                return `${context.parsed.y.toLocaleString("en-US")} users`;
              },
            },
          },
        },
        layout: {
          padding: {
            top: 8,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#475569",
              font: {
                size: 12,
                weight: 600,
              },
            },
          },
          y: {
            beginAtZero: true,
            max: 14000,
            ticks: {
              stepSize: 3500,
              color: "#64748B",
              font: {
                size: 11,
                weight: 600,
              },
              callback(value) {
                return value === 0 ? "0" : `${value}`;
              },
            },
            grid: {
              color: "rgba(203, 213, 225, 0.6)",
              borderDash: [4, 4],
              drawBorder: false,
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
    <section className="growthChartCard" aria-label="User Growth Chart">
      <div className="growthChartCardHeader">
        <div className="growthChartCardTitleGroup">
          <h3 className="growthChartCardTitle">User Growth</h3>
        </div>

        <div className="growthChartCardFilter">
          <select
            id="growthChartYear"
            className="growthChartCardSelect"
            defaultValue={growthChartYears[0].value}
          >
            {growthChartYears.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="growthChartCardBody">
        <div className="growthChartChartArea">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </section>
  );
};

export default GrowthChart;
