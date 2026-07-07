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
import { changePasswordApi } from "../../../../../api/UserApi.js";
import { toast } from "react-toastify";

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
    setPasswordValues((current) => ({
      ...current,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // validate frontend
    const hasEmpty = PASSWORD_FIELDS.some(
        (f) => !passwordValues[f.id]
    );

    if (hasEmpty) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    if (passwordValues.newPassword.length < 8) {
      setStatus({
        type: "error",
        message: "Password must be at least 8 characters.",
      });
      return;
    }

    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      setStatus({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      await changePasswordApi(passwordValues);

      setStatus({
        type: "success",
        message: "Password changed successfully.",
      });

      toast.success("Password changed successfully");

      setPasswordValues(initialPasswordValues);
    } catch (err) {
      const msg =
          err?.response?.data?.message || "Change password failed";

      setStatus({
        type: "error",
        message: msg,
      });

      toast.error(msg);
    }
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