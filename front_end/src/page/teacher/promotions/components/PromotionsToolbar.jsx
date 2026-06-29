import { Search } from "lucide-react";

const PromotionsToolbar = ({ query, onQueryChange }) => (
  <div className="teacher-promotions-toolbar teacher-promotions-toolbar--search-only" aria-label="Promotion filters">
    <label className="teacher-promotions-search">
      <Search size={16} />
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search courses..."
      />
    </label>
  </div>
);

export default PromotionsToolbar;
