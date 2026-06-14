import { Bell, Database, LockKeyhole, Save, ShieldCheck, SlidersHorizontal } from "lucide-react";
import "./Settings.css";

const settingGroups = [
  {
    title: "Platform Preferences",
    description: "Control platform identity, admin language, and operational defaults.",
    icon: SlidersHorizontal,
    items: [
      { label: "Platform name", value: "LearnOva" },
      { label: "Admin language", value: "Vietnamese / English" },
      { label: "Default revenue share", value: "70% instructor / 30% platform" },
      { label: "Course lock threshold", value: "3 reports" },
    ],
  },
  {
    title: "Security Policy",
    description: "Define administrator login protection and session behavior.",
    icon: ShieldCheck,
    items: [
      { label: "Two-factor authentication", value: "Required for admins" },
      { label: "Session timeout", value: "30 minutes" },
      { label: "Password rotation", value: "Every 90 days" },
    ],
  },
  {
    title: "Notification Rules",
    description: "Choose which system events should alert administrators.",
    icon: Bell,
    items: [
      { label: "New instructor application", value: "Enabled" },
      { label: "Payment reconciliation issue", value: "Enabled" },
      { label: "Course report threshold", value: "3 reports" },
    ],
  },
  {
    title: "Data & Backup",
    description: "Review retention policy and export scheduling for admin data.",
    icon: Database,
    items: [
      { label: "Backup schedule", value: "Daily at 02:00" },
      { label: "Audit retention", value: "180 days" },
      { label: "Export format", value: "CSV / XLSX" },
    ],
  },
];

const accessRules = [
  "Admins can approve instructors and update platform reports.",
  "Finance users can view revenue, orders, payments, and voucher records.",
  "Support users can view contact requests and notification history.",
];

const Settings = () => {
  return (
    <section className="adminSettingsPage" aria-label="System settings">
      <div className="adminSettingsContent">
        <div className="adminSettingsHeader">
          <div>
            <h1>System Settings</h1>
            <p>Configure admin platform behavior, access policies, and operational defaults.</p>
          </div>
          <button type="button" className="adminSettingsSaveButton">
            <Save size={18} />
            Save Changes
          </button>
        </div>

        <div className="adminSettingsGrid">
          {settingGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article className="adminSettingsCard" key={group.title}>
                <div className="adminSettingsCardHeader">
                  <span>
                    <Icon size={22} />
                  </span>
                  <div>
                    <h2>{group.title}</h2>
                    <p>{group.description}</p>
                  </div>
                </div>

                <div className="adminSettingsRows">
                  {group.items.map((item) => (
                    <label className="adminSettingsRow" key={item.label}>
                      <span>{item.label}</span>
                      <input type="text" defaultValue={item.value} />
                    </label>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="adminSettingsAccessCard">
          <div className="adminSettingsAccessHeader">
            <span>
              <LockKeyhole size={22} />
            </span>
            <div>
              <h2>Role Access Notes</h2>
              <p>Current admin access expectations before building a full Role page.</p>
            </div>
          </div>

          <ul>
            {accessRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Settings;
