import { Ban, Eye, Flag, LockKeyhole, Megaphone, ShieldAlert, TriangleAlert } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminCourseDetailApi } from "../../../api/admin/CourseApi.js";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import { CourseViewModal } from "../course/courseTable/CourseTable.jsx";
import "../course/courseTable/CourseTable.css";
import "../shared/AdminDataPage.css";
import AdminHoverSelect from "../shared/AdminHoverSelect";
import ModerationActionModal from "./ModerationActionModal.jsx";
import "./ViolationReports.css";

const REASON_LABELS = {
  MISLEADING_CONTENT: "Nội dung sai / gây hiểu nhầm",
  SENSITIVE_CONTENT: "Nội dung nhạy cảm / không phù hợp",
  SPAM: "Spam / quảng cáo",
  COPYRIGHT: "Vi phạm bản quyền",
  OTHER: "Lý do khác",
};

const formatStatus = (status) => {
  const map = {
    PENDING: "Chờ xử lý",
    REVIEWING: "Đang xem xét",
    RESOLVED: "Đã xử lý",
    DISMISSED: "Đã bỏ qua",
  };
  if (!status) return "Chờ xử lý";
  return map[status] || status.charAt(0) + status.slice(1).toLowerCase();
};

const apiErrorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.response?.data?.error || fallback;

const normalizeReportText = (value) => {
  if (value == null) return "";
  const text = String(value).trim();
  if (!text || text === "null" || text === "undefined") return "";
  return text;
};

const normalizeCourseDetail = (course = {}) => ({
  ...course,
  id: course.id,
  thumbnailKey: course.thumbnailKey ?? "",
  title: course.title ?? "N/A",
  slug: course.slug ?? "",
  description: course.description ?? "",
  language: course.language ?? "N/A",
  requirements: Array.isArray(course.requirements) ? course.requirements : [],
  whatYouLearn: Array.isArray(course.whatYouLearn) ? course.whatYouLearn : [],
  basePrice: course.basePrice ?? 0,
  level: course.level ?? "N/A",
  status: course.status ?? "N/A",
  instructorId: course.instructorId ?? null,
  instructorName: course.instructorName ?? "N/A",
  categoryId: course.categoryId ?? null,
  categoryName: course.categoryName ?? null,
  publishedAt: course.publishedAt ?? null,
  lessonCount: course.lessonCount ?? 0,
  totalDurationSeconds: course.totalDurationSeconds ?? 0,
  sections: Array.isArray(course.sections) ? course.sections : [],
});

