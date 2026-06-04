import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import studentAvatarOne from "../../../assets/instructors/instructor-1.jpg";
import studentAvatarTwo from "../../../assets/instructors/instructor-2.jpg";
import studentAvatarThree from "../../../assets/instructors/instructor-3.jpg";
import studentAvatarFour from "../../../assets/instructors/instructor-4.jpg";
import StudentRow from "./components/StudentRow.jsx";
import "./StudentsPage.css";

const students = [
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

const StudentsPage = () => {
  const [query, setQuery] = useState("");

  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return students;
    }

    return students.filter((student) =>
      [student.name, student.email, ...student.courses].join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <section className="teacher-page teacher-students-page">
      <div className="teacher-students-header">
        <div className="teacher-students-tools">
          <label className="teacher-students-search">
            <Search size={20} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tim ten hoc vien..."
            />
          </label>
          <button type="button" aria-label="Filter students">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="teacher-students-panel">
        <div className="teacher-students-table-head">
          <span>Hoc vien</span>
          <span>Cac khoa hoc</span>
          <span>Ngay tham gia</span>
          <span>Tien do TB</span>
          <span>Danh gia</span>
          <span>Thao tac</span>
        </div>

        {filteredStudents.map((student) => (
          <StudentRow key={student.name} student={student} />
        ))}
      </div>
    </section>
  );
};

export default StudentsPage;
