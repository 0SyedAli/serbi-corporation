import Image from "next/image";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

export default function PerformanceMetrics() {
  const [selected, setSelected] = useState("Students");

  return (
    <div className="performance-card">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 fw-bold">Performance Metrics</h5>

        <div className="dropdown-box">
          {selected}
          <AiOutlineDown size={14} className="ms-2" />
        </div>
      </div>

      {/* Progress Bars */}
      <div className="progress-wrapper">

        <div className="metric-row">
          <label>Attendance: 95%</label>
          <div className="metric-bar bg-blue"></div>
        </div>

        <div className="metric-row">
          <label>Behavior Score: 87%</label>
          <div className="metric-bar bg-yellow"></div>
        </div>

        <div className="metric-row">
          <label>Academic Progress: Good</label>
          <div className="metric-bar bg-purple"></div>
        </div>

      </div>

      {/* Bar Chart */}
      <div className="chart-box mt-4">
        <Image src="/images/chart-rec.png" width={400} height={500} className="chart-img" alt="" />
        {/* Replace with real chart later if needed */}
      </div>
    </div>
  );
}
