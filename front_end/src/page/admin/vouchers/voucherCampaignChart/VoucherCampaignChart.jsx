import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getAdminVoucherUsageHistoriesApi } from "../../../../api/admin/VoucherApi.js";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import "./VoucherCampaignChart.css";

/**
 * Transforms raw usage history into campaign stats
 * Groups by voucher code and aggregates usage count and revenue
 * @param {Array} histories - Raw history records from API
 * @returns {Array} Aggregated campaign stats sorted by usage
 */
const aggregateCampaignStats = (histories = []) => {
  const campaignMap = new Map();

  histories.forEach((record) => {
    const code = record.appliedCode || "Unknown";
    if (!campaignMap.has(code)) {
      campaignMap.set(code, {
        code,
        usedCount: 0,
        revenue: 0,
      });
    }

    const stats = campaignMap.get(code);
    stats.usedCount += 1;
    stats.revenue += Number(record.discount || 0);
  });

  // Convert to array, sort by usage (highest first), take top 4
  return Array.from(campaignMap.values())
    .sort((a, b) => b.usedCount - a.usedCount)
    .slice(0, 4);
};

/**
 * Maps campaign stats to chart data format
 * @param {Object} item - Campaign stats item
 * @returns {Object} Chart-ready data
 */
const mapCampaignFromStats = (item) => ({
  code: item.code || "Unknown",
  used: Number(item.usedCount || 0),
  revenue: Number(item.revenue || 0),
  label: item.code || "Unknown",
});

const VoucherCampaignChart = ({ refreshKey }) => {
  const axiosPrivate = useAxiosPrivate();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [campaignData, setCampaignData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch and aggregate campaign data from API
  useEffect(() => {
    let mounted = true;

    const fetchCampaignData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const histories = await getAdminVoucherUsageHistoriesApi(axiosPrivate);

        if (mounted) {
          const aggregated = aggregateCampaignStats(histories);
          const mapped = aggregated.map(mapCampaignFromStats);
          setCampaignData(mapped);
        }
      } catch (err) {
        if (mounted) {
          setCampaignData([]);
          setError(
            err?.response?.data?.message || "Failed to load campaign data."
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchCampaignData();

    return () => {
      mounted = false;
    };
  }, [axiosPrivate, refreshKey]);

  // Create chart
  useEffect(() => {
    if (!canvasRef.current || campaignData.length === 0) {
      return undefined;
    }

    // Destroy previous chart if exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = campaignData.map((item) => item.label);
    const dataValues = campaignData.map((item) => item.used);
    const ctx = canvasRef.current.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, "rgba(37, 99, 235, 0.95)");
    gradient.addColorStop(1, "rgba(96, 165, 250, 0.45)");

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
                  `Revenue: $${item.revenue.toLocaleString("en-US")}`,
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

    chartRef.current = chart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [campaignData]);

  const totalRevenue = campaignData.reduce(
    (sum, item) => sum + item.revenue,
    0
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
        {isLoading && (
          <div className="voucherCampaignChartStatus">
            Loading campaign data...
          </div>
        )}
        {!isLoading && error && (
          <div className="voucherCampaignChartStatus voucherCampaignChartStatusError">
            {error}
          </div>
        )}
        {!isLoading && !error && campaignData.length === 0 && (
          <div className="voucherCampaignChartStatus">
            No campaign data available yet.
          </div>
        )}
      </div>

      <div className="voucherCampaignChartSummary">
        <span>Accumulated discount:</span>
        <strong>${totalRevenue.toLocaleString("en-US")} USD</strong>
      </div>
    </section>
  );
};

export default VoucherCampaignChart;
