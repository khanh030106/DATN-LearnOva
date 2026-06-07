import { useMemo, useState } from "react";
import {
  getSecurityContactRows,
  PASSWORD_FIELDS,
  SECURITY_ACTIONS,
  SECURITY_CARD_TITLES,
  SECURITY_OVERVIEW,
} from "../data/securityData";
import SecurityContactCard from "./security/SecurityContactCard";
import SecurityOptionsCard from "./security/SecurityOptionsCard";
import SecurityOverviewCard from "./security/SecurityOverviewCard";
import SecurityPasswordCard from "./security/SecurityPasswordCard";

const initialPasswordValues = PASSWORD_FIELDS.reduce(
  (fields, field) => ({ ...fields, [field.id]: "" }),
  {},
);

const SecuritySection = ({ profileData = {} }) => {
  const [passwordValues, setPasswordValues] = useState(initialPasswordValues);
  const [status, setStatus] = useState(null);

  const contactRows = useMemo(
    () => getSecurityContactRows(profileData),
    [profileData],
  );

  const handlePasswordChange = (fieldId, value) => {
    setPasswordValues((current) => ({ ...current, [fieldId]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasEmptyField = PASSWORD_FIELDS.some(
      (field) => !passwordValues[field.id],
    );

    if (hasEmptyField) {
      setStatus({ type: "error", message: "Vui lòng nhập đầy đủ thông tin." });
      return;
    }

    if (passwordValues.newPassword.length < 8) {
      setStatus({
        type: "error",
        message: "Mật khẩu mới phải có ít nhất 8 ký tự.",
      });
      return;
    }

    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      setStatus({
        type: "error",
        message: "Mật khẩu mới và xác nhận mật khẩu không trùng khớp.",
      });
      return;
    }

    setStatus({ type: "success", message: "Cập nhật mật khẩu thành công." });
    setPasswordValues(initialPasswordValues);
  };

  return (
    <div className="security-page">
      <SecurityOverviewCard overview={SECURITY_OVERVIEW} />

      <div className="security-main-grid">
        <SecurityPasswordCard
          card={SECURITY_CARD_TITLES.password}
          fields={PASSWORD_FIELDS}
          values={passwordValues}
          status={status}
          onChange={handlePasswordChange}
          onSubmit={handleSubmit}
        />

        <SecurityContactCard
          card={SECURITY_CARD_TITLES.contact}
          rows={contactRows}
        />
      </div>

      <SecurityOptionsCard
        card={SECURITY_CARD_TITLES.options}
        actions={SECURITY_ACTIONS}
      />
    </div>
  );
};

export default SecuritySection;
