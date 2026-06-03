import React, { useState, useEffect } from 'react';
import {
    User,
    BookOpen,
    Heart,
    LogOut,
    Camera,
    Trophy,
    Flame,
    Award,
    Clock,
    Star,
    Edit3,
    Check,
    Plus,
    ShieldCheck,
    Activity,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    X,
    Target
} from 'lucide-react';
import './ProfileView.css';

const PRESET_AVATARS = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
];

const ProfileView = ({
                         purchasedCourses = [],
                         onStartCourse,
                         onBack,
                         onLogout,
                         initialTab = 'profile'
                     }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('learnova_user_profile');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {}
        }
        return {
            fullName: 'Nguyễn Minh Anh',
            email: 'minhanh.nguyen@gmail.com',
            phone: '090 123 4567',
            address: 'Quận 1, TP. Hồ Chí Minh',
            bio: 'Tôi là một nhà thiết kế đồ họa trẻ với niềm đam mê học hỏi về UI/UX và AI.',
            goal: 'Lập trình viên Fullstack & thiết kế UI',
            avatar: PRESET_AVATARS[0],
            streakDays: 15,
            studyHours: 42,
            points: 1250,
        };
    });

    const [activities, setActivities] = useState(() => {
        const saved = localStorage.getItem('learnova_user_activities');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {}
        }
        return [
            { id: 1, type: 'course', text: 'Bắt đầu học chương 3 khóa "Thiết kế Đồ họa chuyên nghiệp"', date: 'Hôm nay, 10:15' },
            { id: 2, type: 'achievement', text: 'Nhận được huy hiệu "Học viên siêng năng" hạng Vàng', date: 'Hôm qua, 18:30' },
            { id: 3, type: 'quiz', text: 'Hoàn thành bài trắc nghiệm chương 1 đạt điểm tối đa', date: '3 ngày trước' },
            { id: 4, type: 'streak', text: 'Đạt chuỗi liên tục học tập 15 ngày kỷ lục mỗi ngày học 2 tếng sáng 1 tiếng tối 1 tiếng trước khi ngủ ', date: '4 ngày trước' },
            { id: 5, type: 'login', text: 'Đăng nhập vào hệ thống học trực tuyến LearnOva', date: '1 tuần trước' }
        ];
    });

    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [customAvatarUrl, setCustomAvatarUrl] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [newLogText, setNewLogText] = useState('');

    const saveToStorage = (updatedProfile) => {
        localStorage.setItem('learnova_user_profile', JSON.stringify(updatedProfile));
        setProfileData(updatedProfile);
    };

    const handleInputChange = (field, value) => {
        const next = { ...profileData, [field]: value };
        setProfileData(next);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        localStorage.setItem('learnova_user_profile', JSON.stringify(profileData));

        const newAct = {
            id: Date.now(),
            type: 'system',
            text: 'Đã cập nhật thông tin cài đặt tài khoản cá nhân',
            date: 'Vừa xong'
        };
        const nextActs = [newAct, ...activities];
        setActivities(nextActs);
        localStorage.setItem('learnova_user_activities', JSON.stringify(nextActs));

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const handleSelectAvatar = (url) => {
        const next = { ...profileData, avatar: url };
        saveToStorage(next);
        setShowAvatarModal(false);
    };

    const handleCustomAvatarSubmit = (e) => {
        e.preventDefault();
        if (customAvatarUrl.trim()) {
            handleSelectAvatar(customAvatarUrl.trim());
            setCustomAvatarUrl('');
        }
    };

    const handleAddCustomActivity = (e) => {
        e.preventDefault();
        if (!newLogText.trim()) return;

        const newAct = {
            id: Date.now(),
            type: 'custom',
            text: newLogText.trim(),
            date: 'Vừa xong'
        };
        const nextActs = [newAct, ...activities];
        setActivities(nextActs);
        localStorage.setItem('learnova_user_activities', JSON.stringify(nextActs));
        setNewLogText('');
    };

    const handleClearActivities = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử hoạt động không?')) {
            setActivities([]);
            localStorage.removeItem('learnova_user_activities');
        }
    };

    const achievements = [
        {
            id: 'stellar',
            title: 'Học viên Ưu tú',
            description: 'Học tập liên tục tích lũy hơn 30 giờ học đầy cảm hứng.',
            icon: <Award className="achievement-icon" size={28} />,
            threshold: profileData.studyHours >= 30,
            detail: `${profileData.studyHours}/30 Giờ`
        },
        {
            id: 'streak',
            title: 'Chiến binh Kỷ luật',
            description: 'Đạt chuỗi streak học liên tục trên 10 ngày.',
            icon: <Flame className="achievement-icon" size={28} />,
            threshold: profileData.streakDays >= 10,
            detail: `${profileData.streakDays}/10 Ngày`
        },
        {
            id: 'investor',
            title: 'Nhà Kiến tạo Tương lai',
            description: 'Đã đầu tư học tập và sở hữu ít nhất một khóa học chuyên môn.',
            icon: <Star className="achievement-icon" size={28} />,
            threshold: purchasedCourses.length >= 1,
            detail: `${purchasedCourses.length}/1 Khóa`
        },
        {
            id: 'contributor',
            title: 'Tự hào Chia sẻ',
            description: 'Viết lời giới thiệu bản thân truyền cảm hứng trong hồ sơ.',
            icon: <User className="achievement-icon" size={28} />,
            threshold: profileData.bio && profileData.bio.length > 20,
            detail: 'Đã hoàn thành'
        }
    ];

    const sidebarItems = [
        { id: 'profile', label: 'Hồ sơ cá nhân', icon: <User size={18} /> },
        { id: 'courses', label: 'Khóa học của tôi', icon: <BookOpen size={18} /> },
        { id: 'achievements', label: 'Huy hiệu & Thành tích', icon: <Trophy size={18} /> },
        { id: 'activities', label: 'Nhật ký học tập', icon: <Activity size={18} /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <form onSubmit={handleSaveProfile} className="profile-form">
                        <div className="profile-form-header"></div>

                        <div className="avatar-section">
                            <div className="avatar-container">
                                <div className="avatar-wrapper">
                                    <img
                                        src={profileData.avatar}
                                        alt="Profile Large"
                                        className="avatar-large"
                                    />
                                    <div className="avatar-overlay">
                                        <span>Thay đổi</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAvatarModal(true)}
                                    className="avatar-button"
                                >
                                    <Camera size={18} />
                                </button>
                            </div>
                            <h2 className="profile-name">{profileData.fullName}</h2>
                            <p className="profile-subtitle">Học viên Danh dự • Khởi đầu từ 2023</p>

                            <button
                                type="button"
                                onClick={() => setShowAvatarModal(true)}
                                className="btn btn-secondary"
                            >
                                Chọn ảnh đại diện có sẵn
                            </button>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    value={profileData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ email</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    value={profileData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Mục tiêu học tập</label>
                                <input
                                    type="text"
                                    value={profileData.goal}
                                    onChange={(e) => handleInputChange('goal', e.target.value)}
                                    className="form-input"
                                    placeholder="Ví dụ: Designer chuyên nghiệp, Web Developer..."
                                />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Khu vực sinh sống</label>
                            <input
                                type="text"
                                value={profileData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Giới thiệu bản thân</label>
                            <textarea
                                rows="4"
                                value={profileData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                className="form-textarea"
                            />
                        </div>

                        <div className="stats-simulator">
                            <div className="stat-input-group">
                                <label><Flame size={12} /> Chuỗi ngày vàng (Days)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={profileData.streakDays}
                                    onChange={(e) => handleInputChange('streakDays', parseInt(e.target.value) || 0)}
                                    className="form-input-small"
                                />
                            </div>
                            <div className="stat-input-group">
                                <label><Clock size={12} /> Tổng giờ học (Hours)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={profileData.studyHours}
                                    onChange={(e) => handleInputChange('studyHours', parseInt(e.target.value) || 0)}
                                    className="form-input-small"
                                />
                            </div>
                            <div className="stat-input-group">
                                <label><Star size={12} /> Điểm tích lũy (Points)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={profileData.points}
                                    onChange={(e) => handleInputChange('points', parseInt(e.target.value) || 0)}
                                    className="form-input-small"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            {saveSuccess && (
                                <span className="save-success">
                  <CheckCircle2 size={16} /> Đã cập nhật thông tin thành công!
                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.confirm('Khôi phục về thông tin mặc định?')) {
                                        localStorage.removeItem('learnova_user_profile');
                                        window.location.reload();
                                    }
                                }}
                                className="btn btn-secondary"
                            >
                                Đặt lại ban đầu
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                <Check size={16} /> Lưu thay đổi
                            </button>
                        </div>
                    </form>
                );

            case 'courses':
                return (
                    <div className="courses-container">
                        <div className="section-card">
                            <div className="section-header">
                                <div>
                                    <h3>Cổng học tập tự chọn</h3>
                                </div>
                                <span className="badge">{purchasedCourses.length} Khóa đã mua</span>
                            </div>

                            {purchasedCourses.length > 0 ? (
                                <div className="courses-grid">
                                    {purchasedCourses.map((course, i) => {
                                        const progress = i % 2 === 0 ? 65 : 15;
                                        return (
                                            <div key={i} className="course-card">
                                                <div className="course-image">
                                                    <img src={course.image} alt={course.title} />
                                                    <div className="course-badge">KHÓA CỦA TÔI</div>
                                                </div>
                                                <div className="course-content">
                                                    <h4>{course.title}</h4>
                                                    <p className="course-instructor">Giảng viên xuất sắc: {course.instructor}</p>

                                                    <div className="progress-section">
                                                        <div className="progress-header">
                                                            <span>Tiến trình bài học</span>
                                                            <span className="progress-percentage">{progress}%</span>
                                                        </div>
                                                        <div className="progress-bar">
                                                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => onStartCourse?.(course.title)}
                                                        className="btn btn-primary btn-block"
                                                    >
                                                        <BookOpen size={16} />
                                                        Tiếp tục và học ngay
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <BookOpen size={30} />
                                    </div>
                                    <h4>Bạn chưa sở hữu khóa học nào</h4>
                                    <p>Hãy khởi đầu hành trình nâng cao trình độ ngay hôm nay bằng việc chọn lựa các khóa học thịnh hành nhất.</p>
                                    <button
                                        onClick={onBack}
                                        className="btn btn-primary"
                                    >
                                        Xem danh sách khóa học
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'achievements':
                return (
                    <div className="achievements-container">
                        <div className="section-card">
                            <div className="achievements-header">
                                <div>
                                    <h3>Thành tích & Huy hiệu</h3>
                                    <p>Hoàn thành các hoạt động học tập để mở khóa huy hiệu danh hiệu cao quý.</p>
                                </div>
                                <div className="achievement-points">
                                    <Trophy size={22} />
                                    <div>
                                        <p>ĐIỂM LIÊN MINH ANH</p>
                                        <p className="points-value">{profileData.points} XP</p>
                                    </div>
                                </div>
                            </div>

                            <div className="achievements-grid">
                                {achievements.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`achievement-item ${item.threshold ? 'unlocked' : 'locked'}`}
                                    >
                                        <div className="achievement-icon-box">
                                            {item.icon}
                                        </div>
                                        <div className="achievement-content">
                                            <div className="achievement-title">
                                                <h4>{item.title}</h4>
                                                <span className={`status-badge ${item.threshold ? 'achieved' : 'pending'}`}>
                          {item.threshold ? 'ĐẠT ĐƯỢC' : 'CHƯA ĐẠT'}
                        </span>
                                            </div>
                                            <p className="achievement-description">{item.description}</p>
                                            <div className="achievement-progress">
                                                <span>Tiến trình:</span>
                                                <span className="progress-detail">{item.detail}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="premium-box">
                                <div className="premium-content">
                                    <h4><Sparkles size={20} /> Chứng chỉ học viên cao cấp</h4>
                                    <p>
                                        Nhận ngay Chứng chỉ vinh danh bản cứng có chữ ký số của hội đồng chuyên gia LearnOva sau khi bạn hoàn tất bất cứ khóa học nào đạt điểm thi cuối khóa từ 8.0 trở lên.
                                    </p>
                                </div>
                                <button
                                    onClick={onBack}
                                    className="btn btn-secondary"
                                >
                                    Khám phá khóa học
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'activities':
                return (
                    <div className="activities-container">
                        <div className="section-card">
                            <div className="activities-header">
                                <div>
                                    <h3>Nhật ký hoạt động</h3>
                                    <p>Lưu trữ tự động các bước phát triển & nỗ lực bền bỉ của bạn.</p>
                                </div>
                                {activities.length > 0 && (
                                    <button
                                        onClick={handleClearActivities}
                                        className="btn-clear-activities"
                                    >
                                        Xóa lịch sử
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleAddCustomActivity} className="activity-form">
                                <input
                                    type="text"
                                    placeholder="Viết nhật ký tự học hôm nay của bạn... (Ví dụ: Đã học 4 bài và làm bài tập)"
                                    value={newLogText}
                                    onChange={(e) => setNewLogText(e.target.value)}
                                    className="form-input"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    <Plus size={14} /> Ghi hoạt động
                                </button>
                            </form>

                            {activities.length > 0 ? (
                                <div className="timeline">
                                    {activities.map((act) => {
                                        let actType = 'default';
                                        let actIcon = <Activity size={14} />;

                                        if (act.type === 'course') {
                                            actType = 'course';
                                            actIcon = <BookOpen size={14} />;
                                        } else if (act.type === 'achievement') {
                                            actType = 'achievement';
                                            actIcon = <Trophy size={14} />;
                                        } else if (act.type === 'system') {
                                            actType = 'system';
                                            actIcon = <ShieldCheck size={14} />;
                                        } else if (act.type === 'custom') {
                                            actType = 'custom';
                                            actIcon = <Target size={14} />;
                                        }

                                        return (
                                            <div key={act.id} className={`timeline-item timeline-${actType}`}>
                                                <div className="timeline-dot">
                                                    {actIcon}
                                                </div>
                                                <div className="timeline-content">
                                                    <p className="timeline-text">{act.text}</p>
                                                    <span className="timeline-date">{act.date}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="empty-timeline">
                                    <p>Chưa có hoạt động nào được ghi nhận. Hãy tự tin học tập và ghi chép tiến độ của bạn!</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="profile-view">

            {/* Avatar Modal */}
            {showAvatarModal && (
                <div className="modal-overlay">
                    <div className="modal-content avatar-modal">
                        <button
                            onClick={() => setShowAvatarModal(false)}
                            className="modal-close"
                        >
                            <X size={20} />
                        </button>

                        <h3>Chọn ảnh đại diện của bạn</h3>
                        <p>Lựa chọn từ các hình có sẳn dưới đây hoặc cung cấp link hình ảnh tùy thích của riêng bạn.</p>

                        <div className="avatar-grid">
                            {PRESET_AVATARS.map((url, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectAvatar(url)}
                                    className={`avatar-option ${profileData.avatar === url ? 'selected' : ''}`}
                                >
                                    <img src={url} alt={`Preset ${index}`} />
                                    {profileData.avatar === url && (
                                        <div className="selected-check">
                                            <CheckCircle2 size={20} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleCustomAvatarSubmit} className="custom-avatar-form">
                            <label>Nhập liên kết ảnh khác</label>
                            <div className="input-group">
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/... hoặc link ảnh bất kỳ"
                                    value={customAvatarUrl}
                                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                                    className="form-input"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    Chọn
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="profile-wrapper">

                {/* Sidebar */}
                <aside className="profile-sidebar">
                    <div className="sidebar-content">
                        <div className="sidebar-header">
                            <h2>Tài khoản</h2>
                            <Sparkles size={20} />
                        </div>

                        <nav className="sidebar-nav">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="sidebar-logout">
                            <button
                                onClick={onLogout}
                                className="btn-logout"
                            >
                                <LogOut size={18} />
                                Đăng xuất tài khoản
                            </button>
                        </div>

                        <div className="sidebar-profile-card">
                            <img
                                src={profileData.avatar}
                                alt="Avatar"
                                className="sidebar-avatar"
                            />
                            <div className="sidebar-user-info">
                                <p className="user-name">{profileData.fullName}</p>
                                <p className="user-goal">{profileData.goal || 'Thành viên Kỷ luật'}</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="profile-main">
                    <header className="profile-header">
                        <div className="header-info">
                            <p className="header-badge">
                                <Sparkles size={12} />
                                {activeTab === 'profile' ? 'CÀI ĐẶT THÔNG TIN' : activeTab === 'courses' ? 'HỌC TẬP CHỦ ĐỘNG' : activeTab === 'achievements' ? 'CÁC VÙNG VƯƠNG GIẢ' : 'TIẾN TRÌNH CỦA BẠN'}
                            </p>
                            <h1>Chào mừng trở lại, {profileData.fullName}!</h1>
                            <p>Bắt đầu từ ngày tuyệt vời hôm nay để bứt phá giới hạn tri thức.</p>
                        </div>

                        <div className="header-stats">
                            <div className="stat-card">
                                <p className="stat-label">STREAK</p>
                                <p className="stat-value"><Flame size={12} /> {profileData.streakDays}d</p>
                            </div>
                            <div className="stat-card">
                                <p className="stat-label">GIỜ HỌC</p>
                                <p className="stat-value"><Clock size={12} /> {profileData.studyHours}h</p>
                            </div>
                            <div className="stat-card">
                                <p className="stat-label">BẠN ĐỒNG HÀNH</p>
                                <p className="stat-value">⭐ VIP</p>
                            </div>
                        </div>
                    </header>

                    <div className="content-area">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;