const CourseSummaryGrid = ({ summaryItems }) => {
  return (
    <section className="teacher-courses-summary" aria-label="Course summary">
      {summaryItems.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.label} className="teacher-courses-summary-card">
            <span className={`teacher-courses-summary-card__icon teacher-courses-summary-card__icon--${item.tone}`}>
              <Icon size={21} />
            </span>
            <div>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
              <em>{item.note}</em>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default CourseSummaryGrid;
