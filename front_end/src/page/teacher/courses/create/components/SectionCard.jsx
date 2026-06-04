import { GripVertical, MoreVertical } from "lucide-react";

const SectionCard = ({ section, isActive, onSelect }) => {
  return (
    <button
      type="button"
      className={`teacher-section-card ${isActive ? "teacher-section-card--active" : ""}`}
      onClick={onSelect}
    >
      <GripVertical size={14} />
      <span>
        <small>Section {section.sectionOrder}</small>
        <strong>{section.title}</strong>
        <em>{section.lessons.length} lessons</em>
      </span>
      <MoreVertical size={16} />
    </button>
  );
};

export default SectionCard;
