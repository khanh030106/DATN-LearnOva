import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    q: "Tôi có được nhận chứng chỉ sau khi hoàn thành không?",
    a: "Tất cả các khóa học tại LearnOva đều cung cấp chứng chỉ điện tử có giá trị định danh cao. Bạn có thể sử dụng chứng chỉ này để đính kèm vào CV hoặc hồ sơ LinkedIn của mình.",
  },
  {
    q: "Nếu tôi gặp khó khăn trong khi học thì hỏi ai?",
    a: "Chúng tôi có hệ thống Q&A ngay dưới mỗi bài giảng. Ngoài ra, học viên sẽ được tham gia cộng đồng Discord riêng tư để được giải đáp 24/7.",
  },
  {
    q: "LearnOva có hỗ trợ giới thiệu việc làm không?",
    a: "Đối với các lộ trình chuyên sâu, chúng tôi cam kết hỗ trợ sửa CV, luyện phỏng vấn và kết nối bạn trực tiếp với mạng lưới đối tác tuyển dụng.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">Câu hỏi thường gặp</h2>
            <p className="faq-subtitle">
              Giải đáp những thắc mắc phổ biến nhất của các học viên mới.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="faq-button"
                  >
                    <h4 className="faq-question">{faq.q}</h4>
                    <ChevronDown
                      className={`faq-icon ${isOpen ? "faq-icon-open" : ""}`}
                      size={16}
                    />
                  </button>

                  <div
                    className={`faq-content ${isOpen ? "faq-content-open" : ""}`}
                  >
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="final-cta-container">
          <div className="final-cta-card">
            <div className="final-cta-overlay">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
                className="final-cta-image"
                alt="Students"
              />
            </div>

            <div className="final-cta-content">
              <h2 className="final-cta-title">
                Bắt đầu hành trình chinh phục tri thức <br /> ngay hôm nay!
              </h2>

              <p className="final-cta-desc">
                Gia nhập cộng đồng hơn 50,000 học viên và mở cánh cửa cơ hội
                nghề nghiệp toàn cầu.
              </p>

              <div className="final-cta-actions">
                <button className="final-cta-primary">
                  Đăng ký tài khoản miễn phí
                </button>
                <button className="final-cta-secondary">
                  Xem các khóa học hot
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
