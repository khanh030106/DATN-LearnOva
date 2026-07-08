import { useEffect, useMemo, useState } from "react";
import { getAdminDashboardApi } from "../../../api/admin/DashboardApi.js";
import { getAdminCoursesApi } from "../../../api/admin/CourseApi.js";
import { getAdminInstructorsApi } from "../../../api/admin/InstructorApi.js";
import { getAdminUsersApi } from "../../../api/admin/AdminUserApi.js";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import Statistics from "./statistics/Statistics";
import "./Dashboard.css";
import GrowthChart from "./growthChart/GrowthChart";
import RoleDistribution from "./roleDistribution/RoleDistribution";
import UserRow from "./userRow/UserRow";
import TeacherRow from "./teacherRow/TeacherRow";
import ActivityRow from "./activityRow/ActivityRow";

const monthLabels = ["May", "June", "July", "August", "September", "October"];

const currentYear = new Date().getFullYear();

const dashboardYearOptions = Array.from({ length: 3 }, (_, index) => {
  const endYear = currentYear - index;
  const startYear = endYear - 1;

  return {
    value: `${startYear}-${endYear}`,
    label: `${startYear} - ${endYear}`,
  };
});

const emptyDashboardData = {
  statistics: {},
  growthSeries: [],
  roleDistribution: [],
  recentUsers: [],
  featuredInstructors: [],
  recentActivity: [],
};

const toArray = (value) => (Array.isArray(value) ? value : []);

const isActiveRecord = (item) => !Boolean(item?.isDeleted);

const formatNumber = (value) => new Intl.NumberFormat("en-US").format(Number(value || 0));

const formatCompactNumber = (value) => {
  const number = Number(value || 0);

  if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
  if (number >= 1_000) return `${(number / 1_000).toFixed(1)}k`;

  return formatNumber(number);
};

const formatVnd = (value) => {
  const amount = Number(value || 0);

  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(2)}B VND`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M VND`;

  return `${formatNumber(amount)} VND`;
};

const formatRelativeTime = (value) => {
  const date = new Date(value || 0);
  if (Number.isNaN(date.getTime())) return "--";

  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (elapsedSeconds < 60) return "Just now";
  if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`;
  if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`;
  if (elapsedSeconds < 604800) return `${Math.floor(elapsedSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-GB");
};

const getYearFromRange = (rangeValue) => {
  const parts = String(rangeValue || "").split("-");
  return Number(parts[1] || new Date().getFullYear());
};

const getDateTime = (value) => {
  const time = new Date(value || 0).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const sumNumbers = (items, selector) =>
  items.reduce((total, item) => total + Number(selector(item) || 0), 0);

const normalizeRoleFromDb = (role) => {
  const roleText = String(role || "").toUpperCase();

  if (roleText.includes("ADMIN")) return "Administrator";
  if (roleText.includes("TEACHER") || roleText.includes("INSTRUCTOR")) return "Instructor";

  return "Student";
};

const mapRecentUsersFromDb = (users) =>
  toArray(users)
    .filter(isActiveRecord)
    .sort((first, second) => getDateTime(second.createdAt) - getDateTime(first.createdAt))
    .slice(0, 4)
    .map((user) => ({
      id: user.id,
      name: user.fullName || user.email || `User #${user.id}`,
      email: user.email || "-",
      role: normalizeRoleFromDb(user.role),
    }));

const mapFeaturedInstructorsFromDb = (instructors) =>
  toArray(instructors)
    .filter(isActiveRecord)
    .sort((first, second) => {
      const revenueDiff = Number(second.totalRevenue || 0) - Number(first.totalRevenue || 0);
      if (revenueDiff !== 0) return revenueDiff;
      return Number(second.totalStudents || 0) - Number(first.totalStudents || 0);
    })
    .slice(0, 4)
    .map((instructor, index) => {
      const courses = toArray(instructor.courses);
      const ratedCourses = courses.filter((course) => Number(course.rating || 0) > 0);
      const averageRating = ratedCourses.length
        ? sumNumbers(ratedCourses, (course) => course.rating) / ratedCourses.length
        : 0;

      return {
        id: instructor.instructorId,
        name: instructor.fullName || instructor.email || `Instructor #${instructor.instructorId}`,
        courses: Number(instructor.numberOfClasses || courses.length || 0),
        rating: averageRating ? averageRating.toFixed(1) : "0.0",
        rank: index + 1,
        avatar: instructor.avatar || "",
      };
    });

