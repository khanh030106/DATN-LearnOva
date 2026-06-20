import { useState, useEffect } from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";
import {
  getAdminInstructorsApi,
  getAdminInstructorByIdApi,
  updateAdminInstructorApi,
  deleteAdminInstructorApi,
} from "../../../../api/AdminInstructorApi.js";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import ViewInstructorModal from "../viewInstructorModal/ViewInstructorModal.jsx";
import "./InstructorTable.css";

const fmtNumber = (v) => (v == null ? "0" : new Intl.NumberFormat("vi-VN").format(v));

const mapInstructor = (item) => ({
  ...item,
  instructorId: item.instructorId,
  id: item.instructorCode ?? `GV${String(item.instructorId ?? 0).padStart(3, "0")}`,
  name: item.fullName ?? "Unknown",
  email: item.email ?? "",
  specialization: item.specialization ?? "",
  classes: item.numberOfClasses ?? 0,
  students: fmtNumber(item.totalStudents ?? 0),
  revenue: `${fmtNumber(item.totalRevenue ?? 0)} đ`,
  status: item.isActive ? "Active" : "Paused",
});

const InstructorTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const [instructorsData, setInstructorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [viewError, setViewError] = useState("");
  const [error, setError] = useState("");
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(instructorsData.length / pageSize));
  const currentItems = instructorsData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
        setError("Không tải được danh sách giảng viên.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [axiosPrivate]);

  const handleView = async (instructor) => {
    setSelectedInstructor(instructor);
    setViewError("");
    setIsViewLoading(true);

    try {
      const detail = await getAdminInstructorByIdApi(instructor.instructorId, axiosPrivate);
      setSelectedInstructor(mapInstructor(detail));
    } catch (e) {
      console.error(e);
      setViewError("Không tải được chi tiết giảng viên. Đang hiển thị dữ liệu trong bảng.");
    } finally {
      setIsViewLoading(false);
    }
  };

  const handleEdit = async (instructor) => {
    const fullName = window.prompt("Sửa tên giảng viên", instructor.name);
    if (!fullName) return;
    try {
      const updated = await updateAdminInstructorApi(instructor.instructorId, {
        fullName,
        email: instructor.email,
        avatar: null,
        phone: null,
        gender: null,
        isActive: instructor.status === "Active",
      }, axiosPrivate);
      setInstructorsData((s) => s.map((it) => it.instructorId === updated.instructorId ? mapInstructor(updated) : it));
    } catch {
      setError("Cập nhật thất bại.");
    }
  };

  const handleDelete = async (instructor) => {
    if (!window.confirm(`Xóa giảng viên ${instructor.name}?`)) return;
    try {
      await deleteAdminInstructorApi(instructor.instructorId, axiosPrivate);
      setInstructorsData((s) => s.filter((it) => it.instructorId !== instructor.instructorId));
    } catch {
      setError("Xóa thất bại.");
    }
  };

  return (
    <section className="instructorTableSection" aria-label="Instructor Management Table">
      <div className="instructorTableCard">
        

        {error ? <div className="instructorTableError" style={{ padding: 12 }}>{error}</div> : null}

        <table className="instructorTable" aria-label="Instructor List">
          <colgroup>
            <col className="instructorTableCol instructorTableCol--id"/>
            <col className="instructorTableCol instructorTableCol--profile"/>
            <col className="instructorTableCol instructorTableCol--classes"/>
            <col className="instructorTableCol instructorTableCol--students"/>
            <col className="instructorTableCol instructorTableCol--actions"/>
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
              <tr><td colSpan="5">Đang tải...</td></tr>
            ) : currentItems.length === 0 ? (
              <tr><td colSpan="5">Không có giảng viên.</td></tr>
            ) : currentItems.map((instructor) => (
              <tr key={instructor.instructorId}>
                <td><span className="instructorTableBadge">{instructor.id}</span></td>
                <td>
                  <div className="instructorTableProfile">
                    <div className="instructorTableProfileText">
                      <p className="instructorTableName">{instructor.name}</p>
                      <p className="instructorTableEmail">{instructor.email}</p>
                      <span className="instructorTableTag">{instructor.specialization}</span>
                    </div>
                  </div>
                </td>
                <td><div className="instructorTableStat"><strong>{instructor.classes}</strong></div></td>
                <td><div className="instructorTableStat"><strong>{instructor.students}</strong></div></td>
                <td>
                  <div className="instructorTableActions">
                    <button type="button" className="instructorActionButton" aria-label="View" onClick={() => handleView(instructor)}><Eye size={16}/></button>
                    <button type="button" className="instructorActionButton" aria-label="Edit" onClick={() => handleEdit(instructor)}><Edit3 size={16}/></button>
                    <button type="button" className="instructorActionButton instructorActionButton--danger" aria-label="Delete" onClick={() => handleDelete(instructor)}><Trash2 size={16}/></button>
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
