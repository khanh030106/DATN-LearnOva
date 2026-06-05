import "./InstructorApprovalAlert.css";

const alertContent = {
  title: "Instructor Application Notice",
  actionLabel: "Review Applications",
};

const descriptionParts = [
  {
    id: "prefix",
    type: "text",
    value:
      "Users who want to become instructors must submit an application at the ",
  },
  {
    id: "highlight",
    type: "highlight",
    value: "Instructor Application",
  },
  {
    id: "suffix",
    type: "text",
    value:
      ". Admin must review and approve applications to upgrade user roles.",
  },
];

const applications = [
  { id: 1, name: "Nguyễn Minh Anh", status: "Pending Review" },
  { id: 2, name: "Trần Quốc Huy", status: "Pending Review" },
  { id: 3, name: "Phạm Gia Hân", status: "Processed" },
];

const pendingApplications = applications.filter(
  (application) => application.status === "Pending Review",
);

const pendingApplicantNames = pendingApplications.map(
  (application) => application.name,
);

const alertActions = [
  {
    id: "review-applications",
    label: alertContent.actionLabel,
    count: pendingApplications.length,
  },
];

const InstructorApprovalAlert = () => {
  return (
    <section
      className="instructorApprovalAlert"
      aria-label={alertContent.title}
    >
      <div className="instructorApprovalAlertDecoration" aria-hidden="true" />

      <div className="instructorApprovalAlertIcon" aria-hidden="true">
        !
      </div>

      <div className="instructorApprovalAlertContent">
        <h4 className="instructorApprovalAlertTitle">{alertContent.title}</h4>

        <p className="instructorApprovalAlertDescription">
          <strong>Note:</strong>{" "}
          {descriptionParts.map((part) => {
            if (part.type === "highlight") {
              return (
                <span
                  key={part.id}
                  className="instructorApprovalAlertHighlight"
                >
                  {part.value}
                </span>
              );
            }

            return <span key={part.id}>{part.value}</span>;
          })}
        </p>

        <div className="instructorApprovalAlertActions">
          {alertActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className="instructorApprovalAlertButton"
            >
              {action.label} ({action.count})
            </button>
          ))}

          <p className="instructorApprovalAlertSummary">
            Pending Applicants:{" "}
            <span className="instructorApprovalAlertSummaryNames">
              {pendingApplicantNames.length > 0
                ? pendingApplicantNames.join(", ")
                : "No pending applications"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstructorApprovalAlert;