const mapRecentActivityFromDb = ({ users = [], instructors = [], courses = [] }) => {
  const userActivities = toArray(users).map((user) => ({
    id: `user-${user.id}`,
    label: "New user",
    title: user.fullName || user.email || `User #${user.id}`,
    date: user.createdAt,
  }));

  const instructorActivities = toArray(instructors).map((instructor) => ({
    id: `instructor-${instructor.instructorId}`,
    label: "Instructor update",
    title: instructor.fullName || instructor.email || `Instructor #${instructor.instructorId}`,
    date: instructor.updatedAt || instructor.createdAt,
  }));

  const courseActivities = toArray(courses).map((course) => ({
    id: `course-${course.id}`,
    label: course.publishedAt ? "Course published" : "Course created",
    title: course.title || `Course #${course.id}`,
    date: course.publishedAt || course.updatedAt || course.createdAt,
  }));

  return [...userActivities, ...instructorActivities, ...courseActivities]
    .filter((activity) => getDateTime(activity.date) > 0)
    .sort((first, second) => getDateTime(second.date) - getDateTime(first.date))
    .slice(0, 4)
    .map(({ date, ...activity }) => ({
      ...activity,
      time: formatRelativeTime(date),
    }));
};

const mapRoleDistributionFromDb = (users) => {
  const roleItems = toArray(users);

  if (roleItems.every((item) => item?.name && item?.count !== undefined)) {
    const totalUsers = Math.max(
      roleItems.reduce((total, item) => total + Number(item.count || 0), 0),
      1,
    );
    const colorByName = {
      Students: "#2563EB",
      Instructors: "#93C5FD",
      Administrators: "#1D4ED8",
    };

    return roleItems.map((item) => ({
      name: item.name,
      count: Number(item.count || 0),
      color: colorByName[item.name] || "#2563EB",
      value: Math.round((Number(item.count || 0) / totalUsers) * 100),
      amount: formatCompactNumber(item.count),
    }));
  }

  const activeUsers = toArray(users).filter(isActiveRecord);
  const totals = activeUsers.reduce(
    (result, user) => {
      const role = normalizeRoleFromDb(user.role);
      return { ...result, [role]: result[role] + 1 };
    },
    { Student: 0, Instructor: 0, Administrator: 0 },
  );
  const totalUsers = Math.max(activeUsers.length, 1);

  return [
    { name: "Students", count: totals.Student, color: "#2563EB" },
    { name: "Instructors", count: totals.Instructor, color: "#93C5FD" },
    { name: "Administrators", count: totals.Administrator, color: "#1D4ED8" },
  ].map((item) => ({
    ...item,
    value: Math.round((item.count / totalUsers) * 100),
    amount: formatCompactNumber(item.count),
  }));
};

const mapUserGrowthFromDb = (users, year) => {
  const monthlyCounts = new Map(monthLabels.map((month) => [month, 0]));

  toArray(users).forEach((user) => {
    const createdAt = new Date(user.createdAt || 0);
    if (Number.isNaN(createdAt.getTime())) return;
    if (createdAt.getFullYear() !== year) return;

    const month = monthLabels[createdAt.getMonth() - 4];
    if (!month) return;

    monthlyCounts.set(month, monthlyCounts.get(month) + 1);
  });

  return monthLabels.map((month) => ({
    month,
    value: monthlyCounts.get(month) || 0,
  }));
};

const mapStatisticsFromDb = (data = {}) => {
  const statistics = data.statistics || data;

  if (statistics.totalUsers !== undefined) {
    return {
      totalUsers: formatNumber(statistics.totalUsers),
      totalTeachers: formatNumber(statistics.totalTeachers),
      totalCourses: formatNumber(statistics.totalCourses),
      totalRevenue: formatVnd(statistics.totalRevenue),
    };
  }

  const { users, instructors, courses } = data;

  const activeUsers = toArray(users).filter(isActiveRecord);
  const activeInstructors = toArray(instructors).filter(isActiveRecord);
  const activeCourses = toArray(courses).filter(isActiveRecord);
  const totalRevenue = sumNumbers(activeInstructors, (instructor) => instructor.totalRevenue);

  return {
    totalUsers: formatNumber(activeUsers.length),
    totalTeachers: formatNumber(activeInstructors.length),
    totalCourses: formatNumber(activeCourses.length),
    totalRevenue: formatVnd(totalRevenue),
  };
};

