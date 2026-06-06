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
    title: "Total Vouchers",
    value: "8",
    note: "compared to last month",
    icon: FiTag,
    accent: "gold",
  },
  {
    id: "activated",
    title: "Activated Vouchers",
    value: "6",
    note: "currently active",
    icon: FiShield,
    accent: "green",
  },
  {
    id: "expired",
    title: "Expired Vouchers",
    value: "1",
    note: "no longer valid",
    icon: FiClock,
    accent: "red",
  },
  {
    id: "applied",
    title: "Applied (uses)",
    value: "1,634",
    note: "actual coupon usage",
    icon: FiShoppingBag,
    accent: "blue",
  },
  {
    id: "reduced",
    title: "Total Discounted Amount",
    value: "$322.8",
    note: "total monthly discount",
    icon: FiDollarSign,
    accent: "purple",
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "68.1%",
    note: "user performance after coupon",
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
