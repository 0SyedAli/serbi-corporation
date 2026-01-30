"use client";

import React, { useMemo, useState } from "react";
import { FiSearch, FiEye } from "react-icons/fi";
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
    const [tab, setTab] = useState("new");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const data = [
        {
            id: "SR001",
            customer: "John Smith",
            pestType: "Termites",
            property: "Residential",
            severity: "High",
            area: "2000 sq ft",
            date: "2026-01-20",
            status: "new",
        },
        {
            id: "SR002",
            customer: "Sarah Johnson",
            pestType: "Rodents",
            property: "Commercial",
            severity: "Medium",
            area: "5000 sq ft",
            date: "2026-01-20",
            status: "new",
        },
        {
            id: "SR003",
            customer: "Michael Brown",
            pestType: "Bed Bugs",
            property: "Residential",
            severity: "High",
            area: "1200 sq ft",
            date: "2026-01-19",
            status: "new",
        },

        // (sample extra rows for other tabs - you can remove if you want)
        {
            id: "SR004",
            customer: "Emily Davis",
            pestType: "Ants",
            property: "Residential",
            severity: "Medium",
            area: "1800 sq ft",
            date: "2026-01-18",
            status: "assigned",
        },
        {
            id: "SR005",
            customer: "David Wilson",
            pestType: "Rodents",
            property: "Commercial",
            severity: "High",
            area: "3500 sq ft",
            date: "2026-01-17",
            status: "assigned",
        },
        {
            id: "SR006",
            customer: "Alex Turner",
            pestType: "Termites",
            property: "Residential",
            severity: "Medium",
            area: "2400 sq ft",
            date: "2026-01-16",
            status: "completed",
        },
        {
            id: "SR007",
            customer: "Maria Garcia",
            pestType: "Ants",
            property: "Residential",
            severity: "High",
            area: "1500 sq ft",
            date: "2026-01-15",
            status: "completed",
        },
        {
            id: "SR008",
            customer: "James Lee",
            pestType: "Bed Bugs",
            property: "Residential",
            severity: "High",
            area: "1100 sq ft",
            date: "2026-01-14",
            status: "cancelled",
        },
    ];

    const counts = useMemo(() => {
        const c = { new: 0, assigned: 0, completed: 0, cancelled: 0 };
        data.forEach((r) => c[r.status]++);
        return c;
    }, [data]);

    const rows = useMemo(() => {
        const q = search.trim().toLowerCase();
        return data
            .filter((r) => r.status === tab)
            .filter((r) => {
                if (!q) return true;
                return (
                    r.id.toLowerCase().includes(q) ||
                    r.customer.toLowerCase().includes(q) ||
                    r.pestType.toLowerCase().includes(q) ||
                    r.property.toLowerCase().includes(q) ||
                    r.severity.toLowerCase().includes(q) ||
                    r.area.toLowerCase().includes(q) ||
                    r.date.toLowerCase().includes(q)
                );
            });
    }, [data, tab, search]);

    return (
        <div className="serbi-um-page">
            <div className="serbi-um-title mb-3">Service Requests</div>

            {/* Top stat cards (reuse dashboard card UI) */}
            <div className="row g-4">
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="New Requests" value={counts.new} icon={<LuClock3 />} iconClassName="text-secondary" />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Assigned" value={counts.assigned} icon={<FiClipboard />} iconClassName="text-secondary" />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Completed" value={counts.completed} icon={<IoCheckmarkCircleOutline />} iconClassName="text-success" />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Cancelled" value={counts.cancelled} icon={<IoCloseCircleOutline />} iconClassName="text-danger" />
                </div>
            </div>

            {/* Tabs (reuse previous tabs CSS) */}
            <div className="mt-3">
                <div className="serbi-um-tabs" style={{ width: "820px" }}>
                    <button type="button" className={`serbi-um-tab ${tab === "new" ? "active" : ""}`} onClick={() => setTab("new")}>
                        New Requests
                    </button>
                    <button type="button" className={`serbi-um-tab ${tab === "assigned" ? "active" : ""}`} onClick={() => setTab("assigned")}>
                        Assigned Jobs
                    </button>
                    <button type="button" className={`serbi-um-tab ${tab === "completed" ? "active" : ""}`} onClick={() => setTab("completed")}>
                        Completed
                    </button>
                    <button type="button" className={`serbi-um-tab ${tab === "cancelled" ? "active" : ""}`} onClick={() => setTab("cancelled")}>
                        Cancelled
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
                                <th style={{ width: "12%" }}>Request ID</th>
                                <th style={{ width: "16%" }}>Customer</th>
                                <th style={{ width: "12%" }}>Pest Type</th>
                                <th style={{ width: "14%" }}>Property</th>
                                <th style={{ width: "12%" }}>Severity</th>
                                <th style={{ width: "12%" }}>Area</th>
                                <th style={{ width: "12%" }}>Date</th>
                                <th style={{ width: "10%" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((r) => (
                                <tr key={r.id}>
                                    <td className="serbi-um-name">{r.id}</td>
                                    <td>{r.customer}</td>
                                    <td>{r.pestType}</td>
                                    <td>{r.property}</td>
                                    <td>
                                        {/* no new css: use existing status pill + bootstrap bg */}
                                        <span
                                            className={`serbi-um-status ${r.severity === "High" ? "bg-danger text-white border-0" : "bg-dark text-white border-0"}`}
                                        >
                                            {r.severity}
                                        </span>
                                    </td>
                                    <td>{r.area}</td>
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
                                    Service Request Details - <br /> SR001
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
                                    <div className="serbi-field-label">Request ID</div>
                                    <div className="serbi-field-value">SR001</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Pest Type</div>
                                    <div className="serbi-field-value">Termites</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Property Type</div>
                                    <div className="serbi-field-value">Residential</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Severity</div>
                                    <div className="serbi-pill-red">High</div>
                                </div>

                                <div className="serbi-field">
                                    <div className="serbi-field-label">Area</div>
                                    <div className="serbi-field-value">2000 sq ft</div>
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
                                        Assign Technician
                                    </button>

                                    <button className="serbi-btn-outline" type="button">
                                        Update Status
                                    </button>

                                    <button className="serbi-btn-outline" type="button">
                                        Print
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
