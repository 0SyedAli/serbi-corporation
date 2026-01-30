export default function RoleTabs({ activeTab, setActiveTab }) {
  return (
    <div className="role-tabs mb-3">
      {["parent", "teacher", "student"].map((r) => (
        <button
          key={r}
          className={`tab-btn ${activeTab === r ? "active" : ""}`}
          onClick={() => setActiveTab(r)}
          type="button"
        >
          {r.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
