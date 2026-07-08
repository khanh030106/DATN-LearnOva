import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getAdminVoucherUsageFrequencyApi } from "../../../../api/admin/VoucherApi.js";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import "./VoucherChart.css";

const activationSeries = {
  id: "activation",
  name: "Voucher Activations",
  borderColor: "#2563eb",
  pointBackgroundColor: "#2563eb",
  pointBorderColor: "#ffffff",
};

const formatMonthLabel = (month) => {
  const [year, monthNumber] = String(month || "").split("-");
  if (!year || !monthNumber) {
    return "";
  }

  return `M${Number(monthNumber)}/${year}`;
};

const buildVoucherChartData = (frequencyItems) => {
  return {
    labels: frequencyItems.map((item) => formatMonthLabel(item.month)),
    series: [
      {
        ...activationSeries,
        values: frequencyItems.map((item) => Number(item.activations || 0)),
      },
    ],
  };
};

const VoucherChart = ({ refreshKey }) => {
  const axiosPrivate = useAxiosPrivate();
  const canvasRef = useRef(null);
  const [frequencyItems, setFrequencyItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchVoucherUsageFrequency = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getAdminVoucherUsageFrequencyApi(axiosPrivate);
        if (mounted) {
          setFrequencyItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setFrequencyItems([]);
          setError(
            err?.response?.data?.message || "Failed to load voucher data."
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchVoucherUsageFrequency();

    return () => {
      mounted = false;
    };
  }, [axiosPrivate, refreshKey]);

  const voucherChartData = useMemo(
    () => buildVoucherChartData(frequencyItems),
    [frequencyItems]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const ctx = canvasRef.current.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, "rgba(37, 99, 235, 0.22)");
    gradient.addColorStop(1, "rgba(37, 99, 235, 0.04)");

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
                return `Uses: ${context.parsed.y}`;
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
              precision: 0,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [voucherChartData]);

  return (
    <section
      className="voucherChartSection"
      aria-label="Voucher usage frequency chart"
    >
      <div className="voucherChartHeader">
        <div>
          <h2 className="voucherChartTitle">Voucher Usage Frequency</h2>
          <p className="voucherChartSubtitle">
            Statistics of successful voucher code redemptions for course
            purchases.
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
        <canvas ref={canvasRef} aria-label="Voucher usage frequency chart" />
        {isLoading && (
          <div className="voucherChartStatus">Loading voucher data...</div>
        )}
        {!isLoading && error && (
          <div className="voucherChartStatus voucherChartStatusError">
            {error}
          </div>
        )}
        {!isLoading && !error && frequencyItems.length === 0 && (
          <div className="voucherChartStatus">
            No voucher usage data available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default VoucherChart;
