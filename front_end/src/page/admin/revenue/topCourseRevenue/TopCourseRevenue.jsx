import { useEffect, useState } from "react";
import { getAdminTopRevenueCoursesApi } from "../../../../api/admin/RevenueApi.js";
import "./TopCourseRevenue.css";

const PAGE_SIZE = 5;

const formatMoney = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;

const formatPercent = (value) => `${Number(value || 0).toFixed(0)}%`;

const TopCourseRevenue = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getAdminTopRevenueCoursesApi({
          page,
          size: PAGE_SIZE,
        });

        if (!isMounted) return;

        setCourses(Array.isArray(data?.content) ? data.content : []);
        setTotalPages(Number(data?.totalPages || 0));
      } catch {
        if (!isMounted) return;
        setCourses([]);
        setTotalPages(0);
        setError("Unable to load top revenue courses.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <section
      className="topRevenueBlockSection topCourseRevenueCard"
      aria-label="Top revenue courses"
    >
      <div className="topRevenueBlockHeader">
        <div>
          <h2 className="topRevenueBlockTitle">Top Revenue Courses</h2>
          <p className="topRevenueBlockSubtitle">
            Best-selling courses ranked by total student enrollments.
          </p>
        </div>
        <span className="topRevenueBlockBadge">Monthly</span>
      </div>

      <div className="topRevenueBlockCard">
        <div className="topRevenueBlockTableWrapper">
          <table className="topRevenueBlockTable">
            <thead>
              <tr>
                <th>RANK</th>
                <th>COURSE</th>
                <th>INSTRUCTOR</th>
                <th>CATEGORY</th>
                <th>STUDENTS</th>
                <th>REVENUE</th>
                <th>SHARE</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="topRevenueBlockState">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="topRevenueBlockState">
                    {error}
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="topRevenueBlockState">
                    No paid revenue data yet.
                  </td>
                </tr>
              ) : (
                courses.map((course, index) => (
                  <tr key={`${course.courseId}-${course.categoryId ?? "none"}`}>
                    <td>
                      <span className="topRevenueBlockRank">
                        {page * PAGE_SIZE + index + 1}
                      </span>
                    </td>
                    <td>
                      <div className="topRevenueBlockCourseInfo">
                        <span className="topRevenueBlockCourseName">
                          {course.title}
                        </span>
                      </div>
                    </td>
                    <td>{course.instructor || "Unknown"}</td>
                    <td>{course.category || "Uncategorized"}</td>
                    <td>
                      {Number(course.students || 0).toLocaleString("en-US")} enrollments
                    </td>
                    <td>
                      <div className="topRevenueBlockRevenueCell">
                        <span>{formatMoney(course.revenue)}</span>
                      </div>
                    </td>
                    <td>{formatPercent(course.share)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div
            className="topRevenuePagination"
            aria-label="Top course revenue pages"
          >
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={pageNumber === page ? "active" : ""}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCourseRevenue;
