import HeaderDropdown from "./HeaderDropdown.jsx";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onCategoryClick = (cat) => {
    // navigate to courses page and include category name as query param
    navigate(`/learnova/courses?category=${encodeURIComponent(cat)}`);
  };

  return (
    <HeaderDropdown className="user-logged-mega-menu">
      <div className="user-logged-mega-grid">
        <section className="user-logged-mega-column">
          <h3>Category</h3>
          <ul>
            {categories.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="user-logged-filter-button"
                  onClick={() => onCategoryClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <FilterColumn title="Level Filter" items={levels} />
        <FilterColumn title="Price Filter" items={prices} />
        <FilterColumn title="Duration Filter" items={durations} />
        <FilterColumn title="Rating Filter" items={ratings} />
      </div>
    </HeaderDropdown>
  );
};

export default CoursesMegaMenu;
