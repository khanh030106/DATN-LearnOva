import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Engagements.css";

const faqs = [
  {
    q: "Will I receive a certificate after completing the course?",
    a: "All courses at LearnOva provide electronic certificates with high credibility. You can use these certificates to attach to your CV or LinkedIn profile.",
  },
  {
    q: "Who can I ask if I have difficulties while learning?",
    a: "We provide a Q&A system below every lecture. In addition, students will have access to a private Discord community for 24/7 support.",
  },
  {
    q: "Does LearnOva provide job placement support?",
    a: "For intensive learning paths, we offer CV review support, interview practice sessions, and direct connections to our hiring partner network.",
  },
];

export default function Engagements() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">Frequently asked questions</h2>
            <p className="faq-subtitle">
              Answering the most common questions from new students..
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
                Start your journey to conquer knowledge now!
              </h2>

              <p className="final-cta-desc">
                Join a community of over 50,000 students and open the door to global career opportunities.
              </p>

              <div className="final-cta-actions">
                <button className="final-cta-primary">
                  Register for a free account.
                </button>
                <button className="final-cta-secondary">
                  Check out the hottest courses.
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
