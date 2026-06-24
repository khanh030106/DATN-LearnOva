import { Edit3, Eye, FolderTree, Plus, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  createAdminCategoryApi,
  deleteAdminCategoryApi,
  getAdminCategoriesApi,
  updateAdminCategoryApi,
} from "../../../api/admin/CategoryApi.js";
import AdminHoverSelect from "../shared/AdminHoverSelect";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import "./Category.css";

const pageSize = 4;

const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const normalizeCategory = (category) => ({
  id: category.id,
  displayId: `CAT-${String(category.id).padStart(3, "0")}`,
  name: category.name ?? "N/A",
  slug: category.slug ?? "N/A",
  displayOrder: category.displayOrder ?? 0,
  isDeleted: Boolean(category.isDeleted),
  status: category.isDeleted ? "Hidden" : "Active",
  createdAt: formatDate(category.createdAt),
  updatedAt: formatDate(category.updatedAt),
});

const getCategoryStats = (categories) => {
  const activeCategories = categories.filter((category) => !category.isDeleted).length;
  const hiddenCategories = categories.filter((category) => category.isDeleted).length;
  const totalDisplayOrder = categories.reduce(
    (total, category) => total + Number(category.displayOrder || 0),
    0,
  );

  return [
    { label: "Total Categories", value: categories.length, note: "from database" },
    { label: "Active Topics", value: activeCategories, note: "visible to users" },
    { label: "Hidden Topics", value: hiddenCategories, note: "not visible to users" },
    { label: "Display Order Total", value: totalDisplayOrder, note: "sum from database" },
  ];
};

