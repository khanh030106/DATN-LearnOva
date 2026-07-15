export const studentTableColumns = [
  "Học viên",
  "Điện thoại",
  "Khóa học đã đăng ký",
  "Ngày tham gia",
  "Tiến độ TB",
  "Trạng thái",
  "Action",
];

export const STUDENT_STATUS_LABELS = {
  NOT_STARTED: "Chưa bắt đầu",
  IN_PROGRESS: "Đang học",
  COMPLETED: "Hoàn thành",
};

export const studentStatusFilterOptions = [
  { label: "Tất cả trạng thái", value: "ALL" },
  { label: "Chưa bắt đầu", value: "NOT_STARTED" },
  { label: "Đang học", value: "IN_PROGRESS" },
  { label: "Hoàn thành", value: "COMPLETED" },
];
