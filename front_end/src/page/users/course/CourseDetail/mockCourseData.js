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
export const quizData = {
    id: 1,
    title: "Spring Boot Quiz",

    duration: 20 * 60,

    questions: [
        {
            id: 1,
            question: "Trong Spring Boot, annotation nào được dùng để đánh dấu một class là Controller?",
            options: ["@Service", "@Repository", "@RestController", "@Component"],
            correctAnswer: 2
        },
        {
            id: 2,
            question: "Annotation nào dùng để inject dependency?",
            options: ["@Autowired", "@Bean", "@SpringBootApplication", "@RequestBody"],
            correctAnswer: 0
        },
        {
            id: 3,
            question: "Spring Boot chạy mặc định trên port nào?",
            options: ["3000", "3306", "8080", "5000"],
            correctAnswer: 2
        },
        {
            id: 4,
            question: "File cấu hình mặc định của Spring Boot là gì?",
            options: [
                "application.properties",
                "config.xml",
                "spring.json",
                "application.js"
            ],
            correctAnswer: 0
        },
        {
            id: 5,
            question: "Annotation nào dùng để đánh dấu một Service?",
            options: [
                "@Repository",
                "@Controller",
                "@Service",
                "@Bean"
            ],
            correctAnswer: 2
        },
        {
            id: 6,
            question: "Spring Data JPA được sử dụng để làm gì?",
            options: [
                "Quản lý giao diện",
                "Truy cập cơ sở dữ liệu",
                "Xử lý API",
                "Xác thực người dùng"
            ],
            correctAnswer: 1
        },
        {
            id: 7,
            question: "Annotation nào dùng để ánh xạ HTTP GET?",
            options: [
                "@PostMapping",
                "@RequestMapping",
                "@GetMapping",
                "@PutMapping"
            ],
            correctAnswer: 2
        },
        {
            id: 8,
            question: "Annotation nào dùng để lấy dữ liệu từ URL Path?",
            options: [
                "@RequestParam",
                "@PathVariable",
                "@RequestBody",
                "@Param"
            ],
            correctAnswer: 1
        },
        {
            id: 9,
            question: "Dependency quản lý project phổ biến nhất trong Spring Boot là?",
            options: [
                "Gradle",
                "Maven",
                "NPM",
                "Composer"
            ],
            correctAnswer: 1
        },
        {
            id: 10,
            question: "Annotation nào đánh dấu class là Entity?",
            options: [
                "@Table",
                "@Entity",
                "@Model",
                "@Data"
            ],
            correctAnswer: 1
        },
        {
            id: 11,
            question: "Annotation nào dùng để ánh xạ HTTP POST?",
            options: [
                "@PostMapping",
                "@GetMapping",
                "@RequestBody",
                "@Controller"
            ],
            correctAnswer: 0
        },
        {
            id: 12,
            question: "Spring Boot được xây dựng dựa trên framework nào?",
            options: [
                "Hibernate",
                "Java EE",
                "Spring Framework",
                "Struts"
            ],
            correctAnswer: 2
        },
        {
            id: 13,
            question: "Annotation nào dùng để nhận dữ liệu JSON từ client?",
            options: [
                "@RequestParam",
                "@PathVariable",
                "@RequestBody",
                "@ResponseBody"
            ],
            correctAnswer: 2
        },
        {
            id: 14,
            question: "Annotation nào dùng để trả về JSON trực tiếp?",
            options: [
                "@Controller",
                "@Repository",
                "@RestController",
                "@Configuration"
            ],
            correctAnswer: 2
        },
        {
            id: 15,
            question: "Spring Boot Starter giúp gì?",
            options: [
                "Quản lý dependency dễ dàng",
                "Tăng tốc CPU",
                "Tạo Database",
                "Thiết kế UI"
            ],
            correctAnswer: 0
        },
        {
            id: 16,
            question: "Annotation nào dùng để đánh dấu Repository?",
            options: [
                "@Controller",
                "@Service",
                "@Repository",
                "@Bean"
            ],
            correctAnswer: 2
        },
        {
            id: 17,
            question: "Spring Security dùng để làm gì?",
            options: [
                "Quản lý giao diện",
                "Bảo mật và xác thực",
                "Truy vấn Database",
                "Gửi Email"
            ],
            correctAnswer: 1
        },
        {
            id: 18,
            question: "Annotation nào dùng để định nghĩa Bean thủ công?",
            options: [
                "@Autowired",
                "@Bean",
                "@Entity",
                "@RestController"
            ],
            correctAnswer: 1
        },
        {
            id: 19,
            question: "Annotation nào dùng để cấu hình Spring?",
            options: [
                "@Configuration",
                "@Entity",
                "@PathVariable",
                "@GetMapping"
            ],
            correctAnswer: 0
        },
        {
            id: 20,
            question: "Annotation nào là điểm khởi chạy của Spring Boot Application?",
            options: [
                "@SpringBootApplication",
                "@EnableBoot",
                "@RunApplication",
                "@SpringMain"
            ],
            correctAnswer: 0
        }
    ]
};