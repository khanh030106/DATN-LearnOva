import HeaderDropdown from "./HeaderDropdown.jsx";

const SubscribeDropdown = ({ plans }) => {
  return (
    <HeaderDropdown className="user-logged-subscribe-dropdown">
      <ul className="user-logged-plan-list">
        {plans.map((plan) => (
          <li key={plan.id}>
            <button type="button" className="user-logged-plan-card">
              <span>{plan.name}</span>
              <strong>${plan.price}</strong>
              <small>/{plan.period}</small>
            </button>
          </li>
        ))}
      </ul>
    </HeaderDropdown>
  );
};

export default SubscribeDropdown;
