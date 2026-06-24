export function formatVnd(value) {
  const number = typeof value === "string"
    ? Number(value.toString().replace(/[^0-9.-]+/g, ""))
    : Number(value);

  if (!Number.isFinite(number)) return "0₫";
  return `${number.toLocaleString("vi-VN")}₫`;
}
