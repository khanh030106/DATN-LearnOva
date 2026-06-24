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
import { t } from "../../../../../../../util/i18n.js";
import { getLanguage, LANG_EVENT } from "../../../../../../../util/language.js";
import { useEffect, useState } from "react";

const CourseDetailSidebar = ({ course }) => {
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
    window.addEventListener(LANG_EVENT, onLangChange);
    return () => window.removeEventListener(LANG_EVENT, onLangChange);
  }, []);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (course.progress / 100) * circumference;

  const infoRows = [
    { icon: User, labelKey: "instructor", value: course.instructor.name },
    { icon: Clock, labelKey: "duration", value: course.duration },
    { icon: Users, labelKey: "students_label", value: course.students },
    { icon: BookOpen, labelKey: "lessons_label", value: course.lessonsTotal },
    { icon: Calendar, labelKey: "last_updated", value: course.updatedAt },
    { icon: BarChart3, labelKey: "level", value: course.level },
  ];

  return (
    <aside className="learning-detail-sidebar">
      <section className="learning-side-card">
        <h3>{t('learning_progress')}</h3>

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
            <span>{t('completed')}</span>
          </div>
        </div>

        <p>{t('you_have_completed')}</p>

        <strong className="learning-finished">
          {course.lessonsDone} / {course.lessonsTotal} {t('lessons')}
        </strong>

        <div className="learning-linear-progress">
          <span style={{ width: `${course.progress}%` }} />
        </div>

        <small>{t('keep_it_up')}</small>

        <button className="learning-primary-button" type="button">
          <Play size={16} fill="currentColor" />
          {t('continue_learning')}
        </button>

        <button className="learning-secondary-button" type="button">
          <RotateCcw size={16} />
          {t('restart_course')}
        </button>
      </section>

      <section className="learning-side-card">
        <h3>{t('course_information')}</h3>

        <div className="learning-info-list">
          {infoRows.map((row) => {
            const Icon = row.icon;

            return (
              <div key={row.labelKey}>
                <span>
                  <Icon size={17} />
                  {t(row.labelKey)}
                </span>
                <strong>{row.value}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className="learning-support-card">
        <h3>{t('need_help')}</h3>

        <p>
          {t('support_paragraph')}
        </p>

        <button type="button">
          <HelpCircle size={18} />
          {t('ask_a_question')}
        </button>
      </section>
    </aside>
  );
};

export default CourseDetailSidebar;
