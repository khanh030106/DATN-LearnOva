import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./GrowthChart.css";

const growthChartYears = [
  { value: "2023-2024", label: "2023 - 2024" },
  { value: "2022-2023", label: "2022 - 2023" },
  { value: "2021-2022", label: "2021 - 2022" },
];

const growthChartSeries = [
  { month: "Tháng 5", value: 4000 },
  { month: "Tháng 6", value: 5500 },
  { month: "Tháng 7", value: 4800 },
  { month: "Tháng 8", value: 7200 },
  { month: "Tháng 9", value: 9100 },
  { month: "Tháng 10", value: 12400 },
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
            label: "Người dùng",
            data: chartData,
            backgroundColor: "rgba(255, 171, 25, 0.95)",
            hoverBackgroundColor: "rgba(242, 181, 45, 1)",
            borderRadius: 6,
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
            backgroundColor: "#ffffff",
            titleColor: "#1b140c",
            bodyColor: "#1f2937",
            borderColor: "rgba(232, 190, 116, 0.45)",
            borderWidth: 1,
            cornerRadius: 6,
            callbacks: {
              label(context) {
                return `${context.parsed.y.toLocaleString("vi-VN")} người dùng`;
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
              color: "#7a6b52",
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
              color: "#9ca3af",
              font: {
                size: 11,
                weight: 600,
              },
              callback(value) {
                return value === 0 ? "0" : `${value}`;
              },
            },
            grid: {
              color: "rgba(232, 190, 116, 0.24)",
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
    <section className="growthChartCard" aria-label="Tăng trưởng người dùng">
      <div className="growthChartCardHeader">
        <div className="growthChartCardTitleGroup">
          <div className="growthChartCardBadge">Phân tích dữ liệu</div>
          <h3 className="growthChartCardTitle">Tăng trưởng người dùng</h3>
          <p className="growthChartCardSubtitle">
            Dữ liệu theo 6 tháng gần nhất
          </p>
        </div>

        <div className="growthChartCardFilter">
          <label
            className="growthChartCardFilterLabel"
            htmlFor="growthChartYear"
          >
            Chu kỳ
          </label>

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
