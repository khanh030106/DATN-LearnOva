import { FileText, Star, TrendingUp, Users, Wallet } from "lucide-react";

export const periodOptions = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "1 year", value: "1y" },
];

export const metricCards = [
  {
    label: "Revenue",
    value: "₫42.500.000",
    note: "+12.5% vs previous 30 days",
    tone: "blue",
    icon: Wallet,
    sparkline: [18, 24, 23, 32, 29, 42, 36],
  },
  {
    label: "New Students",
    value: "820",
    note: "+8.3% vs previous 30 days",
    tone: "green",
    icon: Users,
    sparkline: [14, 20, 28, 24, 21, 34, 30],
  },
  {
    label: "Orders",
    value: "352",
    note: "+10.7% vs previous 30 days",
    tone: "purple",
    icon: FileText,
    sparkline: [24, 18, 25, 22, 34, 27, 30],
  },
  {
    label: "Average Rating",
    value: "4.8 / 5",
    note: "+0.2 points vs previous 30 days",
    tone: "gold",
    icon: Star,
    bars: [22, 35, 25, 48, 31, 56, 75],
  },
];

export const revenueChart = [
  6, 9, 15, 12, 14, 18, 15, 17, 23, 19, 21, 26, 24, 29, 25, 22, 23, 21, 19, 27, 26, 28, 27, 30, 28, 31,
  36, 37, 43, 41,
];

export const previousRevenueChart = [
  5, 8, 11, 10, 12, 11, 13, 12, 14, 15, 15, 17, 18, 16, 19, 18, 19, 17, 16, 19, 18, 17, 20, 19, 18, 20,
  23, 26, 28, 30,
];

export const chartLabels = ["1 May", "6 May", "11 May", "16 May", "21 May", "26 May", "31 May"];

export const chartHighlights = [
  {
    label: "Highest revenue day",
    value: "29 May, 2026",
    note: "₫5.250.000",
    icon: "calendar",
  },
  {
    label: "Total refunds",
    value: "₫920.000",
    note: "2.2% of orders",
    icon: "credit-card",
  },
  {
    label: "Average order value",
    value: "₫120.739",
    note: "+7.5% vs previous 30 days",
    icon: "wallet",
  },
];


export const transactions = [
  { student: "Nguyen Van A", course: "React Masterclass", amount: "₫499.000", method: "Momo", time: "31 May, 2026" },
  { student: "Tran Thi B", course: "Python for Beginners", amount: "₫399.000", method: "VNPay", time: "31 May, 2026" },
  { student: "Le Minh C", course: "UI/UX Design", amount: "₫599.000", method: "Credit Card", time: "30 May, 2026" },
  { student: "Pham Hoang D", course: "JavaScript Advanced", amount: "₫499.000", method: "Momo", time: "30 May, 2026" },
  { student: "Do Thu H", course: "Node.js Backend", amount: "₫399.000", method: "VNPay", time: "29 May, 2026" },
];

export const payoutSummary = {
  date: "12 Jun, 2026",
  amount: "₫18.250.000",
  schedule: "Payout schedule: Monthly on day 12",
  progress: 64,
};
