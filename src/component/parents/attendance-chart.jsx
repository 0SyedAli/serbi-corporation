"use client"

import { useEffect, useRef } from "react"

export default function AttendanceChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 60

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const data = [40, 40, 20]
    const colors = ["#2196f3", "#f44336", "#bdbdbd"]
    let currentAngle = -Math.PI / 2

    data.forEach((value, index) => {
      const sliceAngle = (value / 100) * 2 * Math.PI

      ctx.fillStyle = colors[index]
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.lineTo(centerX, centerY)
      ctx.fill()

      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.lineTo(centerX, centerY)
      ctx.stroke()

      currentAngle += sliceAngle
    })

    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI)
    ctx.fill()
  }, [])

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h6 className="section-card-title">Daily Attendance Summary</h6>
      </div>
      <small style={{ color: "#999" }}><strong style={{ color: "#000" }}>Today's Date:</strong> 03/15/2025</small>
      <div className="chart-container">
        <div className="cc_canva">
          <canvas ref={canvasRef} width={160} height={160} />
        </div>
        <div className="chart-stats">
          <div className="chart-stat-item">
            <span className="chart-stat-dot dot-blue"></span>
            <div className="chart-stat-label">Present</div>
            <div className="chart-stat-value">40.00</div>
          </div>
          <div className="chart-stat-item">
            <span className="chart-stat-dot dot-red"></span>
            <div className="chart-stat-label">Absent</div>
            <div className="chart-stat-value">40.00</div>
          </div>
          <div className="chart-stat-item">
            <span className="chart-stat-dot dot-gray"></span>
            <div className="chart-stat-label">Late</div>
            <div className="chart-stat-value">20.00</div>
          </div>
        </div>
      </div>
    </div>
  )
}
