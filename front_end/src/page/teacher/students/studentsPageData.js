import studentAvatarOne from "../../../assets/instructors/instructor-1.jpg";
import studentAvatarTwo from "../../../assets/instructors/instructor-2.jpg";
import studentAvatarThree from "../../../assets/instructors/instructor-3.jpg";
import studentAvatarFour from "../../../assets/instructors/instructor-4.jpg";

export const studentTableColumns = ["Hoc vien", "Cac khoa hoc", "Ngay tham gia", "Tien do TB", "Danh gia", "Thao tac"];

export const studentList = [
  {
    name: "Nguyen Minh Hoang",
    email: "hoang.nm@example.com",
    courses: ["Triet hoc phuong dong", "Tu duy phan bien"],
    joinedAt: "24/10/2023",
    progress: "85%",
    rating: "5",
    avatar: studentAvatarOne,
  },
  {
    name: "Tran Thi Mai",
    email: "mai.tt@example.com",
    courses: ["Ky nang nghien cuu", "Ky thuat viet lach"],
    joinedAt: "22/10/2023",
    progress: "42%",
    rating: "4.8",
    avatar: studentAvatarTwo,
  },
  {
    name: "Le Van Nam",
    email: "nam.lv@example.com",
    courses: ["Lich su van minh", "Khai pha du lieu"],
    joinedAt: "20/10/2023",
    progress: "100%",
    rating: "4.9",
    avatar: studentAvatarThree,
  },
  {
    name: "Pham Thanh Thuy",
    email: "thuy.pt@example.com",
    courses: ["Triet hoc phuong dong", "Tu duy he thong"],
    joinedAt: "18/10/2023",
    progress: "67%",
    rating: "4.7",
    avatar: studentAvatarFour,
  },
  {
    name: "Dang Quoc Bao",
    email: "bao.dq@example.com",
    courses: ["Ky nang nghien cuu"],
    joinedAt: "15/10/2023",
    progress: "23%",
    rating: "4.5",
    avatar: studentAvatarOne,
  },
];
