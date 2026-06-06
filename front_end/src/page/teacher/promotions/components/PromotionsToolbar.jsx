import { Search } from "lucide-react";
import { promotionStatusFilterOptions } from "../promotionPageConfig.js";

const PromotionsToolbar = ({ query, statusFilter, onQueryChange, onStatusFilterChange }) => (
  <div className="teacher-promotions-toolbar" aria-label="Promotion filters">
    <label className="teacher-promotions-search">
      <Search size={16} />
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search courses..."
      />
    </label>

    <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}>
      {promotionStatusFilterOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default PromotionsToolbar;
