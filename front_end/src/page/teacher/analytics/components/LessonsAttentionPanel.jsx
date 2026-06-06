import { Info, TriangleAlert } from "lucide-react";

const LessonsAttentionPanel = ({ items }) => (
  <article className="teacher-analytics-panel teacher-analytics-attention">
    <header className="teacher-analytics-panel__header">
      <h2>
        Lessons Need Attention
        <Info size={15} />
      </h2>
      <button type="button">View all</button>
    </header>
    <div className="teacher-analytics-attention-list">
      {items.map((item) => (
        <button key={item.title} type="button" className={`teacher-analytics-attention-item teacher-analytics-attention-item--${item.tone}`}>
          <span>
            <TriangleAlert size={19} />
          </span>
          <strong>
            {item.title}
            <small>{item.detail}</small>
          </strong>
          <b>
            {item.value}
            <small>{item.label}</small>
          </b>
          <i aria-hidden="true">›</i>
        </button>
      ))}
    </div>
  </article>
);

export default LessonsAttentionPanel;
