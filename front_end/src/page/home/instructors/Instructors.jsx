import InstructorCard from './components/InstructorsCard.jsx'
import './Instructors.css';

import instructor1 from '../../../assets/instructors/instructor-1.jpg';
import instructor2 from '../../../assets/instructors/instructor-2.jpg';
import instructor3 from '../../../assets/instructors/instructor-3.jpg';
import instructor4 from '../../../assets/instructors/instructor-4.jpg';

const instructors = [
    {
        id: 1,
        name: 'Prof. Dr. Nguyen Van Minh',
        role: 'PHILOSOPHY & CULTURE EXPERT',
        students: '4.2k+ students',
        rating: 4.9,
        image: instructor1,
    },
    {
        id: 2,
        name: 'MSc. Le Minh Anh',
        role: 'SENIOR PRODUCT DESIGNER',
        students: '12k+ students',
        rating: 4.8,
        image: instructor2,
    },
    {
        id: 3,
        name: 'Le Quang Huy',
        role: 'DIGITAL MARKETING DIRECTOR',
        students: '8k+ students',
        rating: 4.7,
        image: instructor3,
    },
    {
        id: 4,
        name: 'Jennifer Nguyen',
        role: 'IELTS 8.5 & CORPORATE TRAINER',
        students: '5k+ students',
        rating: 5.0,
        image: instructor4,
    },
];

const Instructors = () => {
    return (
        <section className="instructors-section">
            <div className="instructors-section__header">
                <h2>An outstanding team of lecturers</h2>
                <p>
                    Learn from leading experts with years of practical experience at major corporations..
                </p>
            </div>

            <div className="instructors-section__grid">
                {instructors.map((instructor) => (
                    <InstructorCard key={instructor.id} instructor={instructor} />
                ))}
            </div>
        </section>
    );
};

export default Instructors;