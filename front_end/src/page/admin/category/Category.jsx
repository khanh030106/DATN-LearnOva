import { Edit3, Eye, FolderTree, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import "./Category.css";

const categoryStats = [
  { label: "Total Categories", value: "12", note: "active learning topics" },
  { label: "Courses Assigned", value: "248", note: "mapped to categories" },
  { label: "Pending Review", value: "5", note: "category requests" },
  { label: "Hidden Topics", value: "3", note: "not visible to users" },
];

const categories = [
  {
    id: "CAT-001",
    name: "Programming",
    parent: "Technology",
    courses: 64,
    status: "Active",
    updatedAt: "2026-06-01",
  },
  {
    id: "CAT-002",
    name: "AI & Data Science",
    parent: "Technology",
    courses: 42,
    status: "Active",
    updatedAt: "2026-05-28",
  },
  {
    id: "CAT-003",
    name: "Design & UX/UI",
    parent: "Creative",
    courses: 31,
    status: "Active",
    updatedAt: "2026-05-20",
  },
  {
    id: "CAT-004",
    name: "Business",
    parent: "Professional",
    courses: 27,
    status: "Active",
    updatedAt: "2026-05-18",
  },
  {
    id: "CAT-005",
    name: "Marketing",
    parent: "Professional",
    courses: 18,
    status: "Hidden",
    updatedAt: "2026-05-12",
  },
];

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 4;
  const totalPages = Math.ceil(categories.length / pageSize);
  const visibleCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return categories.slice(startIndex, startIndex + pageSize);
  }, [currentPage]);

  return (
    <section className="adminCategoryPage" aria-label="Category management">
      <div className="adminCategoryContent">
        <div className="adminCategoryHeader">
          <div>
            <h1>Category Management</h1>
            <p>Manage course topic groups, parent categories, and visibility.</p>
          </div>
          <button
            type="button"
            className="adminCategoryCreateButton"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={18} />
            New Category
          </button>
        </div>

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
          <input type="search" placeholder="Search category name or parent..." />
          <button type="button">All Statuses</button>
          <button type="button">All Parents</button>
        </div>

        <div className="adminCategoryTableCard">
          <table className="adminCategoryTable">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Parent Group</th>
                <th>Courses</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.parent}</td>
                  <td>{category.courses}</td>
                  <td>
                    <span
                      className={`adminCategoryStatus adminCategoryStatus--${category.status.toLowerCase()}`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td>{category.updatedAt}</td>
                  <td>
                    <div className="adminCategoryActions">
                      <button type="button" aria-label={`View ${category.name}`}>
                        <Eye size={16} />
                      </button>
                      <button type="button" aria-label={`Edit ${category.name}`}>
                        <Edit3 size={16} />
                      </button>
                      <button type="button" aria-label={`Delete ${category.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                className={`adminCategoryPageButton ${
                  currentPage === page ? "adminCategoryPageButton--active" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            className="adminCategoryPageButton"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
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
          <div
            className="adminCategoryModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-category-create-title"
            onClick={(event) => event.stopPropagation()}
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
                <input type="text" placeholder="Example: Frontend" />
              </label>
              <label>
                Parent Group
                <input type="text" placeholder="Example: Programming" />
              </label>
              <label>
                Slug
                <input type="text" placeholder="example: frontend" />
              </label>
              <label>
                Status
                <input type="text" placeholder="Active / Hidden" />
              </label>
              <label className="adminCategoryModalFieldWide">
                Description
                <textarea placeholder="Short description for this category" rows={4} />
              </label>
            </div>

            <div className="adminCategoryModalActions">
              <button
                type="button"
                className="adminCategoryModalCancel"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adminCategoryModalSubmit"
                onClick={() => setIsCreateOpen(false)}
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Category;
