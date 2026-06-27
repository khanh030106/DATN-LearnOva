import './Categories.css';

const categories = [
    { name: 'Web Development', count: '8,400+ courses', color: '#2563eb', initial: 'W' },
    { name: 'Data Science',    count: '4,200+ courses', color: '#4361ee', initial: 'D' },
    { name: 'UI/UX Design',   count: '3,100+ courses', color: '#f72585', initial: 'U' },
    { name: 'Business',       count: '5,600+ courses', color: '#06d6a0', initial: 'B' },
    { name: 'Finance',        count: '2,900+ courses', color: '#8338ec', initial: 'F' },
    { name: 'Photography',    count: '1,800+ courses', color: '#f59e0b', initial: 'P' },
    { name: 'Marketing',      count: '3,300+ courses', color: '#118ab2', initial: 'M' },
    { name: 'Leadership',     count: '2,100+ courses', color: '#0ea5e9', initial: 'L' },
];

export default function Categories() {
    return (
        <section className="cats" aria-labelledby="cats-heading">
            <div className="cats__container">
                <div className="cats__header">
                    <span className="section-eyebrow">Browse by Topic</span>
                    <h2 id="cats-heading" className="cats__title">
                        All the skills you need,<br />all in one place
                    </h2>
                </div>

                <div className="cats__grid">
                    {categories.map((cat) => (
                        <a key={cat.name} href="/courses" className="cats__card">
                            <div
                                className="cats__icon"
                                style={{ background: cat.color + '18', color: cat.color }}
                            >
                                {cat.initial}
                            </div>
                            <p className="cats__name">{cat.name}</p>
                            <p className="cats__count">{cat.count}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
