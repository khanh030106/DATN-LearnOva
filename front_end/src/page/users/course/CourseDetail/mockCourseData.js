export const courseDescription = [
    "Khóa học này sẽ dạy bạn cách xây dựng các ứng dụng web mạnh mẽ sử dụng Spring Boot, một framework phổ biến nhất trong cộng đồng Java.",
    "Bạn sẽ học cách sử dụng Spring Data JPA để truy xuất dữ liệu từ cơ sở dữ liệu một cách hiệu quả, cũng như cách xây dựng các REST API chuyên nghiệp.",
    "Ngoài ra, khóa học còn hướng dẫn cách tích hợp GitHub Copilot để tăng tốc độ phát triển và nâng cao hiệu suất làm việc.",
    "Cuối cùng, bạn sẽ áp dụng tất cả kiến thức vào một dự án thực tế hoàn chỉnh, từ thiết kế đến triển khai lên production."
];


export const instructor = {
    name: 'Anh Nguyễn Ngoc',
    title: 'Ths. Khoa học, Giảng viên tại FPoly',
    avatar: 'https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg',
    bio: 'Xin chào các bạn học viên, tôi là Nguyễn Ngoc Anh, hiện là giảng viên và chuyên gia trong lĩnh vực Công nghệ Thông tin với hơn 22 năm kinh nghiệm làm việc và giảng dạy thực tế. Tôi tốt nghiệp Thạc sĩ chuyên ngành Công nghệ Thông tin tại Viện Công nghệ Châu Á (AIT - Asian Institute of Technology), Thái Lan – một trong những cơ sở đào tạo sau đại học hàng đầu trong khu vực châu Á về kỹ thuật và công nghệ.Xin chào các bạn học viên, tôi là Nguyễn Ngoc Anh, hiện là giảng viên và chuyên gia trong lĩnh vực Công nghệ Thông tin với hơn 22 năm kinh nghiệm làm việc và giảng dạy thực tế. Tôi tốt nghiệp Thạc sĩ chuyên ngành Công nghệ Thông tin tại Viện Công nghệ Châu Á (AIT - Asian Institute of Technology), Thái Lan – một trong những cơ sở đào tạo sau đại học hàng đầu trong khu vực châu Á về kỹ thuật và công nghệ.Xin chào các bạn học viên, tôi là Nguyễn Ngoc Anh, hiện là giảng viên và chuyên gia trong lĩnh vực Công nghệ Thông tin với hơn 22 năm kinh nghiệm làm việc và giảng dạy thực tế. Tôi tốt nghiệp Thạc sĩ chuyên ngành Công nghệ Thông tin tại Viện Công nghệ Châu Á (AIT - Asian Institute of Technology), Thái Lan – một trong những cơ sở đào tạo sau đại học hàng đầu trong khu vực châu Á về kỹ thuật và công nghệ.',
    social: [
        { icon: '𝕏', url: '#', label: 'Twitter' },
        { icon: 'f', url: '#', label: 'Facebook' },
        { icon: 'in', url: '#', label: 'LinkedIn' },
        { icon: '▶', url: '#', label: 'YouTube' },
        { icon: '🔗', url: '#', label: 'Website' }
    ]
};
// Reviews data + state (thêm vào cùng chỗ với qaData)
 export const reviewsData = [
    { id: 1, name: 'Nguyễn Quang H.', initials: 'NH', rating: 5, time: '5 months ago', text: 'Khóa học hay, Giảng viên nhiều kinh nghiệm.', helpful: 12 },
    { id: 2, name: 'Trần Thị H. A.', initials: 'TA', rating: 5, time: '6 months ago', text: 'Nội dung dễ hiểu, ví dụ thực tế tốt.', helpful: 8 },
    { id: 3, name: 'Lê Minh', initials: 'LM', rating: 4, time: '2 months ago', text: 'Tốt nhưng cần bổ sung phần test.', helpful: 3 }
];
export const qaData = [
    {
        id: 1,
        votes: 12,
        views: 102,
        title: 'Làm thế nào để triển khai Authentication với JWT trong Spring Boot?',
        description: 'Em đang học phần Spring Security nhưng chưa hiểu rõ cách sử dụng JWT.',
        tags: ['Spring Boot', 'Spring Security', 'JWT'],
        author: { name: 'Nguyễn Tuấn', initials: 'NT', level: '2 giờ trước' }
    },
    {
        id: 2,
        votes: 8,
        views: 162,
        title: 'Media trong React là gì và cách sử dụng như thế nào?',
        description: 'Em thắc lúc này về nhiều cách để xử lý media trong React, không biết chọn nào là tốt nhất?',
        tags: ['React', 'JavaScript', 'Media'],
        author: { name: 'Trần Hà', initials: 'TH', level: '5 giờ trước' }
    },
    {
        id: 3,
        votes: 5,
        views: 154,
        title: 'Lỗi CORS khi gọi API từ frontend, cách khắc phục?',
        description: 'Em đang gặp lỗi CORS khi gọi API từ React sang Spring Boot, đã thử nhiều cách nhưng vẫn không được.',
        tags: ['CORS', 'React', 'Spring Boot'],
        author: { name: 'Lê Hoàng', initials: 'LH', level: '1 ngày trước' }
    }
];

 export const course = {
    title: 'Lập trình Spring Boot, Web, Spring Data với Github Copilot',

    instructor: {
        name: 'Anh Nguyễn Ngọc',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'Giảng viên'
    },

    rating: 5.0,
    reviews: 92,
    hours: '32 hours',
    level: 'Beginner level'
};

 export const curriculum = [
    {
        id: 1,
        title: 'Tổng quan về Spring Framework',
        lectures: 3,
        duration: '20min',
        lessons: [
            { id: 1, title: 'Giới thiệu Spring', duration: '8min', watched: false },
            { id: 2, title: 'Cài đặt và cấu hình', duration: '7min', watched: false },
            { id: 3, title: 'Tạo project đầu tiên', duration: '5min', watched: false }
        ]
    },
    {
        id: 2,
        title: 'Spring Boot',
        lectures: 8,
        duration: '1h 25min',
        lessons: [
            { id: 4, title: 'Spring Boot là gì?', duration: '10min', watched: false },
            { id: 5, title: 'Dependencies Management', duration: '15min', watched: false },
            { id: 6, title: 'Application Properties', duration: '12min', watched: false }
        ]
    },
    {
        id: 3,
        title: 'Cài đặt JDK',
        lectures: 3,
        duration: '25min',
        lessons: [
            { id: 7, title: 'Download JDK', duration: '5min', watched: false },
            { id: 8, title: 'Cấu hình Environment', duration: '8min', watched: false },
            { id: 9, title: 'Verify Installation', duration: '3min', watched: false }
        ]
    },
    {
        id: 4,
        title: 'Cài đặt Spring Tool 4 for Eclipse',
        lectures: 5,
        duration: '45min',
        lessons: [
            { id: 10, title: 'Download Eclipse', duration: '5min', watched: false },
            { id: 11, title: 'Install Spring Tools', duration: '10min', watched: false }
        ]
    },
    {
        id: 5,
        title: 'Cài đặt Spring Tool 4 for Visual Studio Code',
        lectures: 7,
        duration: '1h 10min',
        lessons: [
            { id: 12, title: 'VS Code Setup', duration: '8min', watched: false }
        ]
    },
    {
        id: 6,
        title: 'Cài đặt IntelliJ',
        lectures: 4,
        duration: '40min',
        lessons: [
            { id: 13, title: 'IntelliJ Download', duration: '5min', watched: false }
        ]
    },
    {
        id: 7,
        title: 'Tạo dự án bằng Spring Initializer',
        lectures: 6,
        duration: '45min',
        lessons: [
            { id: 14, title: 'Spring Initializer', duration: '8min', watched: false }
        ]
    },
    {
        id: 8,
        title: 'Tạo dự án Spring Boot trong Visual Studio Code',
        lectures: 5,
        duration: '45min',
        lessons: [
            { id: 15, title: 'Create Project', duration: '10min', watched: false }
        ]
    },
    {
        id: 9,
        title: 'Tạo dự án Spring Boot trong IntelliJ',
        lectures: 4,
        duration: '40min',
        lessons: [
            { id: 16, title: 'IntelliJ Project', duration: '8min', watched: false }
        ]
    },
    {
        id: 10,
        title: 'Tích hợp GitHub Copilot với Visual Studio Code',
        lectures: 6,
        duration: '55min',
        lessons: [
            { id: 17, title: 'Install Copilot', duration: '5min', watched: false }
        ]
    }
];