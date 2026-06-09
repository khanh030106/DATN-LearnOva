import HeaderDropdown from "./HeaderDropdown.jsx";

const FilterColumn = ({ title, items }) => {
  return (
    <section className="user-logged-mega-column">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <button type="button" className="user-logged-filter-button">
              {item}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const CoursesMegaMenu = ({
  categories,
  levels,
  prices,
  durations,
  ratings,
}) => {
  return (
    <HeaderDropdown className="user-logged-mega-menu">
      <div className="user-logged-mega-grid">
        <FilterColumn title="Category" items={categories} />
        <FilterColumn title="Level Filter" items={levels} />
        <FilterColumn title="Price Filter" items={prices} />
        <FilterColumn title="Duration Filter" items={durations} />
        <FilterColumn title="Rating Filter" items={ratings} />
      </div>
    </HeaderDropdown>
  );
};

export default CoursesMegaMenu;
