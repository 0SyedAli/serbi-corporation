"use client"

import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

export function CalendarHeader({ viewType, onViewChange, onToday, onPrev, onNext, currentDate }) {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const viewOptions = [
    { id: "dayGridMonth", label: "Month" },
    // { id: "timeGridWeek", label: "Week" },
    // { id: "timeGridDay", label: "Day" },
  ]

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="btn-group" role="group">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`btn btn-sm ${viewType === option.id ? "btn-primary3" : "btn-outline-secondary"}`}
            onClick={() => onViewChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <h4 className="mb-0 fw-bold">{monthYear}</h4>

      <div className="d-flex gap-2">
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onToday}>
          Today
        </button>
        <button type="button" className="btn btn-primary3 text-white btn-sm" onClick={onPrev}>
          <BiChevronLeft size={18} />
        </button>
        <button type="button" className="btn btn-primary3 text-white btn-sm" onClick={onNext}>
          <BiChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
