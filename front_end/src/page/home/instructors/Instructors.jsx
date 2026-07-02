import './Instructors.css';

const instructors = [
    { name: 'Sarah Chen',      title: 'Senior Web Engineer',    students: '142K', courses: 8, rating: '4.9', color: '#2563eb', initial: 'SC' },
    { name: 'Dr. Alex Kumar',  title: 'Data Science PhD',       students: '98K',  courses: 5, rating: '4.9', color: '#4361ee', initial: 'AK' },
    { name: 'Maria Gonzalez',  title: 'Lead Product Designer',  students: '67K',  courses: 6, rating: '4.8', color: '#f72585', initial: 'MG' },
];

export default function Instructors() {
    return (
        <section className="inst" aria-labelledby="inst-heading">
            <div className="inst__container">
                <div className="inst__header">
                    <span className="section-eyebrow">Instructor Spotlight</span>
                    <h2 id="inst-heading" className="inst__title">Learn from the best</h2>
                </div>

                <div className="inst__grid">
                    {instructors.map((inst) => (
                        <article key={inst.name} className="inst__card">
                            <div
                                className="inst__avatar"
                                style={{
                                    background: `linear-gradient(135deg, ${inst.color}, ${inst.color}88)`
                                }}
                                aria-hidden="true"
                            >
                                {inst.initial}
                            </div>
                            <h3 className="inst__name">{inst.name}</h3>
                            <p className="inst__role">{inst.title}</p>

                            <div className="inst__stats">
                                <div className="inst__stat">
                                    <strong>{inst.students}</strong>
                                    <span>Students</span>
                                </div>
                                <div className="inst__stat">
                                    <strong>{inst.courses}</strong>
                                    <span>Courses</span>
                                </div>
                                <div className="inst__stat">
                                    <strong>{inst.rating}</strong>
                                    <span>Rating</span>
                                </div>
                            </div>

                            <button className="inst__cta">View Courses</button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
