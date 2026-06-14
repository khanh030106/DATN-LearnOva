import {Check} from "lucide-react";

const steps = ["Course", "Sections", "Preview", "Publish"];

const CourseCreationStepper = ({currentStep}) => {
    return (
        <nav className="teacher-create-stepper" aria-label="Course creation progress">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isComplete = stepNumber < currentStep;

                return (
                    <div
                        key={step}
                        className={`teacher-create-stepper__item ${isActive ? "teacher-create-stepper__item--active" : ""}`}
                    >
                        <span>{isComplete ? <Check size={13}/> : stepNumber}</span>
                        <strong>{step}</strong>
                    </div>
                );
            })}
        </nav>
    );
};

export default CourseCreationStepper;
