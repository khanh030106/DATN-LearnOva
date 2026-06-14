import { CalendarDays } from "lucide-react";

const AnalyticsHeader = () => (
  <header className="teacher-analytics-header">
    <div>
      <h1>Learning Analytics</h1>
      <p>Track student engagement, course performance, and learning outcomes.</p>
    </div>
    <button type="button">
      <CalendarDays size={16} />
      01 May - 31 May, 2026
    </button>
  </header>
);

export default AnalyticsHeader;
