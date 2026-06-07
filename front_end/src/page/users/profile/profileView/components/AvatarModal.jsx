import { CheckCircle2, X } from 'lucide-react';
import { PRESET_AVATARS } from '../data/profileData';

const AvatarModal = ({
    profileData,
    customAvatarUrl,
    setCustomAvatarUrl,
    onClose,
    onSelectAvatar,
    onCustomAvatarSubmit,
}) => (
    <div className="modal-overlay">
        <div className="modal-content avatar-modal">
            <button onClick={onClose} className="modal-close" type="button">
                <X size={20} />
            </button>

            <h3>Chọn ảnh đại diện của bạn</h3>
            <p>Lựa chọn từ các hình có sẵn dưới đây hoặc cung cấp link hình ảnh tùy thích của riêng bạn.</p>

            <div className="avatar-grid">
                {PRESET_AVATARS.map((url, index) => (
                    <button
                        key={url}
                        onClick={() => onSelectAvatar(url)}
                        className={`avatar-option ${profileData.avatar === url ? 'selected' : ''}`}
                        type="button"
                    >
                        <img src={url} alt={`Preset ${index + 1}`} />
                        {profileData.avatar === url && (
                            <div className="selected-check">
                                <CheckCircle2 size={20} />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <form onSubmit={onCustomAvatarSubmit} className="custom-avatar-form">
                <label>Nhập liên kết ảnh khác</label>
                <div className="input-group">
                    <input
                        type="url"
                        placeholder="https://images.unsplash.com/... hoặc link ảnh bất kỳ"
                        value={customAvatarUrl}
                        onChange={(event) => setCustomAvatarUrl(event.target.value)}
                        className="form-input"
                    />
                    <button type="submit" className="btn btn-secondary">Chọn</button>
                </div>
            </form>
        </div>
    </div>
);

export default AvatarModal;
