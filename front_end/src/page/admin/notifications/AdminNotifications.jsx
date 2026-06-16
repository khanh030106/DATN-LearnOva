import { Bell, CheckCircle2, Clock, Eye, GraduationCap, MailCheck, XCircle } from "lucide-react";
import { useState } from "react";
import "../shared/AdminDataPage.css";
import AdminHoverSelect from "../shared/AdminHoverSelect";

const stats = [
  { label: "New Notifications", value: "12", note: "unread admin alerts", icon: Bell },
  { label: "Teacher Requests", value: "5", note: "waiting for approval", icon: GraduationCap },
  { label: "Marked Read", value: "48", note: "handled this month", icon: MailCheck },
  { label: "Pending Review", value: "7", note: "needs admin action", icon: Clock },
];

const notifications = [
  {
    id: "NOTI-2406-001",
    user: "Nguyễn Nhật Minh",
    email: "nhatminh@learnova.com",
    type: "Teacher Request",
    message: "User submitted a request to become an instructor.",
    status: "New",
    sentAt: "2026-06-14 08:30",
  },
  {
    id: "NOTI-2406-002",
    user: "Trần Minh Quân",
    email: "minhquan@learnova.com",
    type: "Teacher Request",
    message: "Profile and portfolio are ready for admin review.",
    status: "Pending",
    sentAt: "2026-06-13 16:45",
  },
  {
    id: "NOTI-2406-003",
    user: "System",
    email: "system@learnova.com",
    type: "Violation Alert",
    message: "A course reached 3 reports and may need locking.",
    status: "New",
    sentAt: "2026-06-12 14:20",
  },
  {
    id: "NOTI-2406-004",
    user: "Lê Thanh Hà",
    email: "thanhha@learnova.com",
    type: "Teacher Request",
    message: "Teacher request was reviewed and approved.",
    status: "Read",
    sentAt: "2026-06-10 09:10",
  },
];

const AdminNotifications = () => {
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedReadStatus, setSelectedReadStatus] = useState("Unread");
  const [selectedRequestType, setSelectedRequestType] = useState("Teacher Requests");
  const typeOptions = ["All Types", ...new Set(notifications.map((item) => item.type))];

  return (
    <section className="adminDataPage" aria-label="Admin notification center">
      <div className="adminDataContent">
        <div className="adminDataHeader">
          <div>
            <h1>Notification Center</h1>
            <p>Review teacher upgrade requests, system alerts, and admin action notifications.</p>
          </div>
          <button type="button" className="adminDataHeaderAction">
            <MailCheck size={18} />
            Mark as read
          </button>
        </div>

        <div className="adminDataStats">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article className="adminDataStatCard" key={item.label}>
                <span className="adminDataStatIcon">
                  <Icon size={22} />
                </span>
                <div>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                  <small>{item.note}</small>
                </div>
              </article>
            );
          })}
        </div>

        <div className="adminDataFilters">
          <input type="search" placeholder="Search notification, user, email..." />
          <AdminHoverSelect
            options={typeOptions}
            value={selectedType}
            onChange={setSelectedType}
            ariaLabel="Filter notifications by type"
          />
          <AdminHoverSelect
            options={["Unread", "Read", "All Statuses"]}
            value={selectedReadStatus}
            onChange={setSelectedReadStatus}
            ariaLabel="Filter notifications by read status"
          />
          <AdminHoverSelect
            options={["Teacher Requests", "Violation Alerts", "All Requests"]}
            value={selectedRequestType}
            onChange={setSelectedRequestType}
            ariaLabel="Filter notifications by request type"
          />
        </div>

        <div className="adminDataTableCard">
          <table className="adminDataTable">
            <thead>
              <tr>
                <th>Notification ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Message</th>
                <th>Status</th>
                <th>Sent At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="adminDataCellLeft">
                    <span className="adminDataTextStrong">{item.user}</span>
                    <span className="adminDataTextMuted">{item.email}</span>
                  </td>
                  <td>{item.type}</td>
                  <td className="adminDataCellLeft">{item.message}</td>
                  <td>
                    <span className={`adminDataStatus adminDataStatus--${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.sentAt}</td>
                  <td>
                    <div className="adminDataActions">
                      <button type="button" className="adminDataIconButton" aria-label={`View ${item.id}`}>
                        <Eye size={16} />
                      </button>
                      <button type="button" className="adminDataIconButton" aria-label={`Approve ${item.id}`}>
                        <CheckCircle2 size={16} />
                      </button>
                      <button type="button" className="adminDataIconButton" aria-label={`Reject ${item.id}`}>
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminNotifications;
