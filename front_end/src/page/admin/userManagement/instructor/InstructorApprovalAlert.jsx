import "./InstructorApprovalAlert.css";

const alertContent = {
  title: "Thông báo hướng dẫn nghiệp vụ",
  actionLabel: "Xử lý đơn duyệt",
};

const descriptionParts = [
  {
    id: "prefix",
    type: "text",
    value: "Người dùng muốn trở thành giảng viên phải nộp đơn tại mục ",
  },
  {
    id: "highlight",
    type: "highlight",
    value: "Đơn xin trở thành giảng viên",
  },
  {
    id: "suffix",
    type: "text",
    value: ". Admin duyệt mới được nâng cấp vai trò hệ thống tương ứng.",
  },
];

const applications = [
  { id: 1, name: "Nguyễn Minh Anh", status: "Chờ duyệt" },
  { id: 2, name: "Trần Quốc Huy", status: "Chờ duyệt" },
  { id: 3, name: "Phạm Gia Hân", status: "Đã xử lý" },
];

const pendingApplications = applications.filter(
  (application) => application.status === "Chờ duyệt",
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
          <strong>Lưu ý:</strong>{" "}
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
            Nhân sự ứng tuyển:{" "}
            <span className="instructorApprovalAlertSummaryNames">
              {pendingApplicantNames.length > 0
                ? pendingApplicantNames.join(", ")
                : "Không còn đơn nào chờ duyệt"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstructorApprovalAlert;