const CategoryDetailModal = ({
  category,
  mode,
  onClose,
  onSaved,
  axiosClient, 
}) => {
  const isEdit = mode === "edit";
  const [form, setForm] = useState({
    name: category.name === "N/A" ? "" : category.name,
    slug: category.slug === "N/A" ? "" : category.slug,
    displayOrder: category.displayOrder ?? 0,
    status: category.isDeleted ? "Hidden" : "Active",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEdit) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const updatedCategory = await updateAdminCategoryApi(
        category.id,
        {
          name: form.name.trim(),
          slug: form.slug.trim(),
          displayOrder: Number(form.displayOrder || 0),
          isDeleted: form.status === "Hidden",
        },
        axiosClient
      );

      onSaved(normalizeCategory(updatedCategory));
    } catch (saveError) {
      setError(
        saveError?.response?.data?.message ||
          "Không lưu được category xuống database.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputClassName = isEdit
    ? "adminCategoryDetailInput"
    : "adminCategoryDetailInput adminCategoryDetailInput--readonly";

  return (
    <div className="adminCategoryModalBackdrop" role="presentation" onClick={onClose}>
      <form
        className="adminCategoryDetailModal"
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit category" : "View category"}
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="adminCategoryModalHeader">
          <div>
            <p className="adminCategoryModalEyebrow">
              {isEdit ? "EDIT CATEGORY" : "VIEW CATEGORY"}
            </p>
            <h2>{category.name}</h2>
          </div>
          <button
            type="button"
            className="adminCategoryModalClose"
            onClick={onClose}
            aria-label="Close category popup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="adminCategoryDetailGrid">
          {/* ... form fields identical to previous code ... */}
          <label className="adminCategoryDetailRow">
            <span>Category ID</span>
            <input
              className="adminCategoryDetailInput adminCategoryDetailInput--readonly"
              value={category.displayId}
              readOnly
            />
          </label>

          <label className="adminCategoryDetailRow">
            <span>Status</span>
            {isEdit ? (
              <select
                className="adminCategoryDetailInput"
                value={form.status}
                onChange={(event) => setField("status", event.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Hidden">Hidden</option>
              </select>
            ) : (
              <input
                className="adminCategoryDetailInput adminCategoryDetailInput--readonly"
                value={category.status}
                readOnly
              />
            )}
          </label>

          <label className="adminCategoryDetailRow">
            <span>Category Name</span>
            <input
              className={inputClassName}
              value={form.name}
              readOnly={!isEdit}
              required={isEdit}
              onChange={(event) => setField("name", event.target.value)}
            />
          </label>

          <label className="adminCategoryDetailRow">
            <span>Slug</span>
            <input
              className={inputClassName}
              value={form.slug}
              readOnly={!isEdit}
              required={isEdit}
              onChange={(event) => setField("slug", event.target.value)}
            />
          </label>

          <label className="adminCategoryDetailRow">
            <span>Display Order</span>
            <input
              className={inputClassName}
              type={isEdit ? "number" : "text"}
              value={form.displayOrder}
              readOnly={!isEdit}
              onChange={(event) => setField("displayOrder", event.target.value)}
            />
          </label>

          <label className="adminCategoryDetailRow">
            <span>Created At</span>
            <input
              className="adminCategoryDetailInput adminCategoryDetailInput--readonly"
              value={category.createdAt}
              readOnly
            />
          </label>

          <label className="adminCategoryDetailRow">
            <span>Updated At</span>
            <input
              className="adminCategoryDetailInput adminCategoryDetailInput--readonly"
              value={category.updatedAt}
              readOnly
            />
          </label>
        </div>

        {error ? <p className="adminCategoryError">{error}</p> : null}

        <div className="adminCategoryModalActions">
          <button
            type="button"
            className="adminCategoryModalCancel"
            onClick={onClose}
          >
            {isEdit ? "Cancel" : "Close"}
          </button>
          {isEdit ? (
            <button
              type="submit"
              className="adminCategoryModalSubmit"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Category"}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

const Category = () => {
  const axiosPrivate = useAxiosPrivate(); 
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await getAdminCategoriesApi(axiosPrivate);
        const normalizedCategories = Array.isArray(response)
          ? response.map(normalizeCategory)
          : [];

        if (isMounted) {
          setCategories(normalizedCategories);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError?.response?.data?.message ||
              "Không tải được danh sách categories từ server.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  const categoryStats = useMemo(() => getCategoryStats(categories), [categories]);
  const statusOptions = useMemo(
    () => ["All", "Active", "Hidden"],
    [],
  );

  const filteredCategories = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        !keyword ||
        [category.displayId, category.name, category.slug, category.status]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Active" && !category.isDeleted) ||
        (selectedStatus === "Hidden" && category.isDeleted);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));
  const visibleCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCategories.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  const openCategoryPopup = (action, category) => {
    setSelectedAction(action);
    setSelectedCategory(category);
  };

  const closeCategoryPopup = () => {
    setSelectedAction(null);
    setSelectedCategory(null);
  };

  const handleCategorySaved = (updatedCategory) => {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    );
    closeCategoryPopup();
  };

  const [createFormData, setCreateFormData] = useState({
    name: "",
    slug: "",
    displayOrder: 0,
  });
  const [createFormError, setCreateFormError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    
    if (!createFormData.name.trim()) {
      setCreateFormError("Category name is required");
      return;
    }
    if (!createFormData.slug.trim()) {
      setCreateFormError("Slug is required");
      return;
    }

    setIsCreating(true);
    setCreateFormError("");

    try {
      const newCategory = await createAdminCategoryApi(
        {
          name: createFormData.name.trim(),
          slug: createFormData.slug.trim(),
          displayOrder: Number(createFormData.displayOrder || 0),
        },
        axiosPrivate
      );
      
      setCategories((current) => [...current, normalizeCategory(newCategory)]);
      setIsCreateOpen(false);
      setCreateFormData({ name: "", slug: "", displayOrder: 0 });
    } catch (error) {
      setCreateFormError(
        error?.response?.data?.message || "Failed to create category"
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="adminCategoryPage" aria-label="Category management">
      <div className="adminCategoryContent">
        <div className="adminCategoryStats">
          {categoryStats.map((item) => (
            <article className="adminCategoryStatCard" key={item.label}>
              <span className="adminCategoryStatIcon">
                <FolderTree size={22} />
              </span>
              <div>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
                <small>{item.note}</small>
              </div>
            </article>
          ))}
        </div>

        <div className="adminCategoryFilters">
          <input
            type="search"
            placeholder="Search category name or slug..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <AdminHoverSelect
            className="adminCategoryFilterSelect"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            ariaLabel="Filter categories by status"
          />
          <button
            type="button"
            className="adminCategoryCreateButton"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={18} />
            New Category
          </button>
        </div>

        {error ? <p className="adminCategoryError">{error}</p> : null}

        <div className="adminCategoryTableCard">
          <table className="adminCategoryTable">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Display Order</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.displayId}</td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.displayOrder}</td>
                  <td>
                    <span className={`adminCategoryStatus adminCategoryStatus--${category.status.toLowerCase()}`}>
                      {category.status}
                    </span>
                  </td>
                  <td>{category.updatedAt}</td>
                  <td>
                    <div className="adminCategoryActions">
                      <button
                        type="button"
                        aria-label={`View ${category.name}`}
                        onClick={() => openCategoryPopup("view", category)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Edit ${category.name}`}
                        onClick={() => openCategoryPopup("edit", category)}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${category.name}`}
                        onClick={async () => {
                          try {
                            await deleteAdminCategoryApi(category.id, axiosPrivate);
                            setCategories((current) =>
                              current.map((item) =>
                                item.id === category.id
                                  ? { ...item, isDeleted: true, status: "Hidden" }
                                  : item,
                              ),
                            );
                          } catch (deleteError) {
                            setError(
                              deleteError?.response?.data?.message ||
                                "Không xóa được category.",
                            );
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && visibleCategories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="adminCategoryEmpty">
                    Không có category nào khớp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : null}

              {isLoading ? (
                <tr>
                  <td colSpan={7} className="adminCategoryEmpty">
                    Đang tải categories...
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="adminCategoryPagination">
          <button
            type="button"
            className="adminCategoryPageButton"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`adminCategoryPageButton ${currentPage === page ? "adminCategoryPageButton--active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="adminCategoryPageButton"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      {isCreateOpen && (
        <div
          className="adminCategoryModalBackdrop"
          role="presentation"
          onClick={() => setIsCreateOpen(false)}
        >
          <form
            className="adminCategoryModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-category-create-title"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleCreateCategory}
          >
            <div className="adminCategoryModalHeader">
              <div>
                <h2 id="admin-category-create-title">Create New Category</h2>
                <p>Add a course category for catalog classification.</p>
              </div>
              <button
                type="button"
                className="adminCategoryModalClose"
                onClick={() => setIsCreateOpen(false)}
                aria-label="Close category form"
              >
                <X size={20} />
              </button>
            </div>

            <div className="adminCategoryModalForm">
              <label>
                Category Name
                <input 
                  type="text" 
                  placeholder="Example: Frontend"
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData({...createFormData, name: e.target.value})}
                  required
                />
              </label>
              <label>
                Slug
                <input 
                  type="text" 
                  placeholder="example: frontend"
                  value={createFormData.slug}
                  onChange={(e) => setCreateFormData({...createFormData, slug: e.target.value})}
                  required
                />
              </label>
              <label>
                Display Order
                <input 
                  type="number" 
                  placeholder="Example: 1"
                  value={createFormData.displayOrder}
                  onChange={(e) => setCreateFormData({...createFormData, displayOrder: e.target.value})}
                />
              </label>

              {createFormError && <p className="adminCategoryError">{createFormError}</p>}

              <div className="adminCategoryModalActions">
                <button
                  type="button"
                  className="adminCategoryModalCancel"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setCreateFormData({ name: "", slug: "", displayOrder: 0 });
                    setCreateFormError("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="adminCategoryModalSubmit"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Category"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {selectedCategory && ["view", "edit"].includes(selectedAction) ? (
        <CategoryDetailModal
          category={selectedCategory}
          mode={selectedAction}
          onClose={closeCategoryPopup}
          onSaved={handleCategorySaved}
          axiosClient={axiosPrivate} 
        />
      ) : null}
    </section>
  );
};

export default Category;
