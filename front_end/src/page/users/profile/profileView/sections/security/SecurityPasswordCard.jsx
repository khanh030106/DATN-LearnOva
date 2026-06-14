import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const SecurityPasswordCard = ({
  card,
  fields,
  values,
  status,
  onChange,
  onSubmit,
}) => {
  const [visibleFields, setVisibleFields] = useState({});

  const togglePasswordVisibility = (fieldId) => {
    setVisibleFields((current) => ({
      ...current,
      [fieldId]: !current[fieldId],
    }));
  };

  return (
    <section className="security-card security-password-card">
      <div className="security-card-heading">
        <span>
          <Lock size={22} />
        </span>
        <div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="security-password-form">
        {fields.map((field) => {
          const isVisible = Boolean(visibleFields[field.id]);

          return (
            <label key={field.id}>
              <span>{field.label}</span>
              <div className="security-input-wrap">
                <input
                  type={isVisible ? "text" : "password"}
                  value={values[field.id] || ""}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  placeholder={field.placeholder}
                />
                <button
                  type="button"
                  aria-label={`${isVisible ? "Hide" : "Show"} ${field.label}`}
                  onClick={() => togglePasswordVisibility(field.id)}
                >
                  {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {field.strength && (
                <div className="security-password-strength">
                  <span />
                  <strong>{field.strength}</strong>
                </div>
              )}

              {field.hint && <small>{field.hint}</small>}
            </label>
          );
        })}

        {status && (
          <p className={`security-form-status ${status.type}`}>
            {status.message}
          </p>
        )}

        <button className="security-primary-button" type="submit">
          {card.submitLabel}
        </button>
      </form>
    </section>
  );
};

export default SecurityPasswordCard;
