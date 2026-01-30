import { AiOutlineSearch } from "react-icons/ai"
import { FiFilter, FiPlus } from "react-icons/fi"
import { IoBulbOutline } from "react-icons/io5"

export default function IncidentReports({title, add_inci_class}) {
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
        <h6 className="section-card-title">{title}</h6>
        <div className={`table-actions ${add_inci_class} d-flex align-items-center gap-3`}>
          <div className="search-small">
            <AiOutlineSearch size={18} className="search-icon" />
            <input type="text" placeholder="Search by Name or ID" />
          </div>
          <span className="icon-btn"><FiFilter size={18} /></span>
          <span className="icon-btn"><IoBulbOutline size={18} /></span>
          <button className="add-child-btn">
            <FiPlus size={20} /> Add Child
          </button>
        </div>
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