const ViolationReports = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    openReports: 0,
    reportedCourses: 0,
    hiddenByModeration: 0,
    resolvedCases: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả trạng thái");
  const [selectedCount, setSelectedCount] = useState("Số báo cáo");
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [actionModal, setActionModal] = useState(null); // { kind: 'warn'|'hide', report }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        axiosPrivate.get("/admin/reports"),
        axiosPrivate.get("/admin/reports/stats"),
      ]);
      setReports(Array.isArray(listRes.data) ? listRes.data : []);
      setStats(
        statsRes.data || {
          openReports: 0,
          reportedCourses: 0,
          hiddenByModeration: 0,
          resolvedCases: 0,
        },
      );
    } catch (err) {
      toast.error(apiErrorMessage(err, "Không tải được danh sách báo cáo."));
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const closeCourseView = () => {
    setSelectedReport(null);
    setViewCourse(null);
    setViewLoading(false);
  };

  const openReportView = useCallback(
    async (row) => {
      if (!row?.courseId) {
        toast.error("Báo cáo thiếu mã khóa học.");
        return;
      }
      setSelectedReport(row);
      setViewCourse(null);
      setViewLoading(true);
      try {
        const detail = await getAdminCourseDetailApi(row.courseId, axiosPrivate);
        setViewCourse(normalizeCourseDetail(detail));
      } catch (err) {
        toast.error(apiErrorMessage(err, "Không tải được chi tiết khóa học."));
        setSelectedReport(null);
      } finally {
        setViewLoading(false);
      }
    },
    [axiosPrivate],
  );

  useEffect(() => {
    const focusId = searchParams.get("id");
    if (!focusId || reports.length === 0) return;
    const found = reports.find(
      (r) =>
        String(r.id) === String(focusId) ||
        String(r.reportKey) === String(focusId) ||
        String(r.reportCode) === String(focusId),
    );
    if (found) {
      void openReportView(found);
      searchParams.delete("id");
      setSearchParams(searchParams, { replace: true });
    }
  }, [reports, searchParams, setSearchParams, openReportView]);

  useEffect(() => {
    if (!selectedReport?.id || reports.length === 0) return;
    const fresh = reports.find((r) => r.id === selectedReport.id);
    if (fresh) setSelectedReport(fresh);
  }, [reports, selectedReport?.id]);

  const statusOptions = useMemo(
    () => ["Tất cả trạng thái", ...new Set(reports.map((row) => formatStatus(row.status)))],
    [reports],
  );

  const countOptions = useMemo(() => {
    const counts = [...new Set(reports.map((row) => Number(row.reportCount) || 0))]
      .filter((n) => n > 0)
      .sort((a, b) => b - a);
    return ["Số báo cáo", ...counts.map((n) => String(n))];
  }, [reports]);

  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = reports.filter((row) => {
      const statusLabel = formatStatus(row.status);
      const matchesStatus =
        selectedStatus === "Tất cả trạng thái" || statusLabel === selectedStatus;
      const matchesCount =
        selectedCount === "Số báo cáo" || String(row.reportCount) === selectedCount;
      const haystack = [
        row.reportCode,
        row.courseTitle,
        row.lessonTitle,
        row.reporterName,
        row.reason,
        REASON_LABELS[row.reason],
        row.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      return matchesStatus && matchesCount && matchesSearch;
    });

    if (selectedCount !== "Số báo cáo") {
      rows = [...rows].sort((a, b) => (b.reportCount || 0) - (a.reportCount || 0));
    }
    return rows;
  }, [reports, search, selectedStatus, selectedCount]);

  const statCards = [
    { label: "Báo cáo đang mở", value: stats.openReports, note: "chờ admin xử lý", icon: Flag },
    {
      label: "Khóa đang bị báo cáo",
      value: stats.reportedCourses,
      note: "có báo cáo chưa đóng",
      icon: TriangleAlert,
    },
    {
      label: "Đã ẩn bởi kiểm duyệt",
      value: stats.hiddenByModeration,
      note: "khóa đã bị ẩn",
      icon: ShieldAlert,
    },
    { label: "Đã xử lý", value: stats.resolvedCases, note: "đã đóng / đã xử lý", icon: Ban },
  ];

  const openWarnModal = (row) => setActionModal({ kind: "warn", report: row });
  const openHideModal = (row) => {
    if (row.courseHidden) {
      toast.info("Khóa học này đã bị ẩn rồi.");
      return;
    }
    setActionModal({ kind: "hide", report: row });
  };

  const closeActionModal = () => {
    if (actionLoadingId) return;
    setActionModal(null);
  };

  const submitHide = async (row) => {
    setActionLoadingId(row.id);
    try {
      await axiosPrivate.patch(`/admin/reports/${row.id}/hide-course`);
      toast.success("Đã ẩn khóa học. Giảng viên đã được thông báo.");
      setActionModal(null);
      closeCourseView();
      await loadData();
    } catch (err) {
      toast.error(apiErrorMessage(err, "Ẩn khóa học thất bại."));
    } finally {
      setActionLoadingId(null);
    }
  };

  const submitWarn = async (row, message) => {
    setActionLoadingId(row.id);
    try {
      await axiosPrivate.patch(`/admin/reports/${row.id}/warn-instructor`, {
        message: message || null,
      });
      toast.success("Đã gửi thông báo cho giảng viên để họ tự sửa nội dung video.");
      setActionModal(null);
      await loadData();
    } catch (err) {
      toast.error(apiErrorMessage(err, "Gửi thông báo cho giảng viên thất bại."));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleActionConfirm = async (message) => {
    if (!actionModal?.report) return;
    if (actionModal.kind === "warn") {
      await submitWarn(actionModal.report, message);
      return;
    }
    await submitHide(actionModal.report);
  };

  const reportDescription = normalizeReportText(selectedReport?.description);
  const reportReason = REASON_LABELS[selectedReport?.reason] || selectedReport?.reason || "—";
  const moderationHint = selectedReport?.instructorWarned
    ? "Đã gửi thông báo cho giảng viên — họ có thể tự cập nhật video."
    : "Bấm “Thông báo giảng viên” để yêu cầu họ tự sửa nội dung bị báo cáo.";

  return (
    <section className="adminDataPage" aria-label="Violation reports">
      <div className="adminDataContent">
        <div className="adminDataStats">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <article className="adminDataStatCard" key={item.label}>
                <span className="adminDataStatIcon">
                  <Icon size={22} />
                </span>
                <div>
                  <strong>{loading ? "…" : item.value}</strong>
                  <p>{item.label}</p>
                  <small>{item.note}</small>
                </div>
              </article>
            );
          })}
        </div>

        <div className="adminDataFilters">
          <input
            type="search"
            placeholder="Tìm mã báo cáo hoặc tên khóa học..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AdminHoverSelect
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            ariaLabel="Lọc theo trạng thái"
          />
          <AdminHoverSelect
            options={countOptions}
            value={selectedCount}
            onChange={setSelectedCount}
            ariaLabel="Lọc theo số báo cáo"
          />
        </div>

        <div className="adminDataTableCard">
          <table className="adminDataTable violationReportsTable">
            <thead>
              <tr>
                <th>Mã báo cáo</th>
                <th>Đối tượng</th>
                <th>Số lần</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5}>Đang tải báo cáo…</td>
                </tr>
              )}
              {!loading && filteredReports.length === 0 && (
                <tr>
                  <td colSpan={5}>Chưa có báo cáo vi phạm nào.</td>
                </tr>
              )}
              {!loading &&
                filteredReports.map((row) => {
                  const statusLabel = formatStatus(row.status);
                  const target = row.lessonTitle
                    ? `${row.courseTitle} · ${row.lessonTitle}`
                    : row.courseTitle;
                  return (
                    <tr key={row.id}>
                      <td>{row.reportCode || `RPT-${row.id}`}</td>
                      <td>
                        <div className="violation-report-target">
                          <span>{target}</span>
                          {row.severity === "HIGH" ? (
                            <small className="violation-report-severity">Mức độ cao</small>
                          ) : null}
                        </div>
                      </td>
                      <td>
                        <span className="adminDataStatus adminDataStatus--warning">{row.reportCount}</span>
                      </td>
                      <td>
                        <span className={`adminDataStatus adminDataStatus--${String(row.status || "pending").toLowerCase()}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td>
                        <div className="adminDataActions">
                          <button
                            type="button"
                            className="adminDataIconButton"
                            aria-label={`Xem ${row.reportCode}`}
                            title="Xem toàn bộ khóa học và video bị báo cáo"
                            onClick={() => openReportView(row)}
                            disabled={actionLoadingId === row.id || viewLoading}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            className="adminDataIconButton"
                            aria-label={`Thông báo giảng viên ${row.reportCode}`}
                            title="Thông báo giảng viên tự sửa nội dung video"
                            onClick={() => openWarnModal(row)}
                            disabled={actionLoadingId === row.id}
                          >
                            <Megaphone size={16} />
                          </button>
                          <button
                            type="button"
                            className="adminDataIconButton"
                            aria-label={`Ẩn khóa ${row.reportCode}`}
                            title="Ẩn khóa học khỏi học viên"
                            onClick={() => openHideModal(row)}
                            disabled={actionLoadingId === row.id || row.courseHidden}
                          >
                            <LockKeyhole size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {viewLoading && (
        <div className="violation-report-loading-overlay" role="status">
          Đang tải chi tiết khóa học…
        </div>
      )}

      {viewCourse && selectedReport && (
        <>
          <div className="violation-report-banner">
            <div className="violation-report-banner__info">
              <strong>{selectedReport.reportCode || `RPT-${selectedReport.id}`}</strong>
              <span>
                Lý do: {reportReason}
                {selectedReport.severity === "HIGH" ? " · Mức độ cao" : ""}
                {selectedReport.reporterName ? ` · Người báo cáo: ${selectedReport.reporterName}` : ""}
              </span>
              <span className="violation-report-banner__description">
                Ghi chú: {reportDescription || "Không có mô tả thêm."}
              </span>
              {selectedReport.lessonTitle ? (
                <span>Bài học bị báo cáo: {selectedReport.lessonTitle}</span>
              ) : null}
              <span className="violation-report-banner__hint">{moderationHint}</span>
            </div>
            <div className="violation-report-banner__actions">
              <button
                type="button"
                className="violation-report-btn"
                onClick={() => openWarnModal(selectedReport)}
                disabled={actionLoadingId === selectedReport.id}
              >
                Thông báo giảng viên
              </button>
              <button
                type="button"
                className="violation-report-btn danger"
                onClick={() => openHideModal(selectedReport)}
                disabled={selectedReport.courseHidden || actionLoadingId === selectedReport.id}
              >
                Ẩn khóa học
              </button>
              <button type="button" className="violation-report-btn ghost" onClick={closeCourseView}>
                Đóng
              </button>
            </div>
          </div>
          <CourseViewModal
            course={viewCourse}
            onClose={closeCourseView}
            focusLessonId={selectedReport.lessonId}
            enableVideoPreview
          />
        </>
      )}

      {actionModal ? (
        <ModerationActionModal
          kind={actionModal.kind}
          report={actionModal.report}
          isSubmitting={actionLoadingId === actionModal.report?.id}
          onCancel={closeActionModal}
          onConfirm={handleActionConfirm}
        />
      ) : null}
    </section>
  );
};

export default ViolationReports;
