import { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";
import {
  getAdminInstructorByIdApi,
  getAdminInstructorsApi,
} from "../../../../api/admin/InstructorApi.js";
import { getFileUrl } from "../../../../api/PublicCourseApi.js";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import ViewInstructorModal from "../viewInstructorModal/ViewInstructorModal.jsx";
import "./InstructorTable.css";

const fmtNumber = (v) => (v == null ? "0" : new Intl.NumberFormat("vi-VN").format(v));

const API_URL = import.meta.env.VITE_API_URL || "";
const API_ORIGIN = API_URL.replace(/\/api\/learnova\/?$/, "");

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(String(value || ""));

const fallbackMediaUrl = (value) => {
  if (!value) return value;
  if (isAbsoluteUrl(value)) return value;
  if (!API_ORIGIN) return value;
  return `${API_ORIGIN}/${String(value).replace(/^\/+/, "")}`;
};

const resolveMediaUrl = async (value) => {
  if (!value) return value;
  if (isAbsoluteUrl(value)) return value;

  try {
    return await getFileUrl(value);
  } catch {
    return fallbackMediaUrl(value);
  }
};

const mapInstructor = (item) => ({
  ...item,
  instructorId: item.instructorId,
  id: item.instructorCode ?? `GV${String(item.instructorId ?? 0).padStart(3, "0")}`,
  name: item.fullName ?? "Unknown",
  email: item.email ?? "",
  specialization: item.specialization ?? item.category ?? "",
  classes: item.numberOfClasses ?? 0,
  students: fmtNumber(item.totalStudents ?? 0),
  revenue: `${fmtNumber(item.totalRevenue ?? 0)} VND`,
  isDeleted: item.isDeleted ?? false,
});

const InstructorTable = ({ searchTerm = "" }) => {
  const axiosPrivate = useAxiosPrivate();
  const [instructorsData, setInstructorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [viewError, setViewError] = useState("");
  const [error, setError] = useState("");
  const pageSize = 10;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await getAdminInstructorsApi(axiosPrivate);
        if (!mounted) return;
        setInstructorsData(Array.isArray(data) ? data.map(mapInstructor) : []);
      } catch (e) {
        console.error(e);
        setError("Could not load instructors.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [axiosPrivate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredInstructors = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return instructorsData.filter((instructor) => {
      const matchesSearch =
        !keyword ||
        [
          instructor.name,
          instructor.fullName,
          instructor.email,
          instructor.id,
          instructor.instructorCode,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return matchesSearch;
    });
  }, [instructorsData, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredInstructors.length / pageSize));
  const currentItems = filteredInstructors.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleView = async (instructor) => {
    setSelectedInstructor(instructor);
    setViewError("");
    setIsViewLoading(true);

    try {
      const detail = await getAdminInstructorByIdApi(instructor.instructorId, axiosPrivate);
      const mappedDetail = mapInstructor(detail);

      const [avatarUrl, coverImageUrl, resolvedCourses] = await Promise.all([
        resolveMediaUrl(mappedDetail.avatar),
        resolveMediaUrl(mappedDetail.coverImage),
        Promise.all(
          (mappedDetail.courses || []).map(async (course) => ({
            ...course,
            thumbnailUrl: await resolveMediaUrl(course.thumbnailKey),
          })),
        ),
      ]);

      setSelectedInstructor({
        ...mappedDetail,
        avatar: avatarUrl,
        coverImage: coverImageUrl,
        courses: resolvedCourses,
      });
    } catch (e) {
      console.error(e);
      setViewError("Could not load instructor details. Showing table data instead.");
    } finally {
      setIsViewLoading(false);
    }
  };

  return (
    <section className="instructorTableSection" aria-label="Instructor Management Table">
      <div className="instructorTableCard">
        {error ? <div className="instructorTableError" style={{ padding: 12 }}>{error}</div> : null}

        <table className="instructorTable" aria-label="Instructor List">
          <colgroup>
            <col className="instructorTableCol instructorTableCol--id" />
            <col className="instructorTableCol instructorTableCol--profile" />
            <col className="instructorTableCol instructorTableCol--classes" />
            <col className="instructorTableCol instructorTableCol--students" />
            <col className="instructorTableCol instructorTableCol--actions" />
          </colgroup>

          <thead>
            <tr>
              <th>Instructor ID</th>
              <th>Instructor / Specialization</th>
              <th>Number of Classes</th>
              <th>Students</th>
              <th>Management Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr><td colSpan="5">Loading instructors...</td></tr>
            ) : currentItems.length === 0 ? (
              <tr><td colSpan="5">No instructors found.</td></tr>
            ) : currentItems.map((instructor) => (
              <tr key={instructor.instructorId}>
                <td><span className="instructorTableBadge">{instructor.id}</span></td>
                <td>
                  <div className="instructorTableProfile">
                    <div className="instructorTableProfileText">
                      <p className="instructorTableName">{instructor.name}</p>
                      <p className="instructorTableEmail">{instructor.email}</p>
                      <span className="instructorTableTag">{instructor.specialization || "N/A"}</span>
                    </div>
                  </div>
                </td>
                <td><div className="instructorTableStat"><strong>{instructor.classes}</strong></div></td>
                <td><div className="instructorTableStat"><strong>{instructor.students}</strong></div></td>
                <td>
                  <div className="instructorTableActions">
                    <button type="button" className="instructorActionButton" aria-label="View" onClick={() => handleView(instructor)}><Eye size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="instructorTablePagination" style={{ padding: 12 }}>
          <button type="button" className="instructorPaginationButton" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} type="button" className={`instructorPaginationButton ${currentPage === p ? "instructorPaginationButton--active" : ""}`} onClick={() => setCurrentPage(p)}>{p}</button>
          ))}
          <button type="button" className="instructorPaginationButton" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>

      <ViewInstructorModal
        instructor={selectedInstructor}
        isLoading={isViewLoading}
        error={viewError}
        onClose={() => setSelectedInstructor(null)}
      />
    </section>
  );
};

export default InstructorTable;
