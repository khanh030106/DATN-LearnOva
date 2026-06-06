import PanelHeader from "./PanelHeader.jsx";

const MonthlyRevenuePanel = ({ revenue, revenueUrl }) => {
  return (
    <section className="teacher-panel teacher-income-card">
      <PanelHeader actionLabel="View details" href={revenueUrl} title="Monthly Revenue" />
      <strong>
        {revenue.value} <small>{revenue.suffix}</small>
      </strong>
      <p>{revenue.note}</p>
      <div className="teacher-income-chart" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
};

export default MonthlyRevenuePanel;