const buildFallbackDashboardDataFromDb = ({ users, instructors, courses }, selectedYear) => {
  const safeUsers = toArray(users);
  const safeInstructors = toArray(instructors);
  const safeCourses = toArray(courses);
  const activeUsers = safeUsers.filter(isActiveRecord);
  const activeInstructors = safeInstructors.filter(isActiveRecord);
  const activeCourses = safeCourses.filter(isActiveRecord);

  return {
    statistics: {
      totalUsers: activeUsers.length,
      totalTeachers: activeInstructors.length,
      totalCourses: activeCourses.length,
      totalRevenue: sumNumbers(activeInstructors, (instructor) => instructor.totalRevenue),
    },
    growthSeries: mapUserGrowthFromDb(safeUsers, getYearFromRange(selectedYear)),
    roleDistribution: mapRoleDistributionFromDb(safeUsers),
    recentUsers: mapRecentUsersFromDb(safeUsers),
    featuredInstructors: mapFeaturedInstructorsFromDb(safeInstructors),
    recentActivity: mapRecentActivityFromDb({
      users: safeUsers,
      instructors: safeInstructors,
      courses: safeCourses,
    }),
  };
};

const useDashboardData = () => {
  const axiosClient = useAxiosPrivate();
  const [rawData, setRawData] = useState(emptyDashboardData);
  const [selectedYear, setSelectedYear] = useState(dashboardYearOptions[0].value);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDashboardDataFromDb = async () => {
      try {
        setIsLoading(true);
        setError("");

        const dashboard = await getAdminDashboardApi(getYearFromRange(selectedYear), axiosClient);

        if (!isMounted) return;

        setRawData({
          statistics: dashboard?.statistics || {},
          growthSeries: Array.isArray(dashboard?.growthSeries) ? dashboard.growthSeries : [],
          roleDistribution: Array.isArray(dashboard?.roleDistribution) ? dashboard.roleDistribution : [],
          recentUsers: Array.isArray(dashboard?.recentUsers) ? dashboard.recentUsers : [],
          featuredInstructors: Array.isArray(dashboard?.featuredInstructors) ? dashboard.featuredInstructors : [],
          recentActivity: Array.isArray(dashboard?.recentActivity) ? dashboard.recentActivity : [],
        });
      } catch (fetchError) {
        if (isMounted) {
          try {
            const [users, instructors, courses] = await Promise.all([
              getAdminUsersApi(axiosClient),
              getAdminInstructorsApi(axiosClient),
              getAdminCoursesApi(axiosClient),
            ]);

            if (!isMounted) return;

            setRawData(buildFallbackDashboardDataFromDb({ users, instructors, courses }, selectedYear));
            setError("");
          } catch (fallbackError) {
            setError(
              fallbackError?.response?.data?.message
                || fetchError?.response?.data?.message
                || "Failed to load dashboard data.",
            );
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadDashboardDataFromDb();

    return () => {
      isMounted = false;
    };
  }, [axiosClient, selectedYear]);

  const dashboardData = useMemo(() => {
    return {
      statistics: mapStatisticsFromDb(rawData),
      growthSeries: rawData.growthSeries,
      roleDistribution: mapRoleDistributionFromDb(rawData.roleDistribution),
      recentUsers: rawData.recentUsers,
      featuredInstructors: rawData.featuredInstructors,
      recentActivity: rawData.recentActivity,
    };
  }, [rawData]);

  return {
    ...dashboardData,
    isLoading,
    error,
    selectedYear,
    setSelectedYear,
    yearOptions: dashboardYearOptions,
  };
};

const Dashboard = () => {
  const {
    statistics,
    growthSeries,
    roleDistribution,
    recentUsers,
    featuredInstructors,
    recentActivity,
    isLoading,
    error,
    selectedYear,
    setSelectedYear,
    yearOptions,
  } = useDashboardData();

  return (
    <div className="adminDashboard">
      <div className="adminDashboardContent">
        {error && <div className="adminDashboardError">{error}</div>}

        <Statistics data={statistics} loading={isLoading} />

        <div className="dashboardCharts">
          <div className="growthChartWrapper">
            <GrowthChart
              series={growthSeries}
              yearOptions={yearOptions}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>

          <div className="roleDistributionWrapper">
            <RoleDistribution data={roleDistribution} />
          </div>
        </div>

        <div className="dashboardRows">
          <div className="dashboardRowItem">
            <UserRow users={recentUsers} />
          </div>

          <hr className="dashboardRowSeparator" />

          <div className="dashboardRowItem">
            <TeacherRow instructors={featuredInstructors} />
          </div>

          <hr className="dashboardRowSeparator" />

          <div className="dashboardRowItem">
            <ActivityRow activities={recentActivity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
