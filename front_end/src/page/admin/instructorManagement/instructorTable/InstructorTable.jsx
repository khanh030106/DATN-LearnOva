import { useEffect, useMemo, useState } from "react";
import { Edit3, Eye, Trash2 } from "lucide-react";
import {
  createAdminInstructorApi,
  deleteAdminInstructorApi,
  getAdminInstructorByIdApi,
  getAdminInstructorsApi,
  updateAdminInstructorApi,
} from "../../../../api/admin/InstructorApi.js";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import DeleteInstructorModal from "../viewInstructorModal/DeleteInstructorModal.jsx";
import InstructorFormModal, {
  getTodayValue,
  toDateInputValue,
} from "../viewInstructorModal/InstructorFormModal.jsx";
import ViewInstructorModal from "../viewInstructorModal/ViewInstructorModal.jsx";
import "./InstructorTable.css";

const emptyForm = {
  fullName: "",
  email: "",
  password: "",
  avatar: "",
  coverImage: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
};

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
  isDeleted: item.isDeleted ?? false,
});

const toForm = (instructor) => ({
  fullName: instructor.fullName || instructor.name || "",
  email: instructor.email || "",
  password: "",
  avatar: instructor.avatar || "",
  coverImage: instructor.coverImage || "",
  phone: instructor.phone || "",
  dateOfBirth: toDateInputValue(instructor.dateOfBirth),
  gender: instructor.gender || "",
});

const buildPayload = (form, includePassword) => ({
  fullName: form.fullName.trim(),
  email: form.email.trim(),
  avatar: form.avatar.trim() || null,
  coverImage: form.coverImage.trim() || null,
  phone: form.phone.trim() || null,
  dateOfBirth: form.dateOfBirth || null,
  gender: form.gender || null,
  ...(includePassword ? { password: form.password } : {}),
});

const validateForm = (form, mode) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^0[0-9]{9}$/;

  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!emailRegex.test(form.email.trim())) errors.email = "Email is invalid.";

  if (mode === "create") {
    if (!form.password) errors.password = "Password is required.";
    else if (form.password.length < 6) errors.password = "Password must contain at least 6 characters.";
  }

  if (form.phone && !phoneRegex.test(form.phone)) {
    errors.phone = "Phone number must start with 0 and contain exactly 10 digits.";
  }

  if (form.dateOfBirth && form.dateOfBirth > getTodayValue()) {
    errors.dateOfBirth = "Date of birth cannot be in the future.";
  }

  return errors;
};

const InstructorTable = ({
  searchTerm = "",
  isCreateOpen = false,
  onCreateClose = () => {},
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [instructorsData, setInstructorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [viewError, setViewError] = useState("");
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState(null);
  const [formInstructor, setFormInstructor] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitError, setFormSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteInstructor, setDeleteInstructor] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
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

  useEffect(() => {
    if (isCreateOpen) {
      setFormMode("create");
      setFormInstructor(null);
      setFormData(emptyForm);
      setFormErrors({});
      setFormSubmitError("");
    }
  }, [isCreateOpen]);

  const refreshInstructors = async () => {
    try {
      const data = await getAdminInstructorsApi(axiosPrivate);
      setInstructorsData(Array.isArray(data) ? data.map(mapInstructor) : []);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredInstructors = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return instructorsData.filter((instructor) => {
      const matchesSearch =
        !keyword ||
        [
          instructor.name,
          instructor.fullName,
          instructor.email,
          instructor.specialization,
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

  const closeForm = () => {
    setFormMode(null);
    setFormInstructor(null);
    setFormData(emptyForm);
    setFormErrors({});
    setFormSubmitError("");
    if (isCreateOpen) onCreateClose();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((current) => ({ ...current, [name]: nextValue }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
    setFormSubmitError("");
  };

  const handleView = async (instructor) => {
    setSelectedInstructor(instructor);
    setViewError("");
    setIsViewLoading(true);

    try {
      const detail = await getAdminInstructorByIdApi(instructor.instructorId, axiosPrivate);
      setSelectedInstructor(mapInstructor(detail));
    } catch (e) {
      console.error(e);
      setViewError("Could not load instructor details. Showing table data instead.");
    } finally {
      setIsViewLoading(false);
    }
  };

  const handleEdit = async (instructor) => {
    setFormMode("edit");
    setFormInstructor(instructor);
    setFormData(toForm(instructor));
    setFormErrors({});
    setFormSubmitError("");

    try {
      const detail = await getAdminInstructorByIdApi(instructor.instructorId, axiosPrivate);
      const mappedDetail = mapInstructor(detail);
      setFormInstructor(mappedDetail);
      setFormData(toForm(mappedDetail));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData, formMode);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);
    setFormSubmitError("");

    try {
      if (formMode === "create") {
        const created = await createAdminInstructorApi(buildPayload(formData, true), axiosPrivate);
        setInstructorsData((current) => [...current, mapInstructor(created)]);
      } else if (formMode === "edit" && formInstructor) {
        const updated = await updateAdminInstructorApi(
          formInstructor.instructorId,
          buildPayload(formData, false),
          axiosPrivate,
        );
        setInstructorsData((current) =>
          current.map((item) =>
            item.instructorId === updated.instructorId ? mapInstructor(updated) : item,
          ),
        );
      }
      closeForm();
    } catch (e) {
      console.error(e);
      setFormSubmitError(e?.response?.data?.message || e?.response?.data || "Could not save instructor.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteInstructor) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      await deleteAdminInstructorApi(deleteInstructor.instructorId, axiosPrivate);

      setInstructorsData((current) =>
        current.map((item) =>
          item.instructorId === deleteInstructor.instructorId
            ? { ...item, isDeleted: true }
            : item,
        ),
      );

      setDeleteInstructor(null);
    } catch (e) {
      console.error(e);
      setDeleteError(e?.response?.data?.message || e?.response?.data || "Could not delete instructor.");
    } finally {
      setIsDeleting(false);
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
                      <span className="instructorTableTag">{instructor.specialization}</span>
                    </div>
                  </div>
                </td>
                <td><div className="instructorTableStat"><strong>{instructor.classes}</strong></div></td>
                <td><div className="instructorTableStat"><strong>{instructor.students}</strong></div></td>
                <td>
                  <div className="instructorTableActions">
                    <button type="button" className="instructorActionButton" aria-label="View" onClick={() => handleView(instructor)}><Eye size={16} /></button>
                    <button type="button" className="instructorActionButton" aria-label="Edit" onClick={() => handleEdit(instructor)}><Edit3 size={16} /></button>
                    <button type="button" className="instructorActionButton instructorActionButton--danger" aria-label="Delete" onClick={() => setDeleteInstructor(instructor)}><Trash2 size={16} /></button>
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

      {formMode ? (
        <InstructorFormModal
          mode={formMode}
          form={formData}
          errors={formErrors}
          submitError={formSubmitError}
          isSaving={isSaving}
          onChange={handleFormChange}
          onClose={closeForm}
          onSubmit={handleSubmitForm}
        />
      ) : null}

      <DeleteInstructorModal
        instructor={deleteInstructor}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={() => {
          setDeleteInstructor(null);
          setDeleteError("");
        }}
        onConfirm={handleDelete}
      />
    </section>
  );
};

export default InstructorTable;
