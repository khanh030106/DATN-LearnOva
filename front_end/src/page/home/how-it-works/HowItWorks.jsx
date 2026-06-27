import { Compass, Code2, Briefcase } from 'lucide-react';
import './HowItWorks.css';

const steps = [
    {
        number: '01',
        icon: Compass,
        title: 'Choose Your Path',
        desc: 'Pick a structured career track aligned to your goal. Not a category — a destination with a roadmap already built.',
    },
    {
        number: '02',
        icon: Code2,
        title: 'Learn by Doing',
        desc: 'Video lessons, real projects, and expert feedback. Every course builds directly on the one before it.',
    },
    {
        number: '03',
        icon: Briefcase,
        title: 'Land the Outcome',
        desc: 'Earn your certificate, build your portfolio, and connect with hiring partners in our network.',
    },
];

export default function HowItWorks() {
    return (
        <section className="hiw" aria-labelledby="hiw-heading">
            <div className="hiw__container">
                <div className="hiw__header">
                    <span className="section-eyebrow">The System</span>
                    <h2 id="hiw-heading" className="hiw__title">
                        Not a course marketplace.<br />
                        A career system.
                    </h2>
                </div>

                <div className="hiw__steps">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.number} className="hiw__step-wrap">
                                <div className="hiw__step">
                                    <div className="hiw__number">{step.number}</div>
                                    <div className="hiw__icon-wrap">
                                        <Icon size={26} />
                                    </div>
                                    <h3 className="hiw__step-title">{step.title}</h3>
                                    <p className="hiw__step-desc">{step.desc}</p>
                                </div>

                                {i < steps.length - 1 && (
                                    <div className="hiw__arrow" aria-hidden="true">›</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
