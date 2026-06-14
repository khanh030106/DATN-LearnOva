import { TrendingUp, Wallet } from "lucide-react";

const PayoutPanel = ({ payout }) => (
  <article className="teacher-revenue-panel teacher-revenue-payout">
    <header className="teacher-revenue-panel__header">
      <h2>Upcoming payout</h2>
    </header>

    <div className="teacher-revenue-payout-card">
      <div>
        <span>Next payout date</span>
        <strong>{payout.date}</strong>
      </div>
      <div>
        <span>Estimated amount</span>
        <strong>{payout.amount}</strong>
      </div>
      <div className="teacher-revenue-payout-progress" aria-hidden="true">
        <span />
      </div>
      <small>{payout.schedule}</small>
      <button type="button">View details</button>
      <div className="teacher-revenue-payout-visual" aria-hidden="true">
        <Wallet size={58} />
        <TrendingUp size={34} />
      </div>
    </div>
  </article>
);

export default PayoutPanel;
