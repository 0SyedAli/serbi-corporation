"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function ScheduleCalendar() {
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const events = [
    {
      title: "Teacher Professional Dev",
      date: "2030-05-01",
      colorClass: "event-purple",
    },
    {
      title: "Students Day",
      date: "2030-05-02",
      colorClass: "event-blue",
    },
    {
      title: "AP Calculus",
      date: "2030-05-02",
      colorClass: "event-yellow",
    },
    {
      title: "Spring Concert",
      date: "2030-05-03",
      colorClass: "event-green",
    },
    {
      title: "Science Fair Setup",
      date: "2030-05-08",
      colorClass: "event-blue",
    },
    {
      title: "Teacher Meeting",
      date: "2030-05-08",
      colorClass: "event-yellow",
    },
    {
      title: "PTA Meeting",
      date: "2030-05-09",
      colorClass: "event-yellow",
    },
    {
      title: "English Literature",
      date: "2030-05-13",
      colorClass: "event-pink",
    },
  ];

  const handleDateClick = (info) => {
    const dayEvents = events.filter((e) => e.date === info.dateStr);
    setSelectedDateEvents(dayEvents);
  };

  return (
    <div className="schedule-wrapper row">

      {/* Left Calendar */}
      <div className="col-lg-8">
        <div className="tab-row mb-3">
          <button className="tab-active">Month</button>
          <button>Week</button>
          <button>Day</button>
        </div>

        <div className="calendar-container p-3">
          <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
            <h5 className="m-0 fw-bold">May 2030</h5>

            <div className="d-flex align-items-center gap-2">
              <span className="today-btn">Today</span>
              <button className="nav-btn"><AiOutlineLeft /></button>
              <button className="nav-btn"><AiOutlineRight /></button>
            </div>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events.map((e) => ({
              title: e.title,
              date: e.date,
              className: e.colorClass,
            }))}
            dateClick={handleDateClick}
            height="auto"
            headerToolbar={false}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-lg-4 sidebar-right">

        {/* Agenda Section */}
        <div className="agenda-box mb-3">
          <h5 className="fw-bold">Agenda</h5>
          <div className="agenda-item event-blue">
            Big Day and Celebration Day
          </div>
          <div className="agenda-item event-pink">
            Subject Presentation & Exam
          </div>
          <div className="agenda-item event-purple">
            Fair, Exhibition & Performance
          </div>
          <div className="agenda-item event-yellow">
            Official Meeting
          </div>
        </div>

        {/* Selected Day Events */}
        <div className="agenda-box">
          <h5 className="fw-bold">May 8, 2030</h5>

          {selectedDateEvents.length === 0 && (
            <p className="text-muted small mt-2">No events selected.</p>
          )}

          {selectedDateEvents.map((e, i) => (
            <div key={i} className="day-event-item">
              <div className="icon-circle"></div>
              <div>
                <div className="fw-bold">{e.title}</div>
                <div className="small text-muted">Science Club</div>
              </div>
              <div className="ms-auto small text-muted">08:00 AM</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
