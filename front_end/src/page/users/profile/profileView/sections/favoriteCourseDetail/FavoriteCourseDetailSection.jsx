import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  Link as LinkIcon,
  MessageCircle,
  Play,
  ShoppingCart,
  Star,
  User,
  Users,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {
  buildFavoriteCourseDetail,
  FAVORITE_DETAIL_TABS,
} from "./data/favoriteCourseDetailData";

const tabIcons = {
  overview: BookOpen,
  curriculum: FileText,
  instructor: Users,
  reviews: Star,
  qa: MessageCircle,
};

const FavoriteCourseDetailSection = ({ course }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const detail = useMemo(() => buildFavoriteCourseDetail(course), [course]);

  const courseInfo = [
    { icon: Users, label: "Cấp độ", value: detail.level, badge: true },
    { icon: BookOpen, label: "Số bài học", value: `${detail.lessonsTotal} bài` },
    { icon: Clock, label: "Thời lượng", value: detail.duration },
    { icon: Calendar, label: "Cập nhật lần cuối", value: detail.updatedAt },
    { icon: Globe, label: "Ngôn ngữ", value: detail.language },
    { icon: MessageCircle, label: "Phụ đề", value: detail.topic },
    { icon: FileText, label: "Bài tập", value: detail.exercise },
    { icon: Award, label: "Chứng chỉ", value: detail.certificate },
  ];

  const renderTabContent = () => {
    if (activeTab === "curriculum") {
      return (
        <section className="favorite-flow-card favorite-flow-curriculum">
          <div className="favorite-flow-section-title">
            <h3>Nội dung khóa học</h3>
            <span>32 / 48 bài học - 5h 30m</span>
          </div>

          {detail.curriculum.map((chapter) => (
            <article className="favorite-flow-chapter" key={chapter.id}>
              <div className="favorite-flow-chapter-head">
                <div>
                  {chapter.open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <strong>
                    {chapter.id}. {chapter.title}
                  </strong>
                </div>
                <span>{chapter.meta}</span>
              </div>

              {chapter.open && (
                <div className="favorite-flow-lessons">
                  {chapter.lessons.map((lesson) => (
                    <div className="favorite-flow-lesson" key={lesson.number}>
                      <span>{lesson.number}</span>
                      <p>{lesson.title}</p>
                      <small>{lesson.type} - {lesson.duration}</small>
                      {lesson.done ? <Check size={15} /> : <HelpCircle size={15} />}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      );
    }

    if (activeTab === "instructor") {
      return (
        <section className="favorite-flow-card favorite-flow-instructor">
          <img src={detail.instructor.avatar} alt={detail.instructor.name} />
          <div>
            <h3>{detail.instructor.name}</h3>
            <strong>{detail.instructor.role}</strong>
            <p>{detail.instructor.bio}</p>
            <div className="favorite-flow-stat-grid">
              {detail.instructor.stats.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === "reviews") {
      return (
        <section className="favorite-flow-card favorite-flow-reviews">
          <div className="favorite-flow-review-score">
            <strong>{detail.rating}</strong>
            <div>
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} size={16} fill="currentColor" />
              ))}
              <p>{detail.reviews} học viên đã đánh giá khóa học này.</p>
            </div>
          </div>

          {detail.reviewsList.map((review) => (
            <article key={review.name}>
              <div>
                <strong>{review.name}</strong>
                <span>{review.score}/5</span>
              </div>
              <p>{review.text}</p>
            </article>
          ))}
        </section>
      );
    }

    if (activeTab === "qa") {
      return (
        <section className="favorite-flow-card favorite-flow-qa">
          <h3>Hỏi đáp khóa học</h3>
          {detail.questions.map((question) => (
            <article key={question.title}>
              <strong>{question.title}</strong>
              <p>{question.answer}</p>
            </article>
          ))}
          <button type="button">
            <MessageCircle size={16} />
            Gửi câu hỏi mới
          </button>
        </section>
      );
    }

    return (
      <>
        <section className="favorite-flow-card favorite-flow-outcomes">
          <h3>Bạn sẽ học được gì</h3>
          <div>
            {detail.outcomes.map((item) => (
              <p key={item}>
                <Check size={15} />
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="favorite-flow-card favorite-flow-about">
          <h3>Giới thiệu khóa học</h3>
          {detail.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        {renderTabContentForCurriculumPreview(detail)}
      </>
    );
  };

  return (
    <div className="favorite-flow-page">
      <section className="favorite-flow-hero">
        <div className="favorite-flow-preview">
          <img src={detail.image} alt={detail.title} />
          <button type="button" aria-label="Xem trước khóa học">
            <Play size={30} fill="currentColor" />
          </button>
          <span>
            <Play size={14} />
            Xem trước khóa học
          </span>
        </div>

        <div className="favorite-flow-summary">
          <span className="favorite-flow-category">{detail.category}</span>
          <h2>{detail.title}</h2>
          <div className="favorite-flow-meta">
            <span>
              <User size={14} />
              {detail.instructor.name}
            </span>
            <span>
              <Star size={14} fill="currentColor" />
              {detail.rating} ({detail.reviews} đánh giá)
            </span>
            <span>{detail.progressText}</span>
            <span>{detail.remaining}</span>
          </div>
          <p>{detail.summary}</p>

          <div className="favorite-flow-buy-row">
            <article>
              <mark>Đã mua</mark>
              <strong>0đ</strong>
              <div>
                <button className="favorite-flow-primary" type="button">
                  <Play size={15} fill="currentColor" />
                  Tiếp tục học
                </button>
                <button className="favorite-flow-secondary" type="button">
                  <Heart size={15} />
                  Bỏ yêu thích
                </button>
              </div>
            </article>

            <article>
              <mark className="orange">Chưa mua</mark>
              <strong className="orange-text">{detail.price}</strong>
              <del>{detail.originalPrice}</del>
              <div>
                <button className="favorite-flow-cart" type="button">
                  <ShoppingCart size={15} />
                  Mua ngay
                </button>
                <button className="favorite-flow-secondary" type="button">
                  <Heart size={15} />
                  Bỏ yêu thích
                </button>
              </div>
              <small>
                <Check size={13} />
                Học mọi lúc, mọi nơi
              </small>
              <small>
                <Check size={13} />
                Hoàn tiền trong 7 ngày nếu không hài lòng
              </small>
            </article>
          </div>
        </div>
      </section>

      <nav className="favorite-flow-tabs">
        {FAVORITE_DETAIL_TABS.map((tab) => {
          const Icon = tabIcons[tab.id];
          const label = tab.id === "reviews" ? `${tab.label} (${detail.reviews})` : tab.label;

          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="favorite-flow-body">
        <main>{renderTabContent()}</main>

        <aside>
          <section className="favorite-flow-card favorite-flow-info">
            <h3>Thông tin khóa học</h3>
            {courseInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label}>
                  <span>
                    <Icon size={15} />
                    {item.label}
                  </span>
                  <strong className={item.badge ? "badge" : ""}>{item.value}</strong>
                </div>
              );
            })}
          </section>

          <section className="favorite-flow-card favorite-flow-share">
            <h3>Chia sẻ khóa học</h3>
            <p>Chia sẻ khóa học này với bạn bè của bạn</p>
            <div>
              <button type="button" aria-label="Sao chép liên kết">
                <LinkIcon size={16} />
              </button>
              <button type="button" aria-label="Chia sẻ Facebook">
                <FaFacebookF size={16} />
              </button>
              <button type="button" aria-label="Chia sẻ Twitter">
                <FaTwitter size={16} />
              </button>
              <button type="button" aria-label="Chia sẻ LinkedIn">
                <FaLinkedinIn size={16} />
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

const renderTabContentForCurriculumPreview = (detail) => (
  <section className="favorite-flow-card favorite-flow-curriculum">
    <div className="favorite-flow-section-title">
      <h3>Nội dung khóa học</h3>
      <span>32 / 48 bài học - 5h 30m</span>
    </div>

    {detail.curriculum.map((chapter) => (
      <article className="favorite-flow-chapter" key={chapter.id}>
        <div className="favorite-flow-chapter-head">
          <div>
            {chapter.open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <strong>
              {chapter.id}. {chapter.title}
            </strong>
          </div>
          <span>{chapter.meta}</span>
        </div>

        {chapter.open && (
          <div className="favorite-flow-lessons">
            {chapter.lessons.map((lesson) => (
              <div className="favorite-flow-lesson" key={lesson.number}>
                <span>{lesson.number}</span>
                <p>{lesson.title}</p>
                <small>{lesson.type} - {lesson.duration}</small>
                {lesson.done ? <Check size={15} /> : <HelpCircle size={15} />}
              </div>
            ))}
          </div>
        )}
      </article>
    ))}
  </section>
);

export default FavoriteCourseDetailSection;
