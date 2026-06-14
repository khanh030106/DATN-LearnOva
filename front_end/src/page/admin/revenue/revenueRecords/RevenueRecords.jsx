import "./RevenueRecords.css";
import { Calendar, TrendingUp } from "lucide-react";

const RevenueRecords = () => {
  return (
    <section className="revenueRecordsSection" aria-label="System revenue records">
      <h4 className="recordsTitle">System Revenue Records</h4>

      <div className="revenueRecordsCard">
        <div className="recordsDivider" />

        <div className="recordsInner">
          <div className="recordItem">
            <div className="recordIcon">
              <Calendar size={20} />
            </div>
            <div className="recordContent">
              <div className="recordLabel">PEAK DATE RANGE</div>
              <div className="recordMain">Last Saturday</div>
              <div className="recordMeta">
                Rate:{" "}
                <span className="metaHighlight">Highest of the quarter</span>
              </div>
            </div>
            <div className="recordValue">$42,150</div>
          </div>

          <div className="recordItem">
            <div className="recordIcon grey">
              <TrendingUp size={20} />
            </div>
            <div className="recordContent">
              <div className="recordLabel">HIGHEST MONTHLY PERFORMANCE</div>
              <div className="recordMain">May 2026</div>
              <div className="recordMeta">
                Momentum: <span className="metaBoost">+12.4% growth</span>
              </div>
            </div>
            <div className="recordValue">$185,000</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueRecords;
