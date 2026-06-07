export const SECURITY_OVERVIEW = {
  title: "Tài khoản của bạn đang được bảo vệ tốt",
  description: "Bạn đã bật các tính năng bảo mật quan trọng.",
  levelLabel: "Mức độ bảo mật:",
  levelValue: "Cao",
  progressSegments: [true, true, true, false],
  checks: [
    "Mật khẩu mạnh",
    "Email đã được xác minh",
    "Số điện thoại đã được xác minh",
  ],
};

export const PASSWORD_FIELDS = [
  {
    id: "currentPassword",
    label: "Mật khẩu hiện tại",
    placeholder: "••••••••••••",
  },
  {
    id: "newPassword",
    label: "Mật khẩu mới",
    placeholder: "••••••••••••",
    strength: "Mạnh",
    hint: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
  },
  {
    id: "confirmPassword",
    label: "Xác nhận mật khẩu mới",
    placeholder: "••••••••••••",
  },
];

export const CONTACT_ROWS = [
  {
    id: "email",
    label: "Email",
    profileKey: "email",
    fallback: "nguyenvana@example.com",
  },
  {
    id: "phone",
    label: "Số điện thoại",
    profileKey: "phone",
    fallback: "0123 456 789",
  },
  {
    id: "changeContact",
    label: "Đổi email hoặc số điện thoại",
  },
];

export const SECURITY_ACTIONS = [
  {
    id: "deleteAccount",
    title: "Xóa tài khoản",
    description: "Xóa vĩnh viễn tài khoản và tất cả dữ liệu",
    buttonLabel: "Xóa tài khoản",
    danger: true,
  },
];

export const SECURITY_CARD_TITLES = {
  password: {
    title: "Đổi mật khẩu",
    description: "Cập nhật mật khẩu để bảo vệ tài khoản",
    submitLabel: "Cập nhật mật khẩu",
  },
  contact: {
    title: "Email và số điện thoại",
    description: "Quản lý email và số điện thoại liên kết với tài khoản",
  },
  options: {
    title: "Các tùy chọn bảo mật khác",
  },
};

export const getSecurityContactRows = (profileData = {}) =>
  CONTACT_ROWS.map((row) => ({
    ...row,
    value: row.profileKey ? profileData[row.profileKey] || row.fallback : "",
  }));
