import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./VoucherCampaignChart.css";

const campaignData = [
  {
    code: "WELCOME2026",
    used: 812,
    revenue: 97440,
    label: "WELCOME2026",
  },
  {
    code: "LEARNOVA50",
    used: 234,
    revenue: 42120,
    label: "LEARNOVA50",
  },
  {
    code: "WEBDEV30",
    used: 142,
    revenue: 18460,
    label: "WEBDEV30",
  },
  {
    code: "FIX500FF",
    used: 89,
    revenue: 17800,
    label: "FIX500FF",
  },
];

const VoucherCampaignChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const labels = campaignData.map((item) => item.label);
    const dataValues = campaignData.map((item) => item.used);
    const ctx = canvasRef.current.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, "rgba(249, 115, 22, 0.9)");
    gradient.addColorStop(1, "rgba(249, 115, 22, 0.4)");

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Used",
            data: dataValues,
            backgroundColor: gradient,
            borderRadius: 999,
            barThickness: 16,
            maxBarThickness: 18,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            titleColor: "#ffffff",
            bodyColor: "#f8fafc",
            borderColor: "rgba(148, 163, 184, 0.18)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              title(context) {
                return context[0]?.label || "";
              },
              label(context) {
                const item = campaignData[context.dataIndex];
                return [
                  `Used: ${item.used} times`,
                  `Revenue: $${item.revenue.toLocaleString("vi-VN")}`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            display: false,
            stacked: true,
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#1f2937",
              font: {
                size: 13,
                weight: 700,
              },
              padding: 8,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  const totalRevenue = campaignData.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

  return (
    <section
      className="voucherCampaignChartSection"
      aria-label="Top voucher campaigns"
    >
      <div className="voucherCampaignChartHeader">
        <div>
          <h2 className="voucherCampaignChartTitle">Top Voucher Campaigns</h2>
          <p className="voucherCampaignChartSubtitle">
            Compare discount impact and total revenue generated.
          </p>
        </div>
      </div>

      <div className="voucherCampaignChartCanvasWrapper">
        <canvas ref={canvasRef} aria-label="Voucher campaign chart" />
      </div>

      <div className="voucherCampaignChartSummary">
        <span>Accumulated discount:</span>
        <strong>${totalRevenue.toLocaleString("vi-VN")} USD</strong>
      </div>
    </section>
  );
};

export default VoucherCampaignChart;
