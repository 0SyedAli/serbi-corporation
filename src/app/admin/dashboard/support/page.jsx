"use client";

import React, { useMemo, useState } from "react";
import { FiSearch, FiEye, FiPlus } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { FiClipboard } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoCloseOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

function StatCardMini({
    title,
    value,
    icon,
    iconClassName = "",
}) {
    return (
        <div className="serbi-stat-card" >
            <div className="serbi-stat-left">
                <div className="serbi-stat-title">{title}</div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="serbi-stat-value" style={{ fontSize: 30 }}>
                        {value}
                    </div>
                    <div className={`serbi-stat-icon ${iconClassName}`}>{icon}</div>
                </div>
            </div>

            {/* Bootstrap text-* overrides your default icon color */}
        </div>
    );
}

export default function ServiceRequestsMain() {
    const [tab, setTab] = useState("open");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [addticketModal, showAddticketModal] = useState(false);
    const data = [
        {
            id: "SUP001",
            customer: "John Smith",
            subject: "Service Delay Issue",
            category: "Complaint",
            priority: "High",
            date: "2026-01-20",
            status: "open",
        },
        {
            id: "SUP002",
            customer: "Sarah Johnson",
            subject: "Billing Question",
            category: "Support",
            priority: "Medium",
            date: "2026-01-20",
            status: "open",
        },
        {
            id: "SUP003",
            customer: "Michael Brown",
            subject: "Technician Request",
            category: "Support",
            priority: "Low",
            date: "2026-01-19",
            status: "open",
        },
        {
            id: "SUP004",
            customer: "Emily Davis",
            subject: "Follow-up Required",
            category: "Support",
            priority: "Medium",
            date: "2026-01-18",
            status: "in_progress",
        },
        {
            id: "SUP005",
            customer: "David Wilson",
            subject: "Urgent Service Issue",
            category: "Complaint",
            priority: "High",
            date: "2026-01-17",
            status: "in_progress",
        },
        {
            id: "SUP006",
            customer: "Alex Turner",
            subject: "Issue Resolved",
            category: "Support",
            priority: "Low",
            date: "2026-01-16",
            status: "resolved",
        },
    ];
    const counts = useMemo(() => { const c = { open: 0, in_progress: 0, resolved: 0 }; data.forEach((r) => c[r.status]++); return c; }, [data]);
    const rows = useMemo(() => {
        const q = search.trim().toLowerCase();

        return data
            .filter((r) => r.status === tab)
            .filter((r) => {
                if (!q) return true;
                return (
                    r.id.toLowerCase().includes(q) ||
                    r.customer.toLowerCase().includes(q) ||
                    r.subject.toLowerCase().includes(q) ||
                    r.category.toLowerCase().includes(q) ||
                    r.priority.toLowerCase().includes(q) ||
                    r.date.toLowerCase().includes(q)
                );
            });
    }, [data, tab, search]);




    return (
        <div className="serbi-um-page">
            <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                <div className="serbi-um-title">Support / Complaints</div>

                <button type="button" className="serbi-um-add-btn" onClick={() => showAddticketModal(true)} >
                    <FiPlus size={18} />
                    New Ticket
                </button>
            </div>
            {/* Top stat cards (reuse dashboard card UI) */}
            <div className="row g-4">
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Total Tickets" value={data.length} icon={<FiClipboard />} />

                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Open" value={counts.open} icon={<IoCloseCircleOutline />} />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="In Progress" value={counts.in_progress} icon={<LuClock3 />} />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Resolved" value={counts.resolved} icon={<IoCheckmarkCircleOutline />} />
                </div>
            </div>

            {/* Tabs (reuse previous tabs CSS) */}
            <div className="mt-3">
                <div className="serbi-um-tabs" style={{ width: "820px" }}>
                    <button onClick={() => setTab("open")} className={`serbi-um-tab ${tab === "open" ? "active" : ""}`}>
                        Open Tickets
                    </button>
                    <button onClick={() => setTab("in_progress")} className={`serbi-um-tab ${tab === "in_progress" ? "active" : ""}`}>
                        In Progress
                    </button>
                    <button onClick={() => setTab("resolved")} className={`serbi-um-tab ${tab === "resolved" ? "active" : ""}`}>
                        Resolved
                    </button>
                </div>
            </div>

            {/* Table Card (reuse previous card/table/search classes) */}
            <div className="serbi-um-card mt-3">
                <div className="serbi-um-search">
                    <FiSearch className="serbi-um-search-icon" />
                    <input
                        className="form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search requests..."
                    />
                </div>

                <div className="serbi-um-table-wrap">
                    <table className="serbi-um-table" >
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Customer</th>
                                <th>Subject</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((r) => (
                                <tr key={r.id}>
                                    <td className="serbi-um-name">{r.id}</td>
                                    <td>{r.customer}</td>
                                    <td>{r.subject}</td>

                                    <td>
                                        <span className={`serbi-um-status ${r.category === "Complaint" ? "bg-danger text-white" : "bg-dark text-white"}`}>
                                            {r.category}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`serbi-um-status ${r.priority === "High" ? "bg-danger text-white" : "bg-dark text-white"}`}>
                                            {r.priority}
                                        </span>
                                    </td>
                                    <td>{r.date}</td>
                                    <td>
                                        <button type="button" onClick={() => setShowModal(true)} className="serbi-um-action-btn serbi-um-action-edit" title="View">
                                            <FiEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={8} style={{ padding: "22px 12px", color: "#7a7f8a", fontWeight: 700 }}>
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <div className="modal-backdrop-lite" onClick={() => setShowModal(false)}>
                    <div
                        className="modal-sheet"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="form-container">
                            {/* Header */}
                            <div className="serbi-modal-head">
                                <div className="serbi-modal-title">
                                    Ticket Details - <br /> SUP001

                                </div>

                                <button className="serbi-modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <IoCloseOutline />
                                </button>
                            </div>

                            {/* Content Grid */}
                            <div className="serbi-modal-grid">
                                <div className="serbi-field">
                                    <div className="serbi-field-label">Customer</div>
                                    <div className="serbi-field-value">John Smith</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Ticket ID</div>
                                    <div className="serbi-field-value">SUP001</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Subject</div>
                                    <div className="serbi-field-value">Service Delay Issue</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Category</div>
                                    <div className="serbi-pill-red">Complaint</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Priority</div>
                                    <div className="serbi-pill-red">High</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Date</div>
                                    <div className="serbi-field-value">2026-01-20</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Status</div>
                                    <div className="serbi-field-value">New</div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="serbi-modal-divider">
                                <div className="serbi-modal-actions">
                                    <button className="serbi-btn-dark" type="button">
                                        Update Status
                                    </button>

                                    <button className="serbi-btn-outline" type="button">
                                        Add Note
                                    </button>

                                    <button className="serbi-btn-outline" type="button">
                                        Contact Customer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {addticketModal && (
                <div className="modal-backdrop-lite" >
                    <div className="modal-sheet" >
                        <div className="form-container">
                            {/* header */}
                            <div className="serbi-modal-head">
                                <div className="serbi-modal-title">Create New Ticket</div>

                                <button className="serbi-modal-close" onClick={() => showAddticketModal(false)} aria-label="Close">
                                    <IoCloseOutline />
                                </button>
                            </div>

                            {/* form */}
                            <div className="serbi-form-grid">
                                <div className="serbi-form-group">
                                    <label>Customer</label>
                                    <select className="serbi-select" >
                                        <option value="">Select customer</option>
                                        <option value="Insects">alen</option>
                                        <option value="Mammals">john</option>
                                        <option value="Wood Destroying">kyra</option>
                                    </select>
                                </div>
                                <div className="serbi-form-group">
                                    <label>Subject</label>
                                    <input
                                        className="serbi-input"
                                        placeholder="Brief description of the issue"
                                    />
                                </div>
                                <div className="serbi-form-group">
                                    <label>Category</label>
                                    <select className="serbi-select" >
                                        <option value="">Select category</option>
                                        <option value="Insects">abc</option>
                                        <option value="Mammals">abc</option>
                                        <option value="Wood Destroying">abc</option>
                                    </select>
                                </div>
                                <div className="serbi-form-group">
                                    <label>Priority</label>
                                    <select
                                        className="serbi-select"
                                    >
                                        <option value="">Select priority</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                <div className="serbi-form-group serbi-form-span-2">
                                    <label>Description</label>
                                    <textarea
                                        className="serbi-textarea"
                                        placeholder="Detailed description of the issue..."
                                    />
                                </div>
                            </div>

                            {/* footer */}
                            <div className="serbi-modal-divider">
                                <div className="serbi-modal-footer-right">
                                    <button type="button" className="serbi-btn-outline" onClick={() => showAddticketModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="serbi-btn-dark" >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}