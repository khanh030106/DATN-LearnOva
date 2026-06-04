import "./RevenueRecords.css";
import { Calendar, TrendingUp } from "lucide-react";

const RevenueRecords = () => {
  return (
    <section
      className="revenueRecordsCard"
      aria-label="Kỷ lục doanh thu hệ thống"
    >
      <h4 className="recordsTitle">Kỷ Lục Doanh Thu Hệ Thống</h4>
      <div className="recordsDivider" />

      <div className="recordsInner">
        <div className="recordItem">
          <div className="recordIcon">
            <Calendar size={20} />
          </div>
          <div className="recordContent">
            <div className="recordLabel">KHUNG NGÀY ĐỈNH ĐIỂM</div>
            <div className="recordMain">Thứ Bảy tuần trước</div>
            <div className="recordMeta">
              Tỷ suất: <span className="metaHighlight">Cao nhất quý</span>
            </div>
          </div>
          <div className="recordValue">$42,150</div>
        </div>

        <div className="recordItem">
          <div className="recordIcon grey">
            <TrendingUp size={20} />
          </div>
          <div className="recordContent">
            <div className="recordLabel">HIỆU SUẤT THÁNG CAO NHẤT</div>
            <div className="recordMain">Tháng 05, 2026</div>
            <div className="recordMeta">
              Động lực: <span className="metaBoost">+12.4% tăng trưởng</span>
            </div>
          </div>
          <div className="recordValue">$185,000</div>
        </div>
      </div>
    </section>
  );
};

export default RevenueRecords;
