import { Clock3, Target, TriangleAlert, Zap } from "lucide-react";

export const analyticsMetrics = [
  {
    label: "Ti le hoan thanh",
    value: "74.2%",
    note: "Trung binh he thong",
    icon: Target,
    tone: "blue",
  },
  {
    label: "Do hai long",
    value: "4.9/5",
    note: "Dua tren 1.2k phan hoi",
    icon: Zap,
    tone: "gold",
  },
  {
    label: "Thoi gian hoc TB",
    value: "42m",
    note: "Moi phien hoc cua hoc vien",
    icon: Clock3,
    tone: "green",
  },
  {
    label: "Ti le bo hoc",
    value: "12.4%",
    note: "Tap trung o Module 3",
    icon: TriangleAlert,
    tone: "red",
  },
];

export const completionByCourse = [
  { label: "Triet hoc", value: 82, tone: "blue" },
  { label: "Khoa hoc", value: 65, tone: "slate" },
  { label: "Lich su", value: 74, tone: "slate" },
];

export const demographicSegments = [
  { label: "Viet Nam", value: 72, tone: "blue" },
  { label: "Hoc sinh/Sinh vien", value: 45, tone: "sky" },
  { label: "Duoi 25 tuoi", value: 58, tone: "violet" },
  { label: "Nguoi di lam", value: 38, tone: "slate" },
];
