import { Quote } from "lucide-react";
import "./Testimonials.css";

const reviews = [
  {
    text: "Lộ trình học tại LearnOva cực kỳ bài bản. Từ một người không biết gì về code, sau 6 tháng mình đã có thể tự tin ứng tuyển vào vị trí Frontend Developer.",
    name: "Phạm Văn Mạnh",
    role: "Web Developer @ FPT",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Các bài giảng rất lôi cuốn. Không chỉ dạy kiến thức, các giảng viên còn chia sẻ những tư duy làm việc chuyên nghiệp mà mình rất cần.",
    name: "Ngô Thu Trang",
    role: "Account Manager @ VCCorp",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Hệ thống hỗ trợ 24/7 của LearnOva thật sự tuyệt vời. Mỗi khi mình gặp bug khó, các bạn trợ giảng luôn phản hồi nhanh chóng.",
    name: "Trần Đức Việt",
    role: "Data Scientist Student",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Mình đã học được rất nhiều kỹ năng thực tế có thể áp dụng ngay vào công việc hiện tại. Cảm ơn LearnOva rất nhiều!",
    name: "Lê Minh Tâm",
    role: "UI/UX Designer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Khóa học chất lượng, giảng viên nhiệt tình. Đây là môi trường học tập lý tưởng cho những ai muốn chuyển ngành.",
    name: "Hoàng Gia Bảo",
    role: "Backend Developer @ Viettel",
    img: "https://images.unsplash.com/photo-1547037579-f0fc020ac3be?auto=format&fit=crop&q=80&w=200",
  },
  {
    text: "Tài liệu học tập rất phong phú và cập nhật. Mình thấy rất đáng tiền khi đầu tư vào các khóa học ở đây.",
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
        <h2 className="testimonials-title">Học viên nói gì về LearnOva</h2>
        <p className="testimonials-subtitle">
          Lắng nghe những chia sẻ thực tế từ các học viên đã thành công sau các khóa học.
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
                <img src={rev.img} alt={rev.name} className="testimonial-avatar" />
                <div>
                  <h5 className="testimonial-name">{rev.name}</h5>
                  <p className="testimonial-role">{rev.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}