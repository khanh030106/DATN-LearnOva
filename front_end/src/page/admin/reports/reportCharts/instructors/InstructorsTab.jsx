import { Clock, Star, Users } from "lucide-react";
import InstructorGrowthChart from "./InstructorGrowthChart/InstructorGrowthChart.jsx";
import InstructorApprovalChart from "./InstructorApprovalChart/InstructorApprovalChart.jsx";
import InstructorActivityChart from "./InstructorActivityChart/InstructorActivityChart.jsx";
import "./InstructorsTab.css";

const charts = [
  { id: "growth", component: InstructorGrowthChart },
  { id: "approval", component: InstructorApprovalChart },
  { id: "activity", component: InstructorActivityChart },
];

const cards = [
  {
    id: "best-rated",
    icon: Star,
    iconClass: "iconOrange",
    title: "Giảng viên đánh giá tốt nhất",
    items: [
      {
        name: "TS. Nguyễn Văn A",
        meta: "14 khóa học • 8.450 học viên",
        value: "4.92",
      },
      {
        name: "ThS. Trần Thị B",
        meta: "8 khóa học • 5.120 học viên",
        value: "4.89",
      },
      {
        name: "Kỹ sư Phạm Minh C",
        meta: "11 khóa học • 9.210 học viên",
        value: "4.85",
      },
      {
        name: "Phó TS. Lê Hoàng D",
        meta: "15 khóa học • 7.600 học viên",
        value: "4.82",
      },
      {
        name: "Bà Hoàng Thu E",
        meta: "6 khóa học • 3.420 học viên",
        value: "4.79",
      },
    ],
  },
  {
    id: "most-active",
    icon: Clock,
    iconClass: "iconGreen",
    title: "Giảng viên tích cực nhất",
    items: [
      {
        name: "Phạm Minh C",
        meta: "28 buổi livestream hỗ trợ",
        value: "142 giờ giảng dạy",
      },
      {
        name: "Nguyễn Văn A",
        meta: "24 buổi livestream hỗ trợ",
        value: "120 giờ giảng dạy",
      },
      {
        name: "Lê Hoàng D",
        meta: "22 buổi livestream hỗ trợ",
        value: "115 giờ giảng dạy",
      },
      {
        name: "Trần Thị B",
        meta: "18 buổi livestream hỗ trợ",
        value: "98 giờ giảng dạy",
      },
      {
        name: "Đỗ Quốc F",
        meta: "16 buổi livestream hỗ trợ",
        value: "92 giờ giảng dạy",
      },
    ],
  },
  {
    id: "top-attraction",
    icon: Users,
    iconClass: "iconPurple",
    title: "Sức hút đăng ký nhiều nhất",
    items: [
      {
        name: "Kỹ sư Phạm Minh C",
        meta: "11 khóa học phát hành",
        value: "9.210 SV",
      },
      {
        name: "TS. Nguyễn Văn A",
        meta: "14 khóa học phát hành",
        value: "8.450 SV",
      },
      {
        name: "Phó TS. Lê Hoàng D",
        meta: "15 khóa học phát hành",
        value: "7.600 SV",
      },
      {
        name: "ThS. Trần Thị B",
        meta: "8 khóa học phát hành",
        value: "5.120 SV",
      },
      {
        name: "Bà Hoàng Thu E",
        meta: "6 khóa học phát hành",
        value: "3.420 SV",
      },
    ],
  },
];

const InstructorsTab = () => {
  return (
    <div className="instructorsTabContent">
      <div className="instructorsChartsGrid">
        {charts.map(({ id, component: ChartComponent }) => (
          <ChartComponent key={id} />
        ))}
      </div>
      <div className="instructorsCardsGrid">
        {cards.map(({ id, icon: Icon, iconClass, title, items }) => (
          <div key={id} className="instructorInfoCard">
            <div className="instructorCardHeader">
              <div className={`instructorCardIcon ${iconClass}`}>
                <Icon size={18} />
              </div>
              <div className="instructorCardTitle">{title}</div>
            </div>
            <div className="instructorCardList">
              {items.map((item) => (
                <div key={item.name} className="instructorCardRow">
                  <div>
                    <div className="instructorCardName">{item.name}</div>
                    <div className="instructorCardMeta">{item.meta}</div>
                  </div>
                  <div className="instructorCardValue">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorsTab;
