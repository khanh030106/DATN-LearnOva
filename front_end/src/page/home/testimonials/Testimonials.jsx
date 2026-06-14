import { Quote } from "lucide-react";
import "./Testimonials.css";

const reviews = [
  {
    text: "The learning path at LearnOva is really well-structured. Từ một người không biết gì về code, sau 6 tháng mình đã tự tin apply vị trí Frontend Developer.",
    name: "Michael Carter",
    role: "Web Developer @ FPT",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Các bài giảng tại LearnOva cực kỳ cuốn hút. Instructors not only teach knowledge but also share professional working mindset.",
    name: "Ngô Thu Trang",
    role: "Account Manager @ VCCorp",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "LearnOva’s 24/7 support system is truly amazing. Mỗi khi mình gặp bug khó, teaching assistants luôn support rất nhanh.",
    name: "Daniel Walker",
    role: "Data Scientist Student",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Mình học được rất nhiều kỹ năng thực tế có thể áp dụng ngay vào công việc. LearnOva really gave me an amazing learning experience!",
    name: "Lê Minh Tâm",
    role: "UI/UX Designer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "High-quality courses and very supportive instructors. Đây là môi trường học tập lý tưởng cho những ai muốn chuyển ngành sang tech.",
    name: "Ryan Mitchell",
    role: "Backend Developer @ Viettel",
    img: "https://images.unsplash.com/photo-1547037579-f0fc020ac3be?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Tài liệu học tập rất đầy đủ và luôn được cập nhật mới. I think every course here is totally worth the investment.",
    name: "Nguyễn Mỹ Linh",
    role: "Digital Marketer",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
  },
];

export default function Testimonials() {
  const allReviews = [...reviews, ...reviews];

  return (
      <section className="testimonials-section">
        <div className="testimonials-header">
          <h2 className="testimonials-title">
            What students say about LearnOva
          </h2>

          <p className="testimonials-subtitle">
            Listen to real-life stories from successful students.
          </p>
        </div>

        <div className="testimonials-marquee">
          <div className="testimonials-track">
            {allReviews.map((rev, i) => (
                <article key={i} className="testimonial-card">
                  <div className="testimonial-top">
                    <Quote className="testimonial-quote" size={24} />
                    <p className="testimonial-text">"{rev.text}"</p>
                  </div>

                  <div className="testimonial-user">
                    <img
                        src={rev.img}
                        alt={rev.name}
                        className="testimonial-avatar"
                    />

                    <div>
                      <h5 className="testimonial-name">
                        {rev.name}
                      </h5>

                      <p className="testimonial-role">
                        {rev.role}
                      </p>
                    </div>
                  </div>
                </article>
            ))}
          </div>
        </div>
      </section>
  );
}