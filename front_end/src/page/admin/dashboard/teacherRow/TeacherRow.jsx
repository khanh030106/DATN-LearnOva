import { Star } from "lucide-react";
import "./TeacherRow.css";

const teachers = [
  {
    id: 1,
    name: "ThS. Nguyễn Thị Mai",
    courses: 24,
    rating: 4.9,
    rank: 1,
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: 2,
    name: "TS. Lê Hoàng Nam",
    courses: 18,
    rating: 4.8,
    rank: 2,
    avatar: "https://i.pravatar.cc/120?img=61",
  },
  {
    id: 3,
    name: "Cô Trần Phương Linh",
    courses: 16,
    rating: 4.7,
    rank: 3,
    avatar: "https://i.pravatar.cc/120?img=25",
  },
];

const TeacherRow = () => {
  return (
    <section className="teacherRowSection" aria-label="Giảng viên tiêu biểu">
      <div className="teacherRowCard">
        <div className="teacherRowCardHeader">
          <div>
            <h3 className="teacherRowCardTitle">Giảng viên tiêu biểu</h3>
            <p className="teacherRowCardSubtitle">
              Những giảng viên đang dẫn đầu về chất lượng giảng dạy
            </p>
          </div>
        </div>

        <div className="teacherRowList">
          {teachers.map((teacher) => (
            <article key={teacher.id} className="teacherRowItem">
              <div className="teacherRowAvatarWrap">
                <img
                  className="teacherRowAvatar"
                  src={teacher.avatar}
                  alt={teacher.name}
                />
                <span className="teacherRowRank">{teacher.rank}</span>
              </div>

              <div className="teacherRowContent">
                <p className="teacherRowName">{teacher.name}</p>
                <p className="teacherRowCourseCount">
                  {teacher.courses} khóa học
                </p>
              </div>

              <div className="teacherRowRating">
                <Star
                  className="teacherRowStar"
                  size={10}
                  fill="currentColor"
                />
                <span className="teacherRowRatingValue">{teacher.rating}</span>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="teacherRowButton">
          Xem bảng xếp hạng
        </button>
      </div>
    </section>
  );
};

export default TeacherRow;
