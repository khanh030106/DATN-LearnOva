import { CalendarDays, Clock3, Info, Star, TrendingDown, TrendingUp, Users } from "lucide-react";

export const analyticsStats = [
  {
    label: "Completion Rate",
    value: "74.2%",
    change: "12.5%",
    compare: "vs Apr 1 - Apr 30",
    tone: "blue",
    icon: TrendingUp,
  },
  {
    label: "Average Rating",
    value: "4.9/5",
    change: "0.2",
    compare: "vs Apr 1 - Apr 30",
    tone: "gold",
    icon: Star,
  },
  {
    label: "Average Watch Time",
    value: "42m",
    change: "8.3%",
    compare: "vs Apr 1 - Apr 30",
    tone: "green",
    icon: Clock3,
  },
  {
    label: "Drop-off Rate",
    value: "12.4%",
    change: "2.1%",
    compare: "vs Apr 1 - Apr 30",
    tone: "red",
    icon: TrendingDown,
    negative: true,
  },
];

export const performanceTabs = ["Completion", "Watch Time", "Engagement"];

export const performanceSeries = {
  completion: [
    48, 52, 56, 60, 61, 63, 62, 64, 66, 74, 66, 72, 69, 66, 64, 63, 66, 69, 71, 76, 74, 73, 72, 73, 76,
    84, 87,
  ],
  watchTime: [
    32, 35, 38, 39, 45, 48, 50, 49, 52, 55, 47, 50, 46, 44, 45, 47, 49, 53, 52, 53, 54, 53, 54, 55, 56,
    57, 56,
  ],
  engagement: [
    15, 18, 16, 17, 22, 24, 25, 26, 31, 24, 22, 25, 23, 22, 26, 29, 25, 31, 30, 31, 31, 32, 30, 30, 29,
    31, 28,
  ],
};

export const chartLabels = ["May 1", "May 8", "May 15", "May 22", "May 31"];

export const engagementItems = [
  { label: "Active students", value: "1,248", progress: 82, change: "15.8%", icon: Users, tone: "blue" },
  { label: "Lessons completed", value: "8,420", progress: 81, change: "11.2%", icon: CalendarDays, tone: "green" },
  { label: "Questions asked", value: "326", progress: 36, change: "6.7%", icon: Info, tone: "purple" },
  { label: "Reviews submitted", value: "214", progress: 34, change: "9.3%", icon: Star, tone: "gold" },
];

export const attentionItems = [
  {
    title: "Module 3: The Art of Balance",
    detail: "High drop-off rate",
    value: "28%",
    label: "Drop-off rate",
    tone: "red",
  },
  {
    title: "Lesson 8: Practical Exercise",
    detail: "Low completion rate",
    value: "54%",
    label: "Completion rate",
    tone: "orange",
  },
  {
    title: "Quiz 2: Key Concepts",
    detail: "Average score below target",
    value: "62%",
    label: "Average score",
    tone: "orange",
  },
  {
    title: "Final Project",
    detail: "Many pending submissions",
    value: "32",
    label: "Pending",
    tone: "blue",
  },
];
