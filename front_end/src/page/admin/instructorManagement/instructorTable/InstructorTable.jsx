import { useState } from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";
import "./InstructorTable.css";

const instructorsData = [
  {
    id: "GV001",
    initials: "VH",
    name: "Nguyễn Văn Hùng",
    email: "hung.nguyen@academy.edu.vn",
    specialization: "Web Development & Cloud Computing",
    classes: 3,
    students: "1.250",
    rating: 4.8,
    revenue: "$145,000",
    status: "Active",
  },
  {
    id: "GV002",
    initials: "MT",
    name: "Trần Thị Minh Thư",
    email: "thu.tran@academy.edu.vn",
    specialization: "UI/UX Design & Figma",
    classes: 3,
    students: "940",
    rating: 4.9,
    revenue: "$98,000",
    status: "Active",
  },
  {
    id: "GV003",
    initials: "LN",
    name: "Lê Ngọc Nam",
    email: "nam.le@academy.edu.vn",
    specialization: "Database Administration & SQL",
    classes: 2,
    students: "765",
    rating: 4.7,
    revenue: "$82,500",
    status: "Paused",
  },
  {
    id: "GV004",
    initials: "PH",
    name: "Phạm Hoài An",
    email: "an.pham@academy.edu.vn",
    specialization: "Digital Marketing",
    classes: 4,
    students: "1.120",
    rating: 4.6,
    revenue: "$112,000",
    status: "Active",
  },
  {
    id: "GV005",
    initials: "TT",
    name: "Trần Thị Thuỳ",
    email: "thuy.tran@academy.edu.vn",
    specialization: "Interior Design",
    classes: 2,
    students: "630",
    rating: 4.5,
    revenue: "$67,900",
    status: "Active",
  },
  {
    id: "GV006",
    initials: "QD",
    name: "Quách Duy Đức",
    email: "duc.quach@academy.edu.vn",
    specialization: "React & Frontend",
    classes: 5,
    students: "1.420",
    rating: 4.9,
    revenue: "$162,500",
    status: "Active",
  },
  {
    id: "GV007",
    initials: "NL",
    name: "Ngọc Lan",
    email: "lan.ngoc@academy.edu.vn",
    specialization: "Agile Project Management",
    classes: 3,
    students: "790",
    rating: 4.4,
    revenue: "$89,400",
    status: "Paused",
  },
  {
    id: "GV008",
    initials: "BT",
    name: "Bùi Thị Thảo",
    email: "thao.bui@academy.edu.vn",
    specialization: "Public Speaking",
    classes: 2,
    students: "520",
    rating: 4.7,
    revenue: "$56,800",
    status: "Active",
  },
  {
    id: "GV009",
    initials: "HN",
    name: "Hà Nguyễn",
    email: "nguyen.ha@academy.edu.vn",
    specialization: "Data Analysis",
    classes: 4,
    students: "1.010",
    rating: 4.8,
    revenue: "$130,000",
    status: "Active",
  },
  {
    id: "GV010",
    initials: "DV",
    name: "Đặng Văn Dũng",
    email: "dung.dang@academy.edu.vn",
    specialization: "E-commerce Management",
    classes: 3,
    students: "880",
    rating: 4.6,
    revenue: "$95,300",
    status: "Active",
  },
  {
    id: "GV011",
    initials: "HP",
    name: "Hoàng Phương",
    email: "phuong.hoang@academy.edu.vn",
    specialization: "Content Marketing",
    classes: 2,
    students: "610",
    rating: 4.3,
    revenue: "$58,200",
    status: "Locked",
  },
  {
    id: "GV012",
    initials: "NL",
    name: "Nguyễn Lê",
    email: "le.nguyen@academy.edu.vn",
    specialization: "SEO & Content",
    classes: 3,
    students: "700",
    rating: 4.5,
    revenue: "$79,500",
    status: "Active",
  },
];

const InstructorTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(instructorsData.length / pageSize);
  const currentItems = instructorsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section
      className="instructorTableSection"
      aria-label="Instructor Management Table"
    >
      <div className="instructorTableCard">
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
            {currentItems.map((instructor) => (
              <tr key={instructor.id}>
                <td>
                  <span className="instructorTableBadge">{instructor.id}</span>
                </td>
                <td>
                  <div className="instructorTableProfile">
                    <div className="instructorTableProfileText">
                      <p className="instructorTableName">{instructor.name}</p>
                      <p className="instructorTableEmail">{instructor.email}</p>
                      <span className="instructorTableTag">
                        {instructor.specialization}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="instructorTableStat">
                    <strong>{instructor.classes}</strong>
                  </div>
                </td>
                <td>
                  <div className="instructorTableStat">
                    <strong>{instructor.students}</strong>
                  </div>
                </td>
                <td>
                  <div className="instructorTableActions">
                    <button
                      type="button"
                      className="instructorActionButton"
                      aria-label="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="instructorActionButton"
                      aria-label="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      type="button"
                      className="instructorActionButton instructorActionButton--danger"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="instructorTablePagination">
          <button
            type="button"
            className="instructorPaginationButton"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              type="button"
              className={`instructorPaginationButton ${
                currentPage === index + 1
                  ? "instructorPaginationButton--active"
                  : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            className="instructorPaginationButton"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstructorTable;
