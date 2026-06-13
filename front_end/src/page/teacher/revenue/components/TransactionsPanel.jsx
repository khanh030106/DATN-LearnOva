const TransactionsPanel = ({ transactions }) => (
  <section className="teacher-revenue-panel-wrap">
    <header className="teacher-revenue-panel-title">
      <h2>Latest transactions</h2>
    </header>

    <article className="teacher-revenue-panel teacher-revenue-transactions">
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={`${transaction.student}-${transaction.course}`}>
            <td>{transaction.student}</td>
            <td>{transaction.course}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.method}</td>
            <td>{transaction.time}</td>
            <td>
              <span>Completed</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button type="button">View all transactions</button>
    </article>
  </section>
);

export default TransactionsPanel;
