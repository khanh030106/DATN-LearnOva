import {useState} from "react";
import {Monitor, Smartphone, Tablet} from "lucide-react";
import CoursePreview from "./CoursePreview.jsx";

const DEVICES = [
    {key: "Desktop", icon: Monitor},
    {key: "Tablet",  icon: Tablet},
    {key: "Mobile",  icon: Smartphone},
];

const PreviewStep = ({course, sections, onPrevious, onNext}) => {
    const [device, setDevice] = useState("Desktop");

    return (
        <section className="teacher-create-step">
            <div className="teacher-preview-toolbar">
                <span>Preview as student</span>
                <div className="teacher-device-toggle">
                    {DEVICES.map(({key, icon: Icon}) => (
                        <button
                            key={key}
                            type="button"
                            aria-label={`${key} preview`}
                            aria-pressed={device === key}
                            className={device === key ? "teacher-device-toggle__btn--active" : ""}
                            onClick={() => setDevice(key)}
                        >
                            <Icon size={16}/>
                        </button>
                    ))}
                </div>
            </div>

            <CoursePreview course={course} sections={sections} previewDevice={device}/>

            <footer className="teacher-create-actions">
                <button type="button" onClick={onPrevious}>
                    Previous: Sections
                </button>
                <button type="button" onClick={onNext}>
                    Next: Publish
                </button>
            </footer>
        </section>
    );
};

export default PreviewStep;
