"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiEye } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { FiClipboard } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import {
    PARENT_TABS,
    STATUS_TABS,
} from "@/redux/features/requests/statusMap";
import {
    fetchRequests,
} from "@/redux/features/requests/requestsSlice";
import { showErrorToast } from "@/lib/toast";

function StatCardMini({ title, value, icon, iconClassName = "" }) {
    return (
        <div className="serbi-stat-card">
            <div className="serbi-stat-left">
                <div className="serbi-stat-title">{title}</div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="serbi-stat-value" style={{ fontSize: 30 }}> {value} </div>
                    <div className={`serbi-stat-icon ${iconClassName}`}>
                        {icon}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default function ServiceRequestsMain() {
    const dispatch = useDispatch();
    const {
        requestForms,
        discussionForms,
        loading,
        error,
    } = useSelector((state) => state.requests);

    const [parentTab, setParentTab] = useState(PARENT_TABS.REQUEST);
    const [statusTab, setStatusTab] = useState("Pending");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const [showModal, setShowModal] = useState(false);
    const [activeRow, setActiveRow] = useState(null);

    useEffect(() => {
        dispatch(fetchRequests());
    }, []);

    useEffect(() => {
        if (error) showErrorToast(error);
    }, [error]);

    // Switch dataset by parent tab
    const baseList =
        parentTab === PARENT_TABS.REQUEST
            ? requestForms
            : discussionForms;

    // Filter by status + search
    const filteredRows = useMemo(() => {
        const q = search.toLowerCase();
        return baseList
            .filter((r) => r.status === statusTab)
            .filter((r) =>
                !q
                    ? true
                    : `${r.customer} ${r.property} ${r.pestType}`
                        .toLowerCase()
                        .includes(q)
            );
    }, [baseList, statusTab, search]);

    // Pagination
    const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);
    const paginatedRows = filteredRows.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );
    const counts = useMemo(() => {
        const base =
            parentTab === PARENT_TABS.REQUEST
                ? requestForms
                : discussionForms;

        const normalize = (s = "") => s.toLowerCase();

        return {
            new: base.filter(r => normalize(r.status) === "pending").length,

            // assigned: base.filter(r => normalize(r.status) === "Confirm").length,

            arrived: base.filter(r => normalize(r.status) === "arrived").length,

            completed: base.filter(r => normalize(r.status) === "completed").length,
            cancelled: base.filter(r =>
                ["rejected", "canceled", "cancelled"].includes(normalize(r.status))
            ).length,
        };
    }, [parentTab, requestForms, discussionForms]);
    return (
        <div className="serbi-um-page">
            {/* <div className="serbi-um-title mb-3">Service Requests</div> */}

            <div className="row g-4 mb-4">
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini
                        title="New Requests"
                        value={counts.new}
                        icon={<LuClock3 />}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini
                        title="Arrived"
                        value={counts.arrived}
                        icon={<FiClipboard />}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini
                        title="Completed"
                        value={counts.completed}
                        icon={<IoCheckmarkCircleOutline />}
                    />
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini
                        title="Cancelled"
                        value={counts.cancelled}
                        icon={<IoCloseCircleOutline />}
                    />
                </div>
            </div>


            {/* Parent Tabs */}
            <div className="serbi-um-tabs mb-3">
                <button
                    className={`serbi-um-tab ${parentTab === PARENT_TABS.REQUEST ? "active" : ""}`}
                    onClick={() => {
                        setParentTab(PARENT_TABS.REQUEST);
                        setStatusTab("Pending");
                        setPage(1);
                    }}
                >
                    Request Forms
                </button>

                <button
                    className={`serbi-um-tab ${parentTab === PARENT_TABS.DISCUSSION ? "active" : ""}`}
                    onClick={() => {
                        setParentTab(PARENT_TABS.DISCUSSION);
                        setStatusTab("Stop");
                        setPage(1);
                    }}
                >
                    Discussion Forms
                </button>
            </div>

            {/* Status Tabs */}
            <div className="serbi-um-tabs mb-3">
                {STATUS_TABS[parentTab].map((s) => (
                    <button
                        key={s}
                        className={`serbi-um-tab ${statusTab === s ? "active" : ""}`}
                        onClick={() => {
                            setStatusTab(s);
                            setPage(1);
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>


            {/* Table */}
            <div className="serbi-um-card mt-3">
                {/* Search */}
                <div className="serbi-um-search">
                    <FiSearch className="serbi-um-search-icon" />
                    <input
                        className="form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
                <table className="serbi-um-table">
                    <thead>
                        <tr>
                            <th style={{ width: "12%" }}>Request ID</th>
                            <th style={{ width: "16%" }}>Customer</th>
                            <th style={{ width: "12%" }}>Pest Type</th>
                            <th style={{ width: "14%" }}>Property</th>
                            <th style={{ width: "12%" }}>Severity</th>
                            <th style={{ width: "12%" }}>Date</th>
                            {/* <th style={{ width: "10%" }}>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={6} style={{ padding: 20 }}>
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            paginatedRows.map((r) => (
                                <tr key={r.id}>
                                    <td>#{r.id.slice(0, 6)}</td>
                                    <td>{r.customer}</td>
                                    <td>{r.pestType}</td>
                                    <td>{r.property}</td>
                                    <td>{r.severity}</td>
                                    <td>{r.date}</td>
                                    {/* <td>
                                        <button
                                            className="serbi-um-action-btn"
                                            onClick={() => {
                                                setActiveRow(r);
                                                setShowModal(true);
                                            }}
                                        >
                                            <FiEye />
                                        </button>
                                    </td> */}
                                </tr>
                            ))}

                        {!loading && paginatedRows.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: 20 }}>No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center px-3 gap-2 mt-3">
                    <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Prev
                    </button>
                    <span>{page} / {totalPages || 1}</span>
                    <button className="btn btn-secondary" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                        Next
                    </button>
                </div>
            </div>


            {/* Modal */}
            {/* {showModal && activeRow && (
                <div className="modal-backdrop-lite" onClick={() => setShowModal(false)}>
                    <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="form-container">
                            <div className="serbi-modal-head">
                                <div className="serbi-modal-title">Details</div>
                                <button onClick={() => setShowModal(false)}>
                                    <IoCloseOutline />
                                </button>
                            </div>
                            <pre>{JSON.stringify(activeRow.raw, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}
