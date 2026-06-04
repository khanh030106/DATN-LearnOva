import {
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";
import TotalRevenueCard from "./totalRevenueCard/TotalRevenueCard.jsx";
import MonthlyRevenueCard from "./monthlyRevenueCard/MonthlyRevenueCard.jsx";
import TransactionsCard from "./transactionsCard/TransactionsCard.jsx";
import PendingPaymentCard from "./pendingPaymentCard/PendingPaymentCard.jsx";
import RefundRequestCard from "./refundRequestCard/RefundRequestCard.jsx";
import GrowthRateCard from "./growthRateCard/GrowthRateCard.jsx";
import "./RevenueCard.css";

const revenueBlocks = [
  {
    id: "totalRevenue",
    component: TotalRevenueCard,
    title: "TỔNG DOANH THU",
    value: "$ 2.450.000",
    delta: "+12.4%",
    subtitle: "Quý này",
    icon: DollarSign,
  },
  {
    id: "monthlyRevenue",
    component: MonthlyRevenueCard,
    title: "DOANH THU THÁNG",
    value: "$ 185.300",
    delta: "+8.5%",
    subtitle: "đầu tháng",
    icon: Calendar,
  },
  {
    id: "transactions",
    component: TransactionsCard,
    title: "SỐ GIAO DỊCH",
    value: "15.820",
    delta: "+15.2%",
    subtitle: "so cùng kỳ",
    icon: CreditCard,
  },
  {
    id: "pendingPayment",
    component: PendingPaymentCard,
    title: "THANH TOÁN CHỜ",
    value: "$ 0",
    note: "0 GV chờ đối soát",
    icon: Clock,
  },
  {
    id: "refundRequest",
    component: RefundRequestCard,
    title: "YÊU CẦU HOÀN TRẢ",
    value: "2",
    delta: "-4.2%",
    label: "Tỉ lệ thấp",
    icon: RefreshCcw,
  },
  {
    id: "growthRate",
    component: GrowthRateCard,
    title: "TỶ LỆ TĂNG TRƯỞNG",
    value: "+12.4%",
    detail: "Vượt mức 2.4% mục tiêu",
    icon: TrendingUp,
  },
];

const RevenueCard = () => {
  return (
    <section className="revenueSection" aria-label="Bảng doanh thu">
      <div className="revenueContainer">
        <div className="revenueGrid">
          {revenueBlocks.map((block) => {
            const { id, component: BlockComponent, ...cardProps } = block;
            return <BlockComponent key={id} {...cardProps} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default RevenueCard;
