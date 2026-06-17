import { Ban, Eye, Flag, LockKeyhole, ShieldAlert, TriangleAlert, XCircle } from "lucide-react";
import { useState } from "react";
import "../shared/AdminDataPage.css";
import AdminHoverSelect from "../shared/AdminHoverSelect";
import "./ViolationReports.css";

const stats = [
  { label: "Open Reports", value: "27", note: "pending moderation", icon: Flag },
  { label: "Lock Threshold", value: "3", note: "reports before course lock", icon: ShieldAlert },
  { label: "Near Threshold", value: "6", note: "courses with 2 reports", icon: TriangleAlert },
  { label: "Resolved Cases", value: "118", note: "handled this quarter", icon: Ban },
];

const reportRows = [
  {
    id: "RPT-2406-001",
    target: "SEO & Content Marketing",
    count: 3,
    status: "Reviewing",
  },
  {
    id: "RPT-2406-002",
    target: "Lesson 4 discussion",
    count: 1,
    status: "Pending",
  },
  {
    id: "RPT-2406-003",
    target: "Digital Marketing Strategy review",
    count: 2,
    status: "Pending",
  },
  {
    id: "RPT-2406-004",
    target: "Instructor Nguyễn Văn Sơn",
    count: 1,
    status: "Resolved",
  },
];

const ViolationReports = () => {
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedCount, setSelectedCount] = useState("Report Count");
  const statusOptions = ["All Statuses", ...new Set(reportRows.map((row) => row.status))];
  const countOptions = ["Report Count", "1 / 3", "2 / 3", "3 / 3"];

  return (
    <section className="adminDataPage" aria-label="Violation reports">
      <div className="adminDataContent">
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
          <input type="search" placeholder="Search report ID or target..." />
          <AdminHoverSelect
            options={["All Types", "Course", "Lesson", "Instructor"]}
            value={selectedType}
            onChange={setSelectedType}
            ariaLabel="Filter reports by type"
          />
          <AdminHoverSelect
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            ariaLabel="Filter reports by status"
          />
          <AdminHoverSelect
            options={countOptions}
            value={selectedCount}
            onChange={setSelectedCount}
            ariaLabel="Sort reports by count"
          />
        </div>

        <div className="adminDataTableCard">
          <table className="adminDataTable violationReportsTable">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Target</th>
                <th>Count</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.target}</td>
                  <td>
                    <span className={row.count >= 3 ? "adminDataStatus adminDataStatus--locked" : "adminDataStatus adminDataStatus--warning"}>
                      {row.count} / 3
                    </span>
                  </td>
                  <td>
                    <span className={`adminDataStatus adminDataStatus--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="adminDataActions">
                      <button type="button" className="adminDataIconButton" aria-label={`View ${row.id}`}>
                        <Eye size={16} />
                      </button>
                      <button type="button" className="adminDataIconButton" aria-label={`Lock course for ${row.id}`}>
                        <LockKeyhole size={16} />
                      </button>
                      <button type="button" className="adminDataIconButton" aria-label={`Dismiss ${row.id}`}>
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

export default ViolationReports;
