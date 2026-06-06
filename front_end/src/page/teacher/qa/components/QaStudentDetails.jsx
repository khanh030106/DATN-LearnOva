const QaStudentDetails = ({ conversation }) => (
  <aside className="teacher-qa-details">
    <section className="teacher-qa-detail-card">
      <h3>Student Details</h3>
      <div className="teacher-qa-profile-row">
        <img src={conversation.avatar} alt={conversation.student} />
        <div>
          <strong>{conversation.student}</strong>
          <span>{conversation.email}</span>
        </div>
      </div>
      <p>Joined {conversation.joinedAt}</p>
      <p>Last active: {conversation.activeAt}</p>
    </section>
  </aside>
);

export default QaStudentDetails;
