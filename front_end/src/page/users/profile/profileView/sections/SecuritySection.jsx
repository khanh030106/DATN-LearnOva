import { useMemo, useState } from "react";
import {
  getSecurityContactRows,
  PASSWORD_FIELDS,
  SECURITY_CARD_TITLES,
  SECURITY_OVERVIEW,
} from "../data/securityData";
import SecurityContactCard from "./security/SecurityContactCard";
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
      setStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    if (passwordValues.newPassword.length < 8) {
      setStatus({
        type: "error",
        message: "The new password must be at least 8 characters long.",
      });
      return;
    }

    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      setStatus({
        type: "error",
        message: "The new password and confirmation password do not match.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Password updated successfully.",
    });

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

    </div>
  );
};

export default SecuritySection;
