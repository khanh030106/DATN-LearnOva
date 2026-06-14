export const buildLinePoints = (values, width = 720, height = 230) => {
  const maxValue = Math.max(...values);
  const step = width / (values.length - 1);

  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / maxValue) * (height - 18);
      return `${x},${y}`;
    })
    .join(" ");
};
