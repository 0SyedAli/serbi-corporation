export default function StatsCards() {
  const stats = [
    { label: "Total Classes", value: "147", change: "↑ 30%", type: "up" },
    { label: "Total Students", value: "3", change: "↑ 11%", type: "up" },
    { label: "Total Hours", value: "104,687", change: "↓ 10%", type: "down" },
  ]

  return (
    <div className="row g-3">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-4">
          <div className="stats-card">
            <div className="d-flex justify-content-between">
              <div className="stats-card-label">{stat.label}</div>
              <div className={`stats-card-change ${stat.type}`}>{stat.change}</div>
            </div>
            <div className="stats-card-value mb-0">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
