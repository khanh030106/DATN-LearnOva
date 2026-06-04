import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./RevenueDonut.css";

const revenueDonutLabels = [
  "Khoá học mới",
  "Bán gói VIP",
  "Dịch vụ hỗ trợ",
  "Phụ phí khác",
];

const revenueDonutValues = [42, 28, 18, 12];
const revenueDonutColors = ["#b78e34", "#4f4f7d", "#9ca3af", "#e5d6ba"];

const RevenueDonut = () => {
  const donutRef = useRef(null);

  useEffect(() => {
    if (!donutRef.current) {
      return undefined;
    }

    const donutChart = new Chart(donutRef.current, {
      type: "doughnut",
      data: {
        labels: revenueDonutLabels,
        datasets: [
          {
            data: revenueDonutValues,
            backgroundColor: revenueDonutColors,
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: "#ffffff",
            titleColor: "#1f2937",
            bodyColor: "#1f2937",
            borderColor: "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              label(context) {
                const value = context.parsed;
                return `${context.label}: ${value}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      donutChart.destroy();
    };
  }, []);

  return (
    <section className="revenueDonutCard" aria-label="Cơ cấu nguồn doanh thu">
      <div className="revenueDonutHeader">
        <div>
          <h2 className="revenueDonutTitle">Cơ Cấu Nguồn Doanh Thu</h2>
          <p className="revenueDonutSubtitle">
            Phân bổ nguồn thu chi tiết theo từng danh mục đào tạo của nền tảng.
          </p>
        </div>
      </div>

      <div className="revenueDonutBody">
        <div className="revenueDonutChartWrapper">
          <canvas ref={donutRef} aria-label="Biểu đồ tròn cơ cấu doanh thu" />
          <div className="revenueDonutCenter">
            <div className="revenueDonutCenterValue">$2.5M</div>
            <div className="revenueDonutCenterLabel">TỔNG CƠ CẤU</div>
            <div className="revenueDonutCenterPercent">100% Thu nhập</div>
          </div>
        </div>

        <div className="revenueDonutLegend">
          {revenueDonutLabels.map((label, index) => (
            <div key={label} className="revenueDonutLegendItem">
              <span
                className="revenueDonutLegendDot"
                style={{ backgroundColor: revenueDonutColors[index] }}
              />
              <span className="revenueDonutLegendText">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RevenueDonut;
