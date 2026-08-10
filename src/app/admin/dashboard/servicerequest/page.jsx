"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FiSearch, FiEye, FiMapPin, FiUser, FiDollarSign } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { FiClipboard } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { STATUS_TABS } from "@/redux/features/requests/statusMap";
import { fetchRequests } from "@/redux/features/requests/requestsSlice";
import { showErrorToast } from "@/lib/toast";

const API = process.env.NEXT_PUBLIC_API_URL;
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

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
        </div>
    );
}

export default function ServiceRequestsMain() {
    const dispatch = useDispatch();
    const {
        requestForms,
        loading,
        error,
    } = useSelector((state) => state.requests);

    const [statusTab, setStatusTab] = useState("Pending");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Detail Modal states
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        dispatch(fetchRequests("request"));
    }, [dispatch]);

    useEffect(() => {
        if (error) showErrorToast(error);
    }, [error]);

    // Filter by status + search
    const filteredRows = useMemo(() => {
        const q = search.toLowerCase().trim();
        return requestForms
            .filter((r) => (r.status || "").toLowerCase() === (statusTab || "").toLowerCase())
            .filter((r) =>
                !q
                    ? true
                    : `${r.customer} ${r.property} ${r.id}`
                        .toLowerCase()
                        .includes(q)
            );
    }, [requestForms, statusTab, search]);

    // Pagination
    const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE) || 1;
    const paginatedRows = filteredRows.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const counts = useMemo(() => {
        const normalize = (s = "") => s.toLowerCase();
        return {
            new: requestForms.filter(r => normalize(r.status) === "pending").length,
            arrived: requestForms.filter(r => normalize(r.status) === "arrived").length,
            completed: requestForms.filter(r => normalize(r.status) === "completed" || normalize(r.status) === "confirm").length,
            cancelled: requestForms.filter(r =>
                ["rejected", "canceled", "cancelled"].includes(normalize(r.status))
            ).length,
        };
    }, [requestForms]);

    // Fetch Details by ID
    const openDetail = async (id) => {
        setShowDetailModal(true);
        setDetailLoading(true);
        setDetailData(null);

        try {
            const res = await axios.get(`${API}/user/getRequestFormById?formId=${id}`);
            if (res.data?.success) {
                setDetailData(res.data.data);
            } else {
                throw new Error(res.data?.msg || "Failed to load request details");
            }
        } catch (err) {
            toast.error(err.message || "Failed to fetch request details");
        } finally {
            setDetailLoading(false);
        }
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
        setDetailData(null);
    };

    return (
        <div className="serbi-um-page">
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
                        title="Confirmed / Completed"
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

            {/* Status Tabs */}
            <div className="serbi-um-tabs mb-3">
                {STATUS_TABS.request.map((s) => (
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

            {/* Table Card */}
            <div className="serbi-um-card mt-3">
                {/* Search */}
                <div className="serbi-um-search">
                    <FiSearch className="serbi-um-search-icon" />
                    <input
                        className="form-control"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search by customer, property..."
                    />
                </div>

                <table className="serbi-um-table">
                    <thead>
                        <tr>
                            <th style={{ width: "12%" }}>Request ID</th>
                            <th style={{ width: "22%" }}>Customer / Tech</th>
                            <th style={{ width: "18%" }}>Property</th>
                            <th style={{ width: "14%" }}>Severity</th>
                            <th style={{ width: "18%" }}>Date & Time</th>
                            <th style={{ width: "16%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={6} style={{ padding: 20, textAlign: "center" }}>
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            paginatedRows.map((r) => (
                                <tr key={r.id}>
                                    <td>#{r.id.slice(0, 6)}</td>
                                    <td>{r.customer}</td>
                                    <td>{r.property}</td>
                                    <td>
                                        <span className={`badge ${r.severity?.toLowerCase() === "high" ? "bg-danger" : r.severity?.toLowerCase() === "medium" ? "bg-warning text-dark" : "bg-info text-dark"}`}>
                                            {r.severity}
                                        </span>
                                    </td>
                                    <td>{r.date} {r.time && r.time !== "-" ? `(${r.time})` : ""}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-dark"
                                            onClick={() => openDetail(r.id)}
                                            title="View Details"
                                        >
                                            <FiEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        {!loading && paginatedRows.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: 20, textAlign: "center" }}>
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center px-3 gap-2 mt-3">
                    <button
                        className="btn btn-secondary"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="btn btn-secondary"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* DETAIL MODAL */}
            {showDetailModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeDetailModal}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content shadow-lg border-0">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title fw-bold">
                                    Service Request Details{" "}
                                    {detailData?._id && (
                                        <small className="text-muted fs-6">(#{detailData._id})</small>
                                    )}
                                </h5>
                                <button type="button" className="btn-close" onClick={closeDetailModal} />
                            </div>

                            <div className="modal-body p-4">
                                {detailLoading && (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status" />
                                        <p className="mt-2 text-muted">Fetching details...</p>
                                    </div>
                                )}

                                {!detailLoading && detailData && (
                                    <div className="d-flex flex-column gap-3">
                                        {/* Status & Severity Bar */}
                                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 p-3 bg-light rounded border">
                                            <div>
                                                <span className="text-muted me-2">Status:</span>
                                                <span className="badge bg-primary fs-6">{detailData.status || "Pending"}</span>
                                            </div>
                                            {detailData.paymentStatus && (
                                                <div>
                                                    <span className="text-muted me-2">Payment:</span>
                                                    <span className={`badge ${detailData.paymentStatus.toLowerCase() === "completed" || detailData.paymentStatus.toLowerCase() === "paid" ? "bg-success" : "bg-secondary"}`}>
                                                        {detailData.paymentStatus}
                                                    </span>
                                                </div>
                                            )}
                                            {detailData.severity && (
                                                <div>
                                                    <span className="text-muted me-2">Severity:</span>
                                                    <span className={`badge ${detailData.severity.toLowerCase() === "high" ? "bg-danger" : detailData.severity.toLowerCase() === "medium" ? "bg-warning text-dark" : "bg-info text-dark"}`}>
                                                        {detailData.severity}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Grid Info */}
                                        <div className="row g-3">
                                            {/* Service & Property Info */}
                                            <div className="col-12 col-md-6">
                                                <div className="card h-100 border p-3">
                                                    <h6 className="fw-bold mb-3 border-bottom pb-2">Property & Service Info</h6>
                                                    <p className="mb-1">
                                                        <strong>Property Type:</strong> {detailData.propertyType || "-"}
                                                    </p>
                                                    {detailData.residentailType && (
                                                        <p className="mb-1">
                                                            <strong>Residential Type:</strong> {detailData.residentailType}
                                                        </p>
                                                    )}
                                                    {detailData.areaSqFt && (
                                                        <p className="mb-1">
                                                            <strong>Area:</strong> {detailData.areaSqFt} sq ft
                                                        </p>
                                                    )}
                                                    <p className="mb-1">
                                                        <strong>Date & Time:</strong> {detailData.date || "-"} {detailData.time ? `(${detailData.time})` : ""}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Technician Info */}
                                            <div className="col-12 col-md-6">
                                                <div className="card h-100 border p-3">
                                                    <h6 className="fw-bold mb-3 border-bottom pb-2">Technician Details</h6>
                                                    {detailData.technicianId && typeof detailData.technicianId === "object" ? (
                                                        <>
                                                            <div className="d-flex align-items-center gap-3 mb-2">
                                                                {detailData.technicianId.profileImage ? (
                                                                    <img
                                                                        src={`${IMG_URL}/${detailData.technicianId.profileImage}`}
                                                                        alt="Tech"
                                                                        className="rounded-circle"
                                                                        style={{ width: 45, height: 45, objectFit: "cover" }}
                                                                    />
                                                                ) : (
                                                                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                                                                        <FiUser size={20} />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <div className="fw-bold">{detailData.technicianId.fullName || "N/A"}</div>
                                                                    <div className="small text-muted">{detailData.technicianId.email}</div>
                                                                </div>
                                                            </div>
                                                            {detailData.technicianId.phone && (
                                                                <p className="mb-1 small">
                                                                    <strong>Phone:</strong> {detailData.technicianId.phone}
                                                                </p>
                                                            )}
                                                            {detailData.technicianId.price && (
                                                                <p className="mb-1 small">
                                                                    <strong>Hourly Rate:</strong> ${detailData.technicianId.price}
                                                                </p>
                                                            )}
                                                            {detailData.technicianId.avgRating && (
                                                                <p className="mb-1 small">
                                                                    <strong>Rating:</strong> ⭐ {detailData.technicianId.avgRating} ({detailData.technicianId.totalReviews || 0} reviews)
                                                                </p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p className="text-muted mb-0">No technician assigned yet.</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Location & Address */}
                                            <div className="col-12">
                                                <div className="card border p-3">
                                                    <h6 className="fw-bold mb-2 border-bottom pb-2 d-flex align-items-center gap-2">
                                                        <FiMapPin className="text-danger" /> Address & Location
                                                    </h6>
                                                    <p className="mb-0 text-dark">
                                                        {detailData.address || detailData.location?.locationName || detailData.locationName || "N/A"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Pricing & Financial */}
                                            {(detailData.amount || detailData.depositAmount) && (
                                                <div className="col-12">
                                                    <div className="card border p-3">
                                                        <h6 className="fw-bold mb-2 border-bottom pb-2 d-flex align-items-center gap-2">
                                                            <FiDollarSign className="text-success" /> Pricing & Deposit
                                                        </h6>
                                                        <div className="d-flex flex-wrap gap-4">
                                                            {detailData.amount && (
                                                                <div>
                                                                    <span className="text-muted me-1">Total Amount:</span>
                                                                    <strong className="text-success fs-5">${detailData.amount}</strong>
                                                                </div>
                                                            )}
                                                            {detailData.depositAmount && (
                                                                <div>
                                                                    <span className="text-muted me-1">Deposit Amount:</span>
                                                                    <strong className="fs-5">${detailData.depositAmount}</strong>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Notes */}
                                            {(detailData.notes || detailData.Notes) && (
                                                <div className="col-12">
                                                    <div className="card border p-3 bg-light">
                                                        <h6 className="fw-bold mb-2 border-bottom pb-2">Notes</h6>
                                                        <p className="mb-0 text-secondary">{detailData.notes || detailData.Notes}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Timestamps */}
                                            <div className="col-12 text-end text-muted small">
                                                {detailData.createdAt && (
                                                    <span className="me-3">Created: {new Date(detailData.createdAt).toLocaleString()}</span>
                                                )}
                                                {detailData.updatedAt && (
                                                    <span>Updated: {new Date(detailData.updatedAt).toLocaleString()}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-secondary" onClick={closeDetailModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" />
                </div>
            )}
        </div>
    );
}
