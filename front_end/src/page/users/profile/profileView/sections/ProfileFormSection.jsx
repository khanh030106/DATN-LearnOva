import { Camera, Check, CheckCircle2, Clock, Flame, Star } from 'lucide-react';

const ProfileFormSection = ({
    profileData,
    saveSuccess,
    onInputChange,
    onSaveProfile,
    onOpenAvatarModal,
}) => (
    <form onSubmit={onSaveProfile} className="profile-form">
        <div className="profile-form-header" />

        <div className="avatar-section">
            <div className="avatar-container">
                <div className="avatar-wrapper">
                    <img src={profileData.avatar} alt="Profile Large" className="avatar-large" />
                    <div className="avatar-overlay">
                        <span>Thay đổi</span>
                    </div>
                </div>
                <button type="button" onClick={onOpenAvatarModal} className="avatar-button">
                    <Camera size={18} />
                </button>
            </div>
            <h2 className="profile-name">{profileData.fullName}</h2>
            <p className="profile-subtitle">Học viên Danh dự • Khởi đầu từ 2023</p>
            <button type="button" onClick={onOpenAvatarModal} className="btn btn-secondary">
                Chọn ảnh đại diện có sẵn
            </button>
        </div>

        <div className="form-grid">
            <div className="form-group">
                <label>Họ và tên</label>
                <input type="text" value={profileData.fullName} onChange={(event) => onInputChange('fullName', event.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
                <label>Địa chỉ email</label>
                <input type="email" value={profileData.email} onChange={(event) => onInputChange('email', event.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" value={profileData.phone} onChange={(event) => onInputChange('phone', event.target.value)} className="form-input" />
            </div>
            <div className="form-group">
                <label>Mục tiêu học tập</label>
                <input type="text" value={profileData.goal} onChange={(event) => onInputChange('goal', event.target.value)} className="form-input" />
            </div>
        </div>

        <div className="form-group full-width">
            <label>Khu vực sinh sống</label>
            <input type="text" value={profileData.address} onChange={(event) => onInputChange('address', event.target.value)} className="form-input" />
        </div>

        <div className="form-group full-width">
            <label>Giới thiệu bản thân</label>
            <textarea rows="4" value={profileData.bio} onChange={(event) => onInputChange('bio', event.target.value)} className="form-textarea" />
        </div>

        <div className="stats-simulator">
            <div className="stat-input-group">
                <label><Flame size={12} /> Chuỗi ngày vàng</label>
                <input type="number" min="0" value={profileData.streakDays} onChange={(event) => onInputChange('streakDays', parseInt(event.target.value, 10) || 0)} className="form-input-small" />
            </div>
            <div className="stat-input-group">
                <label><Clock size={12} /> Tổng giờ học</label>
                <input type="number" min="0" value={profileData.studyHours} onChange={(event) => onInputChange('studyHours', parseInt(event.target.value, 10) || 0)} className="form-input-small" />
            </div>
            <div className="stat-input-group">
                <label><Star size={12} /> Điểm tích lũy</label>
                <input type="number" min="0" value={profileData.points} onChange={(event) => onInputChange('points', parseInt(event.target.value, 10) || 0)} className="form-input-small" />
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
            <button type="submit" className="btn btn-primary">
                <Check size={16} /> Lưu thay đổi
            </button>
        </div>
    </form>
);

export default ProfileFormSection;
