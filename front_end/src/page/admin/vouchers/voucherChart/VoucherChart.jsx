import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./VoucherChart.css";

const voucherChartData = {
  labels: [
    "M7/2025",
    "M8/2025",
    "M9/2025",
    "M10/2025",
    "M11/2025",
    "M12/2025",
    "M1/2026",
    "M2/2026",
    "M3/2026",
    "M4/2026",
    "M5/2026",
    "M6/2026",
  ],
  series: [
    {
      id: "activation",
      name: "Số lượt kích hoạt voucher",
      values: [12, 18, 17, 22, 28, 24, 30, 35, 37, 42, 47, 52],
      borderColor: "#f97316",
      pointBackgroundColor: "#f97316",
      pointBorderColor: "#ffffff",
    },
  ],
};

const VoucherChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const ctx = canvasRef.current.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, "rgba(249, 115, 22, 0.28)");
    gradient.addColorStop(1, "rgba(249, 115, 22, 0.04)");

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: voucherChartData.labels,
        datasets: voucherChartData.series.map((series) => ({
          label: series.name,
          data: series.values,
          borderColor: series.borderColor,
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: series.pointBackgroundColor,
          pointBorderColor: series.pointBorderColor,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverBorderColor: series.borderColor,
          pointBorderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(17, 24, 39, 0.92)",
            titleColor: "#f8fafc",
            bodyColor: "#f8fafc",
            borderColor: "rgba(148, 163, 184, 0.18)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              label(context) {
                return `Lượt: ${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 12,
                weight: 500,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(156, 163, 175, 0.18)",
              borderDash: [4, 4],
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 12,
                weight: 500,
              },
              stepSize: 10,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <section
      className="voucherChartSection"
      aria-label="Biểu đồ tần suất voucher"
    >
      <div className="voucherChartHeader">
        <div>
          <h2 className="voucherChartTitle">Tần suất sử dụng Voucher</h2>
          <p className="voucherChartSubtitle">
            Thống kê số lượng lượt nhập mã mua khóa học thành công.
          </p>
        </div>
        <div className="voucherChartLegend">
          {voucherChartData.series.map((series) => (
            <div key={series.id} className="voucherChartLegendItem">
              <span
                className="voucherChartLegendDot"
                style={{ backgroundColor: series.borderColor }}
              />
              <span>{series.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="voucherChartCanvasWrapper">
        <canvas ref={canvasRef} aria-label="Biểu đồ tần suất voucher" />
      </div>
    </section>
  );
};

export default VoucherChart;
