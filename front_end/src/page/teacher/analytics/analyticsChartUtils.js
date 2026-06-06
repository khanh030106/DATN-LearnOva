export const buildAnalyticsChartPoints = (values) =>
  values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 720;
      const y = 230 - (value / 100) * 220;
      return `${x},${y}`;
    })
    .join(" ");
