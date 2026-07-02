import './Testimonials.css';

const testimonials = [
    {
        name: 'David Park',
        role: 'Software Engineer at Google',
        text: 'LearnOva transformed my career. The courses are incredibly well-structured and the instructors are world-class. I landed my dream job within 6 months.',
        color: '#4361ee',
        initial: 'DP',
    },
    {
        name: 'Priya Sharma',
        role: 'UX Designer at Airbnb',
        text: "I went from zero design knowledge to landing a senior UX role at Airbnb. The course was exactly what I needed — practical, current, and genuinely engaging.",
        color: '#f72585',
        initial: 'PS',
    },
    {
        name: 'Marcus Johnson',
        role: 'Financial Analyst at Goldman',
        text: 'The financial modeling course here is the best I have found anywhere. Real-world projects and case studies made all the difference in my interviews.',
        color: '#06d6a0',
        initial: 'MJ',
    },
];

export default function Testimonials() {
    return (
        <section className="testi" aria-labelledby="testi-heading">
            <div className="testi__container">
                <div className="testi__header">
                    <span className="section-eyebrow">Student Stories</span>
                    <h2 id="testi-heading" className="testi__title">
                        Real learners,<br />real transformations
                    </h2>
                </div>

                <div className="testi__grid">
                    {testimonials.map((t) => (
                        <article
                            key={t.name}
                            className="testi__card"
                            style={{ '--corner': t.color + '0d' }}
                        >
                            <div className="testi__corner" aria-hidden="true" />
                            <div className="testi__quote-mark" style={{ color: t.color }} aria-hidden="true">"</div>
                            <div className="testi__stars" aria-label="5 stars">★★★★★</div>
                            <blockquote className="testi__text">{t.text}</blockquote>
                            <div className="testi__author">
                                <div
                                    className="testi__avatar"
                                    style={{
                                        background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`
                                    }}
                                    aria-hidden="true"
                                >
                                    {t.initial}
                                </div>
                                <div>
                                    <p className="testi__name">{t.name}</p>
                                    <p className="testi__role">{t.role}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
