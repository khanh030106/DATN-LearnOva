import { ArrowRight } from "lucide-react";

const PanelHeader = ({ actionLabel, href, title, titleLevel = "h2" }) => {
  const Heading = titleLevel;

  return (
    <div className="teacher-panel__header">
      <Heading>{title}</Heading>
      <a href={href}>
        {actionLabel}
        <ArrowRight size={16} />
      </a>
    </div>
  );
};

export default PanelHeader;
