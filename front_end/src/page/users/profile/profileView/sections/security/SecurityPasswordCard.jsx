import { Eye, Lock } from "lucide-react";

const SecurityPasswordCard = ({
  card,
  fields,
  values,
  status,
  onChange,
  onSubmit,
}) => (
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
      {fields.map((field) => (
        <label key={field.id}>
          <span>{field.label}</span>
          <div className="security-input-wrap">
            <input
              type="password"
              value={values[field.id] || ""}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.placeholder}
            />
            <button type="button" aria-label={`Hiển thị ${field.label}`}>
              <Eye size={16} />
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
      ))}

      {status && <p className={`security-form-status ${status.type}`}>{status.message}</p>}

      <button className="security-primary-button" type="submit">
        {card.submitLabel}
      </button>
    </form>
  </section>
);

export default SecurityPasswordCard;
