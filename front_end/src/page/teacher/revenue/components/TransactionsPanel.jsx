const TransactionsPanel = ({ transactions }) => (
  <article className="teacher-revenue-panel teacher-revenue-transactions">
    <header className="teacher-revenue-panel__header">
      <h2>Latest transactions</h2>
    </header>

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
);

export default TransactionsPanel;
