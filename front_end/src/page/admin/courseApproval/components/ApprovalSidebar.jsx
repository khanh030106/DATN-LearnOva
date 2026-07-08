import { BookOpen } from "lucide-react";

const ApprovalSidebar = ({ courses, selectedId, onSelect }) => (
  <aside className="approvalSidebar">
    <div className="approvalSidebarHeader">
      <p className="approvalSidebarEyebrow">PENDING REVIEW</p>
      <p className="approvalSidebarCount">{courses.length} courses</p>
    </div>

    <ul className="approvalSidebarList">
      {courses.length === 0 ? (
        <li className="approvalSidebarEmpty">No draft courses are waiting for review.</li>
      ) : (
        courses.map((course) => (
          <li key={course.id}>
            <button
              type="button"
              className={`approvalSidebarItem ${
                selectedId === course.id ? "approvalSidebarItem--active" : ""
              }`}
              onClick={() => onSelect(course.id)}
            >
              {course.thumbnailKey ? (
                <img
                  className="approvalSidebarThumb"
                  src={course.thumbnailKey}
                  alt={course.title}
                />
              ) : (
                <div className="approvalSidebarThumbPlaceholder">
                  <BookOpen size={14} />
                </div>
              )}

              <div className="approvalSidebarItemInfo">
                <span className="approvalSidebarItemTitle">{course.title}</span>
                <span className="approvalSidebarItemInstructor">{course.instructorName}</span>
              </div>
            </button>
          </li>
        ))
      )}
    </ul>
  </aside>
);

export default ApprovalSidebar;
