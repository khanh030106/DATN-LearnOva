import { Code, LineChart } from "lucide-react";

import "./Path.css";

const paths = [
    {
        title: "Fullstack Developer",
        duration: "6 - 8 months • 24 courses",
        icon: Code,
        steps: [
            {
                t: "Introduction to Web & HTML/CSS",
                d: "Master web structure and modern interface design thinking.",
            },
            {
                t: "Advanced JavaScript & ReactJS",
                d: "Handle complex logic and build Single Page Applications.",
            },
            {
                t: "Backend with Node.js & Database",
                d: "Build powerful API systems and manage databases.",
            },
        ],
    },
    {
        title: "Data Scientist",
        duration: "8 - 10 months • 30 courses",
        icon: LineChart,
        steps: [
            {
                t: "Probability Math & Basic Python",
                d: "Build a foundation in mathematics and programming for data analysis.",
            },
            {
                t: "Data Mining & SQL",
                d: "Learn how to query and clean large datasets.",
            },
            {
                t: "Machine Learning & AI",
                d: "Build predictive models and apply artificial intelligence.",
            },
        ],
    },
];

const LearningPaths = () => {
    return (
        <section className="learning-section">
            <div className="learning-container">
                <div className="learning-header">
                    <h2>Structured learning paths</h2>

                    <p>
                        We design learning paths from beginner level to job-ready skills,
                        helping you confidently enter the labor market.
                    </p>
                </div>

                <div className="learning-grid">
                    {paths.map((path, i) => (
                        <div key={i} className="learning-card">
                            <div className="learning-top">
                                <div className="learning-icon">
                                    <path.icon size={28} />
                                </div>

                                <div>
                                    <h3>{path.title}</h3>
                                    <span>{path.duration}</span>
                                </div>
                            </div>

                            <div className="learning-steps">
                                {path.steps.map((step, si) => (
                                    <div key={si} className="step-item">
                                        <div className="step-number">
                                            {si + 1}
                                        </div>

                                        <div className="step-content">
                                            <h4>{step.t}</h4>
                                            <p>{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="learning-btn">
                                View course details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningPaths;