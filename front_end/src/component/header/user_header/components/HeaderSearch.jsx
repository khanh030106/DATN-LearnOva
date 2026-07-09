import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

const HeaderSearch = ({  }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedTerm(searchTerm.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);


  return (
    <form className="user-logged-search" role="search">
      <Search size={18} className="user-logged-search-icon" />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
        placeholder="Search Course, Instructor, Category"
        className="user-logged-search-input"
        aria-label="Search Course, Instructor, Category"
      />

      {isFocused && filteredSuggestions.length > 0 && (
        <div className="user-logged-search-suggestions">
          {filteredSuggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="user-logged-search-suggestion"
              onMouseDown={() => setSearchTerm(item.label)}
            >
              <Search size={15} />
              <span>{item.label}</span>
              <small>{item.type}</small>
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default HeaderSearch;
