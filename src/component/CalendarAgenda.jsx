"use client"

import { FaUsers } from "react-icons/fa"
import { TbMapPin } from "react-icons/tb"

const getCategoryColor = (category) => {
  const colorMap = {
    event: "bg-info",
    meeting: "bg-warning",
    holiday: "bg-danger",
    academic: "bg-success",
    sports: "bg-primary",
    personal: "bg-secondary",
  }
  return colorMap[category || "event"] || "bg-light"
}

export function CalendarAgenda({ selectedDate, events }) {
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "No date selected"
  console.log(selectedDate);

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="card-title fw-bold mb-0">Agenda</h3>
          <button type="button" className="btn btn-outline-secondary btn-sm">
            ⋮
          </button>
        </div>

        <div className="mb-4">
          <h6 className="text-muted small">{formattedDate}</h6>
        </div>

        {events.length > 0 ? (
          <div className="d-flex flex-wrap flex-xxl-column gap-3">
            {events.map((event) => {
              const eventTime = new Date(event.start).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })

              return (
                <div
                  key={event.id}
                  className={`p-3 rounded ${getCategoryColor(event.category)} bg-opacity-10 border-start border-4`}
                  style={{
                    borderColor: getCategoryColor(event.category),
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start flex-column gap-2">
                    <h6 className="mb-0 fw-semibold">{event.title}</h6>
                    <small className="text-muted">{eventTime}</small>
                  </div>

                  {event.attendees && (
                    <div className="d-flex align-items-center gap-2 small text-muted mt-2">
                      <FaUsers size={14} />
                      <span>{event.attendees}</span>
                    </div>
                  )}

                  {event.location && (
                    <div className="d-flex align-items-center gap-2 small text-muted mt-1">
                      <TbMapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            <p className="mb-0">No events scheduled</p>
            <small>for this date</small>
          </div>
        )}
      </div>
    </div>
  )
}
