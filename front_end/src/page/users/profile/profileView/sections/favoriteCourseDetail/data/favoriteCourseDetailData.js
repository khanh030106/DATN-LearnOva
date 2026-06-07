export const FAVORITE_DETAIL_TABS = [
  { id: "overview", label: "Tổng quan" },
  { id: "curriculum", label: "Nội dung khóa học" },
  { id: "instructor", label: "Giảng viên" },
  { id: "reviews", label: "Đánh giá" },
  { id: "qa", label: "Hỏi đáp" },
];

export const DEFAULT_FAVORITE_DETAIL = {
  category: "Lập trình Web",
  title: "React.js Từ Cơ Bản Đến Nâng Cao",
  instructor: {
    name: "Nguyễn Văn A",
    role: "Senior Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=160&h=160",
    bio: "Giảng viên tập trung vào cách học thực chiến: hiểu tư duy component, viết code rõ ràng và biết kết nối dữ liệu vào giao diện.",
    stats: ["8 năm kinh nghiệm", "32 khóa học", "18.4k học viên", "4.9 điểm đánh giá"],
  },
  rating: 4.8,
  reviews: "1.2k",
  students: "12.5k",
  progressText: "32 / 48 bài học",
  remaining: "Còn 5h 30m",
  duration: "8h 30m",
  level: "Tất cả",
  language: "Tiếng Việt",
  topic: "Có",
  exercise: "Có",
  certificate: "Có",
  updatedAt: "15/05/2024",
  lessonsTotal: 48,
  price: "299.000đ",
  originalPrice: "499.000đ",
  summary:
    "Khóa học giúp bạn nắm vững React.js từ cơ bản đến nâng cao, bao gồm hooks, context, router, state management và triển khai dự án thực tế.",
  outcomes: [
    "Hiểu rõ về React.js và cách hoạt động của nó",
    "Sử dụng React Router để xây dựng ứng dụng đa trang",
    "Xây dựng ứng dụng React với Hooks và Functional Components",
    "Quản lý state nâng cao với Context API và Redux",
    "Quản lý state và side effects hiệu quả",
    "Triển khai dự án thực tế và tối ưu hiệu suất",
  ],
  about: [
    "Phần giới thiệu mới được viết theo hướng dễ học hơn: bạn bắt đầu từ cấu trúc component, sau đó đi qua props, state, hooks và cách tổ chức một màn hình thật.",
    "Nội dung không chỉ dừng ở lý thuyết. Mỗi chương đều có ví dụ nhỏ để bạn luyện cách đọc dữ liệu, chia layout và xử lý trạng thái trong giao diện.",
    "Sau khóa học, bạn có thể tự dựng một page React hoàn chỉnh, chuẩn bị sẵn cấu trúc để nối API khi backend sẵn sàng.",
  ],
  curriculum: [
    {
      id: 1,
      title: "Giới thiệu về React",
      meta: "4 / 4 bài học - 30 phút",
      open: true,
      lessons: [
        { number: "1.1", title: "React là gì?", type: "Video", duration: "05:30", done: true },
        { number: "1.2", title: "Cài đặt môi trường", type: "Video", duration: "08:15", done: true },
        { number: "1.3", title: "JSX và Render", type: "Video", duration: "10:45", done: true },
        { number: "1.4", title: "Bài tập: Tạo ứng dụng đầu tiên", type: "Bài tập", duration: "05:30", done: false },
      ],
    },
    { id: 2, title: "Components & Props", meta: "6 bài học - 1h 10m", open: false, lessons: [] },
    { id: 3, title: "State & Events", meta: "6 bài học - 1h 20m", open: false, lessons: [] },
  ],
  reviewsList: [
    {
      name: "Hoàng Minh",
      score: 5,
      text: "Khóa học rõ ràng, phần ví dụ giúp mình hiểu nhanh cách chia component và xử lý state.",
    },
    {
      name: "Lan Anh",
      score: 4.8,
      text: "Giảng viên nói dễ hiểu, nội dung thực tế hơn nhiều so với các khóa nhập môn mình từng học.",
    },
    {
      name: "Tuấn Kiệt",
      score: 4.7,
      text: "Mình thích phần bài tập cuối chương vì có thể tự kiểm tra lại ngay.",
    },
  ],
  questions: [
    {
      title: "Học xong khóa này có đủ để làm dự án cá nhân không?",
      answer: "Có. Bạn sẽ có nền tảng để dựng page, tách component, xử lý state và chuẩn bị nối API.",
    },
    {
      title: "Người mới học JavaScript có theo được không?",
      answer: "Theo được nếu bạn đã biết biến, hàm, array và object cơ bản. Các phần React được giải thích từng bước.",
    },
  ],
};

export const buildFavoriteCourseDetail = (course = {}) => ({
  ...DEFAULT_FAVORITE_DETAIL,
  ...course,
  title: course.title || DEFAULT_FAVORITE_DETAIL.title,
  image: course.image || DEFAULT_FAVORITE_DETAIL.image,
  rating: course.rating || DEFAULT_FAVORITE_DETAIL.rating,
  reviews: course.reviews || DEFAULT_FAVORITE_DETAIL.reviews,
  lessonsTotal: course.lessonsTotal || DEFAULT_FAVORITE_DETAIL.lessonsTotal,
  progressText:
    course.lessonsDone && course.lessonsTotal
      ? `${course.lessonsDone} / ${course.lessonsTotal} bài học`
      : DEFAULT_FAVORITE_DETAIL.progressText,
  remaining: course.remaining || DEFAULT_FAVORITE_DETAIL.remaining,
  instructor: {
    ...DEFAULT_FAVORITE_DETAIL.instructor,
    name: course.instructor || DEFAULT_FAVORITE_DETAIL.instructor.name,
  },
});
