import { TrendingUp, Wallet } from "lucide-react";

const PayoutPanel = ({ payout }) => (
  <section className="teacher-revenue-panel-wrap">
    <header className="teacher-revenue-panel-title">
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
  </section>
);

export default PayoutPanel;
