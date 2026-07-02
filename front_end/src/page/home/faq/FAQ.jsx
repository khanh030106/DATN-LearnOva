import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const questions = [
    {
        q: 'What makes LearnOva different from YouTube or free tutorials?',
        a: 'Free tutorials teach individual concepts in isolation. LearnOva gives you a structured path — every lesson builds on the last, real projects connect concepts together, and you graduate with a portfolio and certificate employers recognize. It\'s the difference between collecting ingredients and cooking a meal.',
    },
    {
        q: 'How long before I can get a job after finishing a path?',
        a: 'Our learners average 6–10 months to their first role. Speed depends on your pace and prior experience. Every path includes a "Job-Ready" milestone where we review your portfolio before you start applying — we don\'t let you leave without a plan.',
    },
    {
        q: 'Do I need prior experience or a technical background?',
        a: 'No. Every LearnOva path starts from absolute zero. The first phase teaches you exactly what you need to understand the next phase. Thousands of career-changers — accountants, teachers, sales reps — have completed our paths with no technical background whatsoever.',
    },
    {
        q: 'Is the certificate recognized by employers in Vietnam?',
        a: 'Yes. We partner with 80+ hiring companies across Vietnam including VNG, Tiki, Shopee, and Vingroup. Our certificates are verifiable online and our Career Team actively sends graduate profiles to hiring partners every month.',
    },
];

export default function FAQ() {
    const [open, setOpen] = useState(null);

    return (
        <section className="faq" aria-labelledby="faq-heading">
            <div className="faq__container">
                <div className="faq__header">
                    <span className="section-eyebrow">Common Questions</span>
                    <h2 id="faq-heading" className="faq__title">
                        Everything you're wondering<br />before you commit.
                    </h2>
                </div>

                <div className="faq__list">
                    {questions.map((item, i) => (
                        <div
                            key={i}
                            className={`faq__item ${open === i ? 'faq__item--open' : ''}`}
                        >
                            <button
                                className="faq__question"
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                                aria-controls={`faq-answer-${i}`}
                            >
                                <span>{item.q}</span>
                                <ChevronDown size={18} className="faq__icon" />
                            </button>
                            <div
                                id={`faq-answer-${i}`}
                                className="faq__answer"
                                role="region"
                            >
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
