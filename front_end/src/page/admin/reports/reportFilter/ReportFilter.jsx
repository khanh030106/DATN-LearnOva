import { useState } from "react";
import "./ReportFilter.css";

const ReportFilter = () => {
  const [filters, setFilters] = useState({
    startDate: "01/05/2026",
    endDate: "04/06/2026",
    reportType: "All Reports",
    category: "All Categories",
    instructor: "All Instructors",
    course: "All Courses",
    userRole: "All Roles",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="reportFilterSection">
      <div className="reportFilterContainer">
        <div className="reportFilterTitle">
          <h3>ADVANCED ANALYTICS FILTERS</h3>
          <p>
            Set the analysis scope to preview or download the related analytics
            below.
          </p>
        </div>

        <div className="reportFilterGrid">
          {/* Start Date */}
          <div className="filterField">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate.split("/").reverse().join("-")}
              onChange={handleDateChange}
              className="filterInput filterDateInput"
            />
          </div>

          {/* End Date */}
          <div className="filterField">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate.split("/").reverse().join("-")}
              onChange={handleDateChange}
              className="filterInput filterDateInput"
            />
          </div>

          {/* Report Type */}
          <div className="filterField">
            <label>Report Type</label>
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>All Reports</option>
              <option>Revenue Report</option>
              <option>User Report</option>
              <option>Course Report</option>
              <option>Instructor Report</option>
            </select>
          </div>

          {/* Category */}
          <div className="filterField">
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>All Categories</option>
              <option>Technology</option>
              <option>Business</option>
              <option>Design</option>
              <option>Language</option>
            </select>
          </div>

          {/* Instructor */}
          <div className="filterField">
            <label>Instructor</label>
            <select
              name="instructor"
              value={filters.instructor}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>All Instructors</option>
              <option>Instructor A</option>
              <option>Instructor B</option>
              <option>Instructor C</option>
            </select>
          </div>

          {/* Course */}
          <div className="filterField">
            <label>Specific Course</label>
            <select
              name="course"
              value={filters.course}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>All Courses</option>
              <option>Course 1</option>
              <option>Course 2</option>
              <option>Course 3</option>
            </select>
          </div>

          {/* User Role */}
          <div className="filterField">
            <label>User Role</label>
            <select
              name="userRole"
              value={filters.userRole}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>All Roles</option>
              <option>Administrator</option>
              <option>Instructor</option>
              <option>Student</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportFilter;
