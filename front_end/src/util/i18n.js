import { getLanguage } from './language.js';

const translations = {
  en: {
    // Banner / Home
    begin_your_journey_of: 'Begin your journey of',
    knowledge_discovery: 'knowledge discovery',
    home_banner_description: 'Experience modern education with interactive technology, connecting you to knowledge from leading experts.',
    start_learning_now: 'Start learning now',

    // Roles
    roles_header_title: 'Reaching further together',
    roles_header_subtitle: 'Choose your role to explore specialized features designed specifically for you.',
    role_student_title: 'Student',
    role_student_desc: 'Access thousands of high-quality courses...',
    role_student_link: 'Learn More',
    role_instructor_title: 'Instructor',
    role_instructor_desc: 'Build your personal brand...',
    role_instructor_link: 'Become an Instructor',
    role_admin_title: 'Administrator',
    role_admin_desc: 'Efficiently manage internal training...',
    role_admin_link: 'Enterprise Solutions',

    // Header / Nav
    home: 'Home',
    courses: 'Courses',
    instructors: 'Instructors',
    about_us: 'About us',
    search_placeholder: 'Search courses...',
    search_full: 'Search Course, Instructor, Category',

    featured_course: 'Featured Course',
    featured_course_description: 'The latest and hottest knowledge is constantly updated..',
    all_courses: 'All courses ›',

    // Header menu items
    new_courses: 'New Courses',
    popular_courses: 'Popular Courses',
    trending_courses: 'Trending Courses',

    // User menu / account
    continue_learning: 'Continue Learning',
    my_courses: 'My Courses',
    completed_courses: 'Completed Courses',
    certificates: 'Certificates',
    wishlist: 'Wishlist',

    // Search suggestions
    react_masterclass: 'React JS Masterclass',
    node_api: 'NodeJS API',
    uiux_design: 'UI UX Design',
    java_programming: 'Java Programming',
    ai_ml: 'AI & Machine Learning',
    top_react_instructor: 'Top React Instructor',

    // Sidebars & common
    sidebar_main: 'Main',
    sidebar_business: 'Business',
    sidebar_moderation: 'Moderation',
    dashboard: 'Dashboard',
    students: 'Students',
    messages: 'Messages',
    promotions: 'Promotions',
    revenue: 'Revenue',
    analytics: 'Analytics',
    create_new_course: 'Create new course',
    view_profile: 'View profile',

    overview: 'Overview',
    users: 'Users',
    instructors_label: 'Instructors',
    categories: 'Categories',
    vouchers: 'Vouchers',
    reviews_comments: 'Reviews & Comments',
    violation_reports: 'Violation Reports',

    // Login / Auth
    login_welcome: 'Welcome to LearnOva',
    login_subtitle: 'Kindly fill in your details below to create an account',
    email_label: 'Email',
    email_placeholder: 'youremail@gmail.com',
    password_label: 'Password',
    password_placeholder: 'your password',
    remember_me: 'Remember me',
    forgot_password: 'Forgot password?',
    login_button: 'Login',
    sign_up: 'Sign up',
    no_account_prompt: "Don't have an account yet?",

    // Cart / Checkout
    cart_title: 'Your Cart',
    cart_items: 'items',
    cart_empty: 'Your cart is empty.',
    course: 'Course',
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total',
    actions: 'Actions',
    order_summary: 'Order summary',
    subtotal: 'Subtotal',
    discount: 'Discount',
    voucher_code: 'Voucher code',
    enter_voucher: 'Enter voucher',
    proceed_checkout: 'Proceed to checkout',
    continue_shopping: 'Continue shopping',
    total_price: 'Total Price',
    remove_course_title: 'Remove course?',
    remove_course_text: 'Are you sure you want to remove',
    cancel: 'Cancel',
    remove: 'Remove',

    // Course detail / learning
    learning_progress: 'Learning Progress',
    completed: 'Completed',
    you_have_completed: 'You have completed',
    lessons: 'lessons',
    keep_it_up: "Keep it up! You're making great progress.",
    continue_learning: 'Continue Learning',
    restart_course: 'Restart Course',
    course_information: 'Course Information',
    instructor: 'Instructor',
    duration: 'Duration',
    students_label: 'Students',
    lessons_label: 'Lessons',
    last_updated: 'Last Updated',
    level: 'Level',
    need_help: 'Need Help?',
    support_paragraph: 'Ask questions and get support from the instructor and learning community.',
    ask_a_question: 'Ask a Question',

    // Course table / admin
    category: 'Category',
    rating: 'Rating',
    report_count: 'Report Count',
    status: 'Status',
    edit_course: 'Edit Course',
    delete_course: 'Delete Course',
    previous: 'Previous',
    next: 'Next',

    // small labels
    open_cart: 'Open cart',
    open_notifications: 'Open notifications',
    open_user_menu: 'Open user menu',
    close_popup: 'Close popup',
    toggle_language: 'Toggle language'
  },

  vi: {
    // Banner / Home
    begin_your_journey_of: 'Bắt đầu hành trình',
    knowledge_discovery: 'khám phá tri thức',
    home_banner_description: 'Trải nghiệm giáo dục hiện đại với công nghệ tương tác, kết nối bạn đến kiến thức từ các chuyên gia hàng đầu.',
    start_learning_now: 'Bắt đầu học ngay',

    // Roles
    roles_header_title: 'Cùng nhau tiến xa hơn',
    roles_header_subtitle: 'Chọn vai trò của bạn để khám phá các tính năng chuyên biệt dành cho bạn.',
    role_student_title: 'Học viên',
    role_student_desc: 'Truy cập hàng nghìn khoá học chất lượng cao...',
    role_student_link: 'Tìm hiểu thêm',
    role_instructor_title: 'Giảng viên',
    role_instructor_desc: 'Xây dựng thương hiệu cá nhân của bạn...',
    role_instructor_link: 'Trở thành giảng viên',
    role_admin_title: 'Quản trị viên',
    role_admin_desc: 'Quản lý đào tạo nội bộ hiệu quả...',
    role_admin_link: 'Giải pháp doanh nghiệp',

    // Header / Nav
    home: 'Trang chủ',
    courses: 'Khoá học',
    instructors: 'Giảng viên',
    about_us: 'Về chúng tôi',
    search_placeholder: 'Tìm khoá học...',
    search_full: 'Tìm Khoá học, Giảng viên, Thể loại',

    featured_course: 'Khoá học nổi bật',
    featured_course_description: 'Những kiến thức mới nhất và hấp dẫn luôn được cập nhật..',
    all_courses: 'Tất cả khoá học ›',

    // Header menu items
    new_courses: 'Khoá học mới',
    popular_courses: 'Khoá học phổ biến',
    trending_courses: 'Khoá học thịnh hành',

    // User menu / account
    continue_learning: 'Tiếp tục học',
    my_courses: 'Khoá học của tôi',
    completed_courses: 'Khoá học đã hoàn thành',
    certificates: 'Chứng chỉ',
    wishlist: 'Danh sách yêu thích',

    // Search suggestions
    react_masterclass: 'Lớp học React JS',
    node_api: 'Phát triển NodeJS API',
    uiux_design: 'Thiết kế UI/UX',
    java_programming: 'Lập trình Java',
    ai_ml: 'AI & Học máy',
    top_react_instructor: 'Giảng viên React hàng đầu',

    // Sidebars & common
    sidebar_main: 'Chính',
    sidebar_business: 'Kinh doanh',
    sidebar_moderation: 'Kiểm duyệt',
    dashboard: 'Bảng điều khiển',
    students: 'Học viên',
    messages: 'Tin nhắn',
    promotions: 'Khuyến mãi',
    revenue: 'Doanh thu',
    analytics: 'Phân tích',
    create_new_course: 'Tạo khoá học mới',
    view_profile: 'Xem hồ sơ',

    overview: 'Tổng quan',
    users: 'Người dùng',
    instructors_label: 'Giảng viên',
    categories: 'Danh mục',
    vouchers: 'Phiếu giảm giá',
    reviews_comments: 'Đánh giá & Bình luận',
    violation_reports: 'Báo cáo vi phạm',

    // Login / Auth
    login_welcome: 'Chào mừng đến với LearnOva',
    login_subtitle: 'Vui lòng điền thông tin để đăng nhập vào tài khoản',
    email_label: 'Email',
    email_placeholder: 'banemail@gmail.com',
    password_label: 'Mật khẩu',
    password_placeholder: 'mật khẩu của bạn',
    remember_me: 'Ghi nhớ đăng nhập',
    forgot_password: 'Quên mật khẩu?',
    login_button: 'Đăng nhập',
    sign_up: 'Đăng ký',
    no_account_prompt: 'Chưa có tài khoản?',

    // Cart / Checkout
    cart_title: 'Giỏ hàng',
    cart_items: 'món',
    cart_empty: 'Giỏ hàng trống.',
    course: 'Khoá học',
    price: 'Giá',
    quantity: 'Số lượng',
    total: 'Tổng',
    actions: 'Hành động',
    order_summary: 'Tóm tắt đơn hàng',
    subtotal: 'Tạm tính',
    discount: 'Giảm giá',
    voucher_code: 'Mã giảm giá',
    enter_voucher: 'Nhập mã',
    proceed_checkout: 'Thanh toán',
    continue_shopping: 'Tiếp tục mua sắm',
    total_price: 'Tổng giá',
    remove_course_title: 'Xoá khoá học?',
    remove_course_text: 'Bạn có chắc muốn xoá',
    cancel: 'Huỷ',
    remove: 'Xoá',

    // Course detail / learning
    learning_progress: 'Tiến độ học',
    completed: 'Đã hoàn thành',
    you_have_completed: 'Bạn đã hoàn thành',
    lessons: 'bài học',
    keep_it_up: 'Tiếp tục nhé! Bạn đang tiến bộ rất tốt.',
    continue_learning: 'Tiếp tục học',
    restart_course: 'Bắt đầu lại khoá học',
    course_information: 'Thông tin khoá học',
    instructor: 'Giảng viên',
    duration: 'Thời lượng',
    students_label: 'Học viên',
    lessons_label: 'Bài học',
    last_updated: 'Cập nhật lần cuối',
    level: 'Trình độ',
    need_help: 'Cần trợ giúp?',
    support_paragraph: 'Đặt câu hỏi và nhận hỗ trợ từ giảng viên và cộng đồng học tập.',
    ask_a_question: 'Đặt câu hỏi',

    // Course table / admin
    category: 'Thể loại',
    rating: 'Đánh giá',
    report_count: 'Số báo cáo',
    status: 'Trạng thái',
    edit_course: 'Chỉnh sửa khoá học',
    delete_course: 'Xoá khoá học',
    previous: 'Trước',
    next: 'Tiếp',

    // small labels
    open_cart: 'Mở giỏ hàng',
    open_notifications: 'Mở thông báo',
    open_user_menu: 'Mở menu người dùng',
    close_popup: 'Đóng popup',
    toggle_language: 'Chuyển ngôn ngữ'
  }
};

export function t(key) {
  const lang = getLanguage();
  // Prefer requested language, fall back to English, then return key
  return (translations[lang] && translations[lang][key]) || (translations['en'] && translations['en'][key]) || key;
}

export default { t };
