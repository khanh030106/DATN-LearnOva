import { ChevronRight, Mail } from "lucide-react";

const SecurityContactCard = ({ card, rows }) => (
  <section className="security-card security-contact-card">
    <div className="security-card-heading">
      <span>
        <Mail size={22} />
      </span>
      <div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </div>

    <div className="security-contact-list">
      {rows.map((row) => (
        <button type="button" key={row.id}>
          <div>
            <strong>{row.label}</strong>
            {row.value && <p>{row.value}</p>}
          </div>

          <ChevronRight size={18} />
        </button>
      ))}
    </div>
  </section>
);

export default SecurityContactCard;
