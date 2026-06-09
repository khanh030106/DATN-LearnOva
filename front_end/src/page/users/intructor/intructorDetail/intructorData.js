import {FaFacebook, FaLinkedin, FaTwitter, FaYoutube} from "react-icons/fa";

export const instructor = {
    name: 'Nguyễn Thanh Tùng',
    title: 'Giảng viên Lập trình Web & React',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB875tbT5QJmk3_urDvDrsxNkNYNZFsMq65RUfGa6sLx7EciHKZ-bGnL1r&s=10',
    bio: 'Tôi là lập trình viên và giảng viên dạy lập trình với hơn 10 năm kinh nghiệm. Chuyên biệt về Frontend Development và các công nghệ web hiện đại.',
    followers: '12.5K',
    followersLabel: 'Người theo dõi',
    courses: 18,
    coursesLabel: 'Khóa học',
    students: '256',
    studentsLabel: '',
    rating: '4.9/5',
    ratingLabel: 'Đánh giá tương tình',
    email: 'minh.anh@gmail.com',
    phone: '12.9K Người theo dõi',
    location: 'Hà Nội, Việt Nam',
    socials: [
        {
            icon: FaLinkedin,
            url: '#',
            color: '#0A66C2'
        },
        {
            icon: FaFacebook,
            url: '#',
            color: '#1877F2'
        },
        {
            icon: FaTwitter,
            url: '#',
            color: '#1DA1F2'
        },
        {
            icon: FaYoutube,
            url: '#',
            color: '#FF0000'
        }
    ]
};

export const introText = `Phương pháp giảng dạy của tôi là lấy trong thực hành, dựa vào trực tiếp và từ từ giải quyết vấn đề. Thông qua các dự án thực tế, bạn sẽ nắm rõ - cái riêng - nội dung bài học để áp dụng ngay.`;

export const introDetails = `Tôi là một lập trình viên và giảng viên với hơn 10 năm kinh nghiệm trong lĩnh vực phát triển ứng dụng web, từng tham gia nhiều dự án thực tế cho doanh nghiệp trong và ngoài nước. Trong suốt quá trình làm việc và giảng dạy, tôi đã đào tạo thành công hàng nghìn học viên từ trình độ cơ bản đến nâng cao, giúp họ xây dựng nền tảng kiến thức vững chắc và sẵn sàng tham gia vào môi trường làm việc chuyên nghiệp. Các khóa học của tôi tập trung vào việc truyền đạt kiến thức một cách dễ hiểu, trực quan và thực tiễn, giúp học viên nhanh chóng nắm bắt công nghệ mới và áp dụng ngay vào các dự án thực tế. Tôi luôn cập nhật những xu hướng công nghệ hiện đại nhất như React, Next.js, TypeScript, Node.js và các công cụ phát triển tiên tiến để mang đến nội dung chất lượng, sát với nhu cầu tuyển dụng của doanh nghiệp hiện nay.`;

export const achievements = [
    'Top 10 Giảng viên được yêu thích năm 2023',
    'Hơn 50,000 học viên đã học',
    'Đạt cấp 4.9⭐ sau các đánh giá học viên',
    'Đặc tính giáo dục từ 2021'
];

export const courses = [
    {
        id: 1,
        title: 'React cơ bản trong công cộng',
        rating: 4.9,
        reviews: 251,
        price: '399.000đ',
        student : '256',
        originalPrice: 'Giảm giá',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l_tdSDyo5RVi810XBNScMW8lWYd0BubSd37CBKCe-w&s=10'
    },
    {
        id: 2,
        title: 'JavaScript cơ bản Z',
        rating: 4.8,
        reviews: 361,
        price: '299.000đ',
        student : '256',
        originalPrice: '375 hạn sơn',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l_tdSDyo5RVi810XBNScMW8lWYd0BubSd37CBKCe-w&s=10'
    },
    {
        id: 3,
        title: 'Next.js thực chiến',
        rating: 4.9,
        reviews: 182,
        student : '256',
        price: '499.000đ',
        originalPrice: '500 khác',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l_tdSDyo5RVi810XBNScMW8lWYd0BubSd37CBKCe-w&s=10'
    },
    {
        id: 4,
        title: 'TypeScript cơ bản',
        rating: 4.7,
        reviews: 124,
        student : '256',
        price: '349.000đ',
        originalPrice: '450 khác',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l_tdSDyo5RVi810XBNScMW8lWYd0BubSd37CBKCe-w&s=10'
    },
    {
        id: 5,
        title: 'Tailwind CSS từ A-Z',
        rating: 4.8,
        reviews: 298,
        student : '256',
        price: '299.000đ',
        originalPrice: '375 khác',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l_tdSDyo5RVi810XBNScMW8lWYd0BubSd37CBKCe-w&s=10'
    },
    {
        id: 6,
        title: 'Node.js & Express.js',
        rating: 4.9,
        reviews: 215,
        student : '256',
        price: '399.000đ',
        originalPrice: '500 khác',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l_tdSDyo5RVi810XBNScMW8lWYd0BubSd37CBKCe-w&s=10'
    }
];

 export const reviews = [
    {
        id: 1,
        name: 'Trần Văn Hùng',
        avatar: 'https://via.placeholder.com/40/FF6B6B/FFFFFF?text=T',
        rating: 5,
        time: '2 ngày trước',
        text: 'Giáo viên dạy rất tốt, bài giảng dễ hiểu, có nhiều ví dụ thực tế. Rất hài lòng với khóa học này.',
        likes: 24
    },
    {
        id: 2,
        name: 'Lê Thị Hà',
        avatar: 'https://via.placeholder.com/40/4ECDC4/FFFFFF?text=H',
        rating: 5,
        time: '5 ngày trước',
        text: 'Khóa học cần thiết và bổ ích. Support rất tốt, khi có câu hỏi giáo viên trả lời rất chi tiết.',
        likes: 18
    },
    {
        id: 3,
        name: 'Phạm Quốc Duy',
        avatar: 'https://via.placeholder.com/40/95E1D3/FFFFFF?text=D',
        rating: 5,
        time: '1 tuần trước',
        text: 'Sau khi học xong khóa này mình có thể tự xây dựng được các dự án thực tế. Cảm ơn thầy.',
        likes: 31
    }
];