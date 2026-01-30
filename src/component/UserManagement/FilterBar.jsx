import { FiSearch } from "react-icons/fi";

export default function FilterBar({ searchTerm, setSearchTerm, activeTab, onAdd }) {
  return (
    <div className="filter-bar">
      <div className="search-input">
        <FiSearch />
        <input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button className="btn primary" onClick={onAdd} type="button">
        + Add {activeTab}
      </button>
    </div>
  );
}
