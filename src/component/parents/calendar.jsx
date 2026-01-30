"use client"

import { useState } from "react"

export default function Calendar() {
  const [currentDate] = useState(new Date(2030, 2, 1))

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const events = [
    { date: 5, title: "History 1J AF World History", para: "Review Recent Test Results",time: "8:00 AM - 9:00 AM" },
    { date: 13, title: "History 12", para: "Lecture on Cold War",time: "10:00 AM - 11:30 AM" },
    { date: 21, title: "History 12A", para: "Prepare for Tomorrow's Debate",time: "4:20 PM - 5:20 PM" },
  ]

  return (
    <div className="section-card">
      <div className="section-card-header">
        <h6 className="section-card-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h6>
      </div>
      <div className="calendar-grid">
        {dayNames.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div key={index} className={`calendar-day ${day === 15 ? "today" : ""} ${day === null ? "other-month" : ""}`}>
            {day}
          </div>
        ))}
      </div>

      <div style={{ paddingTop: "15px", borderTop: "1px solid #f0f0f0" }}>
        <h6 className="section-card-title" style={{ fontSize: "14px", marginBottom: "15px" }}>
          Agenda
        </h6>
        {events.map((event, index) => (
          <div key={index} className="agenda-item">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
              <div className="agenda-time fw-bold">{event.title}</div>
              <div className="agenda-time">{event.time}</div>
            </div>
            <div className="agenda-title">{event.para}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
