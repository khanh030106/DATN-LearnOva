import {
    School,
    History,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

import "./Roles.css";

const roles = [
    {
        title: "Student",
        desc: "Access thousands of high-quality courses...",
        icon: School,
        link: "Learn More",
    },
    {
        title: "Instructor",
        desc: "Build your personal brand...",
        icon: History,
        link: "Become an Instructor",
    },
    {
        title: "Administrator",
        desc: "Efficiently manage internal training...",
        icon: ShieldCheck,
        link: "Enterprise Solutions",
    },
];

const Roles = ({ onSelectRole }) => {
    return (
        <section className="roles-section">
            <div className="roles-header">
                <h2>Reaching further together</h2>

                <p>
                    Choose your role to explore specialized features designed specifically for you.
                </p>
            </div>

            <div className="roles-grid">
                {roles.map((role, i) => (
                    <div
                        key={i}
                        onClick={() => onSelectRole?.(role.title)}
                        className="role-card"
                    >
                        <div className="role-icon">
                            <role.icon size={24} />
                        </div>

                        <h3>{role.title}</h3>

                        <p>{role.desc}</p>

                        <button className="role-btn">
                            {role.link}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Roles;