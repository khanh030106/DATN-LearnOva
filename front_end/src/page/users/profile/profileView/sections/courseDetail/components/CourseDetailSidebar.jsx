import {
  BookOpen,
  Calendar,
  Clock,
  HelpCircle,
  RotateCcw,
  Play,
  User,
  Users,
  BarChart3,
} from "lucide-react";

const CourseDetailSidebar = ({ course }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (course.progress / 100) * circumference;

  const infoRows = [
    { icon: User, label: "Giảng viên", value: course.instructor.name },
    { icon: Clock, label: "Thời lượng", value: course.duration },
    { icon: Users, label: "Học viên", value: course.students },
    { icon: BookOpen, label: "Bài học", value: course.lessonsTotal },
    { icon: Calendar, label: "Cập nhật", value: course.updatedAt },
    { icon: BarChart3, label: "Cấp độ", value: course.level },
  ];

  return (
    <aside className="learning-detail-sidebar">
      <section className="learning-side-card">
        <h3>Tiến độ học tập</h3>
        <div className="learning-progress-ring">
          <svg viewBox="0 0 132 132" aria-hidden="true">
            <circle cx="66" cy="66" r={radius} />
            <circle
              cx="66"
              cy="66"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div>
            <strong>{course.progress}%</strong>
            <span>Hoàn thành</span>
          </div>
        </div>

        <p>Bạn đã hoàn thành</p>
        <strong className="learning-finished">
          {course.lessonsDone} / {course.lessonsTotal} bài học
        </strong>
        <div className="learning-linear-progress">
          <span style={{ width: `${course.progress}%` }} />
        </div>
        <small>Cố lên! Bạn đang học rất tốt.</small>

        <button className="learning-primary-button" type="button">
          <Play size={16} fill="currentColor" />
          Tiếp tục học
        </button>
        <button className="learning-secondary-button" type="button">
          <RotateCcw size={16} />
          Học lại từ đầu
        </button>
      </section>

      <section className="learning-side-card">
        <h3>Thông tin khóa học</h3>
        <div className="learning-info-list">
          {infoRows.map((row) => {
            const Icon = row.icon;

            return (
              <div key={row.label}>
                <span>
                  <Icon size={17} />
                  {row.label}
                </span>
                <strong>{row.value}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className="learning-support-card">
        <h3>Bạn cần hỗ trợ?</h3>
        <p>Đặt câu hỏi và nhận hỗ trợ từ giảng viên cùng cộng đồng học viên.</p>
        <button type="button">
          <HelpCircle size={18} />
          Đặt câu hỏi
        </button>
      </section>
    </aside>
  );
};

export default CourseDetailSidebar;
