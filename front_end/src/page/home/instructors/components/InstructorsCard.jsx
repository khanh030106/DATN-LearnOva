import './InstructorsCard.css';

const InstructorCard = ({ instructor }) => {
    return (
        <article className="home-instructor-card">
            <div className="home-instructor-card__avatar-wrapper">
                <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="home-instructor-card__avatar"
                />
            </div>

            <h3>{instructor.name}</h3>
            <p className="home-instructor-card__role">{instructor.role}</p>

            <div className="home-instructor-card__meta">
                <span>♧ {instructor.students}</span>
                <span>•</span>
                <strong>★ {instructor.rating}</strong>
            </div>
        </article>
    );
};

export default InstructorCard;
