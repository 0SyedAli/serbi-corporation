export default function IncidentReports() {
  const incidents = [
    {
      date: "2016-01-001",
      student: "Sarah Miller",
      type: "Description",
      severity: "High",
      status: "Open",
    },
    {
      date: "2016-01-001",
      student: "John Miller",
      type: "Late",
      severity: "Low",
      status: "Closed",
    },
  ]

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h6 className="section-card-title">Incident Reports</h6>
      </div>
      <table className="incident-table">
        <thead>
          <tr>
            <th style={{ width: "30px" }}>
              <input type="checkbox" />
            </th>
            <th>Date</th>
            <th>Student</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{incident.date}</td>
              <td>{incident.student}</td>
              <td>{incident.type}</td>
              <td>
                <span className={incident.severity === "High" ? "severity-high" : "severity-low"}>
                  {incident.severity}
                </span>
              </td>
              <td>{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
