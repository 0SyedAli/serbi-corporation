"use client";

import React, { useState } from "react";
import { FiUser, FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const TECHS = [
    {
        id: "t1",
        name: "Alex Turner",
        email: "alex@pestcontrol.com",
        phone: "555-0201",
        status: "Available",
        specialty: "Rodents",
        location: "North District",
        rating: 4.8,
        completedJobs: 127,
        activeJobs: 3,
        certifications: ["Licensed Pest Control", "Rodent Specialist", "Safety Certified"],
    },
    {
        id: "t2",
        name: "Maria Garcia",
        email: "maria@pestcontrol.com",
        phone: "555-0202",
        status: "On Job",
        specialty: "Insects",
        location: "South District",
        rating: 4.9,
        completedJobs: 156,
        activeJobs: 2,
        certifications: ["Licensed Pest Control", "Insect Specialist", "IPM Certified"],
    },
    {
        id: "t3",
        name: "James Lee",
        email: "james@pestcontrol.com",
        phone: "555-0203",
        status: "Available",
        specialty: "Termites",
        location: "East District",
        rating: 4.7,
        completedJobs: 98,
        activeJobs: 1,
        certifications: ["Licensed Pest Control", "Termite Inspector", "Wood Treatment"],
    },
    {
        id: "t4",
        name: "Lisa Chen",
        email: "lisa@pestcontrol.com",
        phone: "555-0204",
        status: "Available",
        specialty: "General",
        location: "West District",
        rating: 4.6,
        completedJobs: 84,
        activeJobs: 2,
        certifications: ["Licensed Pest Control", "General Pest Management"],
    },
];

function clamp(n, min = 0, max = 100) {
    return Math.max(min, Math.min(max, n));
}

export default function TechnicianManagementMain() {
    const [selectedReq, setSelectedReq] = useState("SR001");
    const [showAssignJobModal, setShowAssignJobModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    return (
        <div className="serbi-um-page">
            {/* reuse existing heading class */}
            <div className="serbi-title mb-3">Technician Management</div>
            <div className="row">
                <div className="col-xxl-10">
                    <div className="serbi-tech-grid">
                        {TECHS.map((t) => {
                            const pct = clamp((t.rating / 5) * 100);
                            return (
                                <div className="serbi-tech-card" key={t.id}>
                                    {/* Header */}
                                    <div className="serbi-tech-head">
                                        <div className="serbi-tech-person flex-column">
                                            <div className="d-flex align-items-center gap-2">
                                                <FiUser className="serbi-tech-icon m-0" />
                                                <div className="serbi-tech-name">{t.name}</div>
                                            </div>
                                            <div>
                                                <div className="serbi-tech-meta">
                                                    <div>{t.email}</div>
                                                    <div>{t.phone}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <span
                                            className={`serbi-tech-badge ${t.status === "Available" ? "available" : "onjob"
                                                }`}
                                        >
                                            {t.status}
                                        </span>
                                    </div>

                                    {/* Specialty + Location */}
                                    <div className="serbi-tech-info">
                                        <div>
                                            <div className="serbi-tech-label">Specialty</div>
                                            <div className="serbi-tech-value">{t.specialty}</div>
                                        </div>

                                        <div>
                                            <div className="serbi-tech-label">Location</div>
                                            <div className="serbi-tech-value serbi-tech-loc">
                                                <FiMapPin />
                                                {t.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="serbi-tech-rating-row">
                                        <div className="serbi-tech-label" style={{ margin: 0 }}>
                                            Rating
                                        </div>

                                        <div className="serbi-tech-rating-text">
                                            <FaStar className="serbi-tech-star" />
                                            {t.rating.toFixed(1)} / 5.0
                                        </div>
                                    </div>

                                    <div className="serbi-tech-progress" aria-label="rating progress">
                                        <span style={{ width: `${pct}%` }} />
                                    </div>

                                    {/* Stats */}
                                    <div className="serbi-tech-stats">
                                        <div className="serbi-tech-stat">
                                            <div className="k">Completed Jobs</div>
                                            <div className="v">{t.completedJobs}</div>
                                        </div>

                                        <div className="serbi-tech-stat">
                                            <div className="k">Active Jobs</div>
                                            <div className="v">{t.activeJobs}</div>
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    <div className="serbi-tech-certs">
                                        <div className="serbi-tech-certs-title">Certifications</div>
                                        <div className="serbi-tech-tags">
                                            {t.certifications.map((c) => (
                                                <span key={c} className="serbi-tech-tag">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="serbi-tech-actions">
                                        <button type="button" className="serbi-tech-btn-outline" onClick={() => setShowScheduleModal(true)}>
                                            View Schedule
                                        </button>
                                        <button type="button" className="serbi-tech-btn-dark" onClick={() => setShowAssignJobModal(true)}>
                                            Assign Job
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {showScheduleModal && (
                <div className="modal-backdrop-lite" onClick={() => setShowScheduleModal(false)}>
                    <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="form-container">
                            {/* Header */}
                            <div className="serbi-modal-head">
                                <div className="serbi-modal-title">
                                    Schedule for Alex <br /> Turner
                                </div>

                                <button
                                    className="serbi-modal-close"
                                    onClick={() => setShowScheduleModal(false)}
                                    aria-label="Close"
                                >
                                    <IoCloseOutline />
                                </button>
                            </div>

                            {/* List */}
                            <div className="serbi-modal-list">
                                <div className="serbi-modal-card">
                                    <div>
                                        <div className="serbi-modal-card-title">Service Request #SR004</div>
                                        <div className="serbi-modal-card-meta">
                                            <div>Today, 9:00 AM - 11:00 AM</div>
                                            <div>Emily Davis - Ant Treatment</div>
                                        </div>
                                    </div>
                                    <span className="serbi-pill-dark">In Progress</span>
                                </div>

                                <div className="serbi-modal-card">
                                    <div>
                                        <div className="serbi-modal-card-title">Service Request #SR012</div>
                                        <div className="serbi-modal-card-meta">
                                            <div>Today, 2:00 PM - 4:00 PM</div>
                                            <div>Mark Johnson - Rodent Inspection</div>
                                        </div>
                                    </div>
                                    <span className="serbi-pill-gray">Scheduled</span>
                                </div>

                                <div className="serbi-modal-card">
                                    <div>
                                        <div className="serbi-modal-card-title">Service Request #SR015</div>
                                        <div className="serbi-modal-card-meta">
                                            <div>Tomorrow, 10:00 AM - 12:00 PM</div>
                                            <div>Susan Lee - Termite Treatment</div>
                                        </div>
                                    </div>
                                    <span className="serbi-pill-gray">Scheduled</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="serbi-modal-divider">
                                <div className="serbi-modal-actions-2">
                                    <button type="button" className="serbi-btn-dark">
                                        Add to Schedule
                                    </button>
                                    <button type="button" className="serbi-btn-outline">
                                        Export Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAssignJobModal && (
                <div className="modal-backdrop-lite" onClick={() => setShowAssignJobModal(false)}>
                    <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="serbi-modal-head">
                            <div className="serbi-modal-title">
                                Assign Job to Alex <br /> Turner
                            </div>

                            <button
                                className="serbi-modal-close"
                                onClick={() => setShowAssignJobModal(false)}
                                aria-label="Close"
                            >
                                <IoCloseOutline />
                            </button>
                        </div>

                        <div className="serbi-modal-subtitle">
                            Select a service request to assign to this technician
                        </div>

                        {/* Select List */}
                        <div className="serbi-select-list">
                            <button
                                type="button"
                                className={`serbi-select-option ${selectedReq === "SR001" ? "active" : ""}`}
                                onClick={() => setSelectedReq("SR001")}
                            >
                                SR001 - John Smith (Termites)
                            </button>

                            <button
                                type="button"
                                className={`serbi-select-option ${selectedReq === "SR002" ? "active" : ""}`}
                                onClick={() => setSelectedReq("SR002")}
                            >
                                SR002 - Sarah Johnson (Rodents)
                            </button>

                            <button
                                type="button"
                                className={`serbi-select-option ${selectedReq === "SR003" ? "active" : ""}`}
                                onClick={() => setSelectedReq("SR003")}
                            >
                                SR003 - Michael Brown (Bed Bugs)
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="serbi-modal-divider tight">
                            <div className="serbi-modal-actions-assign">
                                <button
                                    type="button"
                                    className="serbi-btn-outline"
                                    onClick={() => setShowAssignJobModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="serbi-btn-dark"
                                    onClick={() => {
                                        // do api call here
                                        console.log("Assign:", selectedReq);
                                        setShowAssignJobModal(false);
                                    }}
                                >
                                    Confirm Assignment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}