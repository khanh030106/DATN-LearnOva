import {
  FiTag,
  FiShield,
  FiClock,
  FiShoppingBag,
  FiDollarSign,
  FiPercent,
} from "react-icons/fi";
import "./VoucherCards.css";
import TotalVoucherCard from "./TotalVoucherCard/TotalVoucherCard.jsx";
import ActivatedVoucherCard from "./ActivatedVoucherCard/ActivatedVoucherCard.jsx";
import ExpiredVoucherCard from "./ExpiredVoucherCard/ExpiredVoucherCard.jsx";
import AppliedVoucherCard from "./AppliedVoucherCard/AppliedVoucherCard.jsx";
import ReducedAmountVoucherCard from "./ReducedAmountVoucherCard/ReducedAmountVoucherCard.jsx";
import ConversionRateVoucherCard from "./ConversionRateVoucherCard/ConversionRateVoucherCard.jsx";

const voucherCards = [
  {
    id: "total",
    title: "Tổng số voucher",
    value: "8",
    note: "so với tháng trước",
    icon: FiTag,
    accent: "gold",
  },
  {
    id: "activated",
    title: "Voucher kích hoạt",
    value: "6",
    note: "đang có hiệu lực",
    icon: FiShield,
    accent: "green",
  },
  {
    id: "expired",
    title: "Voucher hết hạn",
    value: "1",
    note: "voucher không còn hiệu lực",
    icon: FiClock,
    accent: "red",
  },
  {
    id: "applied",
    title: "Đã áp dụng (lượt)",
    value: "1.634",
    note: "lượt sử dụng coupon thực tế",
    icon: FiShoppingBag,
    accent: "blue",
  },
  {
    id: "reduced",
    title: "Tổng tiền đã giảm",
    value: "$322.8",
    note: "giảm giá tổng trong tháng",
    icon: FiDollarSign,
    accent: "purple",
  },
  {
    id: "conversion",
    title: "Tỷ lệ chuyển đổi",
    value: "68.1%",
    note: "hiệu suất người dùng sau coupon",
    icon: FiPercent,
    accent: "orange",
  },
];

const cardComponents = {
  total: TotalVoucherCard,
  activated: ActivatedVoucherCard,
  expired: ExpiredVoucherCard,
  applied: AppliedVoucherCard,
  reduced: ReducedAmountVoucherCard,
  conversion: ConversionRateVoucherCard,
};

const VoucherCards = () => {
  return (
    <div className="voucherCardsRow">
      {voucherCards.map((card) => {
        const Card = cardComponents[card.id];
        return <Card key={card.id} {...card} />;
      })}
    </div>
  );
};

export default VoucherCards;
