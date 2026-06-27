import { Edit3, Eye, Plus, Tag as TagIcon, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  createAdminTagApi,
  deleteAdminTagApi,
  getAdminTagsApi,
  updateAdminTagApi,
} from "../../../api/admin/TagApi.js";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import "./Tag.css";

const pageSize = 8;

const toSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const normalizeTag = (tag) => ({
  id: tag.id,
  displayId: `TAG-${String(tag.id).padStart(3, "0")}`,
  name: tag.name ?? "N/A",
  updatedAt: formatDate(tag.updatedAt),
});

const TagDetailModal = ({ tag, mode, onClose, onSaved, axiosClient }) => {
  const isEdit = mode === "edit";
  const [name, setName] = useState(tag.name === "N/A" ? "" : tag.name);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEdit) return;
    const trimmed = name.trim();
    if (!trimmed) { setError("Tag name is required."); return; }
    setIsSaving(true);
    setError("");
    try {
      const updated = await updateAdminTagApi(
        tag.id,
        { name: trimmed, slug: toSlug(trimmed) },
        axiosClient
      );
      onSaved(normalizeTag(updated));
    } catch (saveError) {
      setError(saveError?.response?.data?.message || "Failed to save tag.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="adminTagModalBackdrop" role="presentation" onClick={onClose}>
      <form
        className="adminTagDetailModal"
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit tag" : "View tag"}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="adminTagModalHeader">
          <div>
            <p className="adminTagModalEyebrow">{isEdit ? "EDIT TAG" : "VIEW TAG"}</p>
            <h2>{tag.name}</h2>
          </div>
          <button type="button" className="adminTagModalClose" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="adminTagDetailGrid">
          <label className="adminTagDetailRow">
            <span>Tag ID</span>
            <input className="adminTagDetailInput adminTagDetailInput--readonly" value={tag.displayId} readOnly />
          </label>
          <label className="adminTagDetailRow">
            <span>Updated At</span>
            <input className="adminTagDetailInput adminTagDetailInput--readonly" value={tag.updatedAt} readOnly />
          </label>
          <label className="adminTagDetailRow adminTagDetailRowWide">
            <span>Tag Name</span>
            <input
              className={isEdit ? "adminTagDetailInput" : "adminTagDetailInput adminTagDetailInput--readonly"}
              value={isEdit ? name : tag.name}
              readOnly={!isEdit}
              required={isEdit}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        {error ? <p className="adminTagError">{error}</p> : null}

        <div className="adminTagModalActions">
          <button type="button" className="adminTagModalCancel" onClick={onClose}>
            {isEdit ? "Cancel" : "Close"}
          </button>
          {isEdit ? (
            <button type="submit" className="adminTagModalSubmit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Tag"}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

const Tag = () => {
  const axiosPrivate = useAxiosPrivate();
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await getAdminTagsApi(axiosPrivate);
        const normalized = Array.isArray(response) ? response.map(normalizeTag) : [];
        if (isMounted) setTags(normalized);
      } catch (fetchError) {
        if (isMounted)
          setError(fetchError?.response?.data?.message || "Failed to load tags.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchTags();
    return () => { isMounted = false; };
  }, [axiosPrivate]);

  const filteredTags = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return tags;
    return tags.filter((tag) =>
      [tag.displayId, tag.name].join(" ").toLowerCase().includes(keyword)
    );
  }, [tags, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredTags.length / pageSize));
  const visibleTags = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTags.slice(start, start + pageSize);
  }, [currentPage, filteredTags]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  const openTagPopup = (action, tag) => { setSelectedAction(action); setSelectedTag(tag); };
  const closeTagPopup = () => { setSelectedAction(null); setSelectedTag(null); };
  const handleTagSaved = (updatedTag) => {
    setTags((current) => current.map((t) => (t.id === updatedTag.id ? updatedTag : t)));
    closeTagPopup();
  };

  const [createName, setCreateName] = useState("");
  const [createError, setCreateError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTag = async (e) => {
    e.preventDefault();
    const trimmed = createName.trim();
    if (!trimmed) { setCreateError("Tag name is required."); return; }
    setIsCreating(true);
    setCreateError("");
    try {
      const newTag = await createAdminTagApi(
        { name: trimmed, slug: toSlug(trimmed) },
        axiosPrivate
      );
      setTags((current) => [...current, normalizeTag(newTag)]);
      setIsCreateOpen(false);
      setCreateName("");
    } catch (err) {
      setCreateError(err?.response?.data?.message || "Failed to create tag.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="adminTagPage" aria-label="Tag management">
      <div className="adminTagContent">
        <div className="adminTagStats">
          <article className="adminTagStatCard">
            <span className="adminTagStatIcon"><TagIcon size={22} /></span>
            <div>
              <strong>{tags.length}</strong>
              <p>Total Tags</p>
              <small>active in database</small>
            </div>
          </article>
        </div>

        <div className="adminTagFilters">
          <input
            type="search"
            placeholder="Search tag name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" className="adminTagCreateButton" onClick={() => setIsCreateOpen(true)}>
            <Plus size={18} />
            New Tag
          </button>
        </div>

        {error ? <p className="adminTagError">{error}</p> : null}

        <div className="adminTagTableCard">
          <table className="adminTagTable">
            <thead>
              <tr>
                <th>Tag ID</th>
                <th>Tag Name</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleTags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.displayId}</td>
                  <td>{tag.name}</td>
                  <td>{tag.updatedAt}</td>
                  <td>
                    <div className="adminTagActions">
                      <button type="button" aria-label={`View ${tag.name}`} onClick={() => openTagPopup("view", tag)}>
                        <Eye size={16} />
                      </button>
                      <button type="button" aria-label={`Edit ${tag.name}`} onClick={() => openTagPopup("edit", tag)}>
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${tag.name}`}
                        onClick={async () => {
                          try {
                            await deleteAdminTagApi(tag.id, axiosPrivate);
                            setTags((current) => current.filter((t) => t.id !== tag.id));
                          } catch (deleteError) {
                            setError(deleteError?.response?.data?.message || "Failed to delete tag.");
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && visibleTags.length === 0 ? (
                <tr><td colSpan={4} className="adminTagEmpty">No tags match the current search.</td></tr>
              ) : null}
              {isLoading ? (
                <tr><td colSpan={4} className="adminTagEmpty">Loading tags...</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="adminTagPagination">
          <button type="button" className="adminTagPageButton" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`adminTagPageButton ${currentPage === page ? "adminTagPageButton--active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button type="button" className="adminTagPageButton" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
            Next
          </button>
        </div>
      </div>

      {isCreateOpen && (
        <div className="adminTagModalBackdrop" role="presentation" onClick={() => setIsCreateOpen(false)}>
          <form
            className="adminTagModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-tag-create-title"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreateTag}
          >
            <div className="adminTagModalHeader">
              <div>
                <h2 id="admin-tag-create-title">Create New Tag</h2>
                <p>Tags help users search and filter courses.</p>
              </div>
              <button type="button" className="adminTagModalClose" onClick={() => setIsCreateOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="adminTagModalForm adminTagModalFormSingle">
              <label>
                Tag Name
                <input
                  type="text"
                  placeholder="Example: React, Machine Learning, UI/UX"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  required
                  autoFocus
                />
              </label>

              {createError && <p className="adminTagError">{createError}</p>}

              <div className="adminTagModalActions">
                <button
                  type="button"
                  className="adminTagModalCancel"
                  onClick={() => { setIsCreateOpen(false); setCreateName(""); setCreateError(""); }}
                >
                  Cancel
                </button>
                <button type="submit" className="adminTagModalSubmit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Tag"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {selectedTag && ["view", "edit"].includes(selectedAction) ? (
        <TagDetailModal
          tag={selectedTag}
          mode={selectedAction}
          onClose={closeTagPopup}
          onSaved={handleTagSaved}
          axiosClient={axiosPrivate}
        />
      ) : null}
    </section>
  );
};

export default Tag;
