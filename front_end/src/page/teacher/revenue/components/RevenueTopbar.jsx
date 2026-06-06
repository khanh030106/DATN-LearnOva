import { ArrowDownToLine, CalendarDays } from "lucide-react";
import { periodOptions } from "../revenuePageData.js";

const RevenueTopbar = ({ activePeriod, onSelectPeriod }) => (
  <header className="teacher-revenue-topbar">
    <div>
      <h1>Revenue</h1>
      <p>Track course revenue and instructor performance.</p>
    </div>

    <div className="teacher-revenue-actions">
      <button className="teacher-revenue-date" type="button">
        <CalendarDays size={15} />
        01 May - 31 May, 2026
      </button>

      <div className="teacher-revenue-periods" aria-label="Filter revenue by period">
        {periodOptions.map((option) => (
          <button
            key={option.value}
            className={activePeriod === option.value ? "teacher-revenue-periods__item--active" : ""}
            type="button"
            onClick={() => onSelectPeriod(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button className="teacher-revenue-export" type="button">
        <ArrowDownToLine size={16} />
        Export report
      </button>
    </div>
  </header>
);

export default RevenueTopbar;
