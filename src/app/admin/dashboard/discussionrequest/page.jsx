"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FiSearch, FiEye, FiUser, FiDollarSign } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { STATUS_TABS } from "@/redux/features/requests/statusMap";
import { fetchRequests } from "@/redux/features/requests/requestsSlice";
import { showErrorToast } from "@/lib/toast";

const API = process.env.NEXT_PUBLIC_API_URL;
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

function StatCardMini({ title, value, icon, iconClassName = "" }) {
    return (
        <div className="serbi-stat-card h-100">
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

export default function DiscussionRequestsMain() {
    const dispatch = useDispatch();
    const {
        discussionForms,
        servicesMap,
        usersMap,
        techniciansMap,
        loading,
        error,
    } = useSelector((state) => state.requests);

    const [statusTab, setStatusTab] = useState("All");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Detail Modal states
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        dispatch(fetchRequests("discussion"));
    }, [dispatch]);

    useEffect(() => {
        if (error) showErrorToast(error);
    }, [error]);

    // Filter by status + search
    const filteredRows = useMemo(() => {
        const q = search.toLowerCase().trim();
        return discussionForms
            .filter((r) =>
                !statusTab || statusTab.toLowerCase() === "all"
                    ? true
                    : (r.status || "").toLowerCase() === statusTab.toLowerCase()
            )
            .filter((r) =>
                !q
                    ? true
                    : `${r.customer} ${r.technicianName} ${r.property} ${r.typeOfPest} ${r.id}`
                        .toLowerCase()
                        .includes(q)
            );
    }, [discussionForms, statusTab, search]);

    // Pagination
    const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE) || 1;
    const paginatedRows = filteredRows.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const counts = useMemo(() => {
        const normalize = (s = "") => s.toLowerCase();
        return {
            started: discussionForms.filter(r => normalize(r.status) === "start").length,
            stopped: discussionForms.filter(r => normalize(r.status) === "stop").length,
            completed: discussionForms.filter(r => normalize(r.status) === "completed").length,
        };
    }, [discussionForms]);

    // Fetch Details by ID
    const openDetail = async (id) => {
        setShowDetailModal(true);
        setDetailLoading(true);
        setDetailData(null);

        try {
            const res = await axios.get(`${API}/user/getDiscussionFormById?formId=${id}`);
            if (res.data?.success) {
                const data = res.data.data;
                const formObj = data?.discussionForm || data?.requestForm || (Array.isArray(data) ? data[0] : data);
                setDetailData(formObj || data);
            } else {
                throw new Error(res.data?.msg || "Failed to load discussion request details");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to fetch request details");
        } finally {
            setDetailLoading(false);
        }
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
        setDetailData(null);
    };

    // Robust Resolved Objects for Detail Modal
    const userObj = useMemo(() => {
        if (!detailData?.userId) return null;
        if (typeof detailData.userId === "object" && detailData.userId !== null) {
            return detailData.userId;
        }
        return usersMap[detailData.userId] || techniciansMap[detailData.userId] || null;
    }, [detailData, usersMap, techniciansMap]);

    const techObj = useMemo(() => {
        if (!detailData?.technicianId) return null;
        if (typeof detailData.technicianId === "object" && detailData.technicianId !== null) {
            return detailData.technicianId;
        }
        return techniciansMap[detailData.technicianId] || usersMap[detailData.technicianId] || null;
    }, [detailData, techniciansMap, usersMap]);

    const serviceObj = useMemo(() => {
        if (!detailData?.serviceId) return null;
        if (typeof detailData.serviceId === "object" && detailData.serviceId !== null) {
            return detailData.serviceId;
        }
        return servicesMap[detailData.serviceId] || null;
    }, [detailData, servicesMap]);

    return (
        <div className="serbi-um-page">
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-4">
                    <StatCardMini
                        title="Started"
                        value={counts.started}
                        icon={<LuClock3 />}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <StatCardMini
                        title="Stopped"
                        value={counts.stopped}
                        icon={<IoCloseCircleOutline />}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <StatCardMini
                        title="Completed"
                        value={counts.completed}
                        icon={<IoCheckmarkCircleOutline />}
                    />
                </div>
            </div>

            {/* Status Tabs */}
            <div className="overflow-auto">
                <div className="serbi-um-tabs mb-2">
                    {STATUS_TABS.discussion.map((s) => (
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
                        placeholder="Search by customer, technician, pest type, property..."
                    />
                </div>

                <div className="serbi-um-table-wrap mt-3">
                    <table className="serbi-um-table">
                        <thead>
                            <tr>
                                <th style={{ width: "12%" }}>Request ID</th>
                                <th style={{ width: "18%" }}>Customer</th>
                                <th style={{ width: "18%" }}>Technician</th>
                                <th style={{ width: "14%" }}>Pest Type</th>
                                <th style={{ width: "14%" }}>Property</th>
                                <th style={{ width: "12%" }}>Severity</th>
                                <th style={{ width: "10%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={7} style={{ padding: 20, textAlign: "center" }}>
                                        Loading...
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                paginatedRows.map((r) => (
                                    <tr key={r.id}>
                                        <td>#{r.id.slice(0, 6)}</td>
                                        <td>
                                            <div className="fw-semibold text-dark">{r.customer}</div>
                                        </td>
                                        <td>
                                            <div className="text-muted">{r.technicianName || "-"}</div>
                                        </td>
                                        <td>{r.typeOfPest || "-"}</td>
                                        <td>{r.property}</td>
                                        <td>
                                            <span className={`badge ${r.severity?.toLowerCase() === "high" ? "bg-danger" : r.severity?.toLowerCase() === "medium" ? "bg-warning text-dark" : "bg-info text-dark"}`}>
                                                {r.severity}
                                            </span>
                                        </td>
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
                                    <td colSpan={7} style={{ padding: 20, textAlign: "center" }}>
                                        No data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
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
                )}
            </div>

            {/* DETAIL MODAL */}
            {showDetailModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeDetailModal}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content shadow-lg border-0">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title fw-bold">
                                    Discussion Request Details{" "}

                                </h5>
                                <button type="button" className="btn-close" onClick={closeDetailModal} />
                            </div>

                            <div className="modal-body p-4">
                                {detailLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-3 text-muted fw-semibold">Loading details...</p>
                                    </div>
                                ) : detailData ? (
                                    <div className="d-flex flex-column gap-3">
                                        {/* Status & Badges Bar */}
                                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 p-3 bg-light rounded border">
                                            <div>
                                                <span className="text-muted me-2">Status:</span>
                                                <span className={`badge ${detailData.status?.toLowerCase() === "completed" ? "bg-success" : detailData.status?.toLowerCase() === "stop" ? "bg-danger" : "bg-primary"} fs-6`}>
                                                    {detailData.status || "Start"}
                                                </span>
                                            </div>

                                            {detailData.accepted !== undefined && (
                                                <div>
                                                    <span className="text-muted me-2">Accepted:</span>
                                                    <span className={`badge ${detailData.accepted ? "bg-success" : "bg-secondary"}`}>
                                                        {detailData.accepted ? "Yes" : "No"}
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

                                            {detailData.depositPaid !== undefined && (
                                                <div>
                                                    <span className="text-muted me-2">Deposit:</span>
                                                    <span className={`badge ${detailData.depositPaid ? "bg-success" : "bg-warning text-dark"}`}>
                                                        {detailData.depositPaid ? "Paid" : "Unpaid"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Grid Info */}
                                        <div className="row g-3">
                                            {/* Customer Details */}
                                            <div className="col-12 col-md-6">
                                                <div className="card h-100 border p-3">
                                                    <h6 className="fw-bold mb-3 border-bottom pb-2 d-flex align-items-center gap-2">
                                                        <FiUser className="text-primary" /> Customer Info
                                                    </h6>
                                                    <p className="mb-1">
                                                        <strong>Name:</strong> {userObj?.fullName || userObj?.name || (typeof detailData.userId === "string" ? detailData.userId : "-")}
                                                    </p>
                                                    {userObj?.email && (
                                                        <p className="mb-1">
                                                            <strong>Email:</strong> {userObj.email}
                                                        </p>
                                                    )}
                                                    {userObj?.phone && (
                                                        <p className="mb-1">
                                                            <strong>Phone:</strong> {userObj.phone}
                                                        </p>
                                                    )}
                                                    {userObj?.locationName && (
                                                        <p className="mb-1">
                                                            <strong>Location:</strong> {userObj.locationName}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Technician Details */}
                                            <div className="col-12 col-md-6">
                                                <div className="card h-100 border p-3">
                                                    <h6 className="fw-bold mb-3 border-bottom pb-2 d-flex align-items-center gap-2">
                                                        <FiUser className="text-success" /> Technician Details
                                                    </h6>
                                                    {techObj ? (
                                                        <>
                                                            <div className="d-flex align-items-center gap-3 mb-2">
                                                                {techObj.profileImage ? (
                                                                    <img
                                                                        src={`${IMG_URL}/${techObj.profileImage}`}
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
                                                                    <div className="fw-bold">{techObj.fullName || "N/A"}</div>
                                                                    <div className="small text-muted">{techObj.email || "-"}</div>
                                                                </div>
                                                            </div>
                                                            {techObj.phone && (
                                                                <p className="mb-1 small">
                                                                    <strong>Phone:</strong> {techObj.phone}
                                                                </p>
                                                            )}
                                                            {techObj.price && (
                                                                <p className="mb-1 small">
                                                                    <strong>Hourly Rate:</strong> ${techObj.price}
                                                                </p>
                                                            )}
                                                            {techObj.workingHours && (
                                                                <p className="mb-1 small">
                                                                    <strong>Working Hours:</strong> {techObj.workingHours.startTime} - {techObj.workingHours.endTime}
                                                                </p>
                                                            )}
                                                            {(techObj.locationName || techObj.location?.locationName) && (
                                                                <p className="mb-1 small">
                                                                    <strong>Location:</strong> {techObj.locationName || techObj.location?.locationName}
                                                                </p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p className="text-muted mb-0">No technician assigned yet.</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Service & Property Info */}
                                            <div className="col-12 col-md-6">
                                                <div className="card h-100 border p-3">
                                                    <h6 className="fw-bold mb-3 border-bottom pb-2">Service & Property Info</h6>
                                                    <p className="mb-1">
                                                        <strong>Service Name:</strong>{" "}
                                                        {serviceObj?.name || (typeof detailData.serviceId === "object" ? detailData.serviceId?.name : "-")}
                                                    </p>
                                                    {detailData.typeOfPest && (
                                                        <p className="mb-1">
                                                            <strong>Pest Type:</strong> {detailData.typeOfPest}
                                                        </p>
                                                    )}
                                                    <p className="mb-1">
                                                        <strong>Property Type:</strong> {detailData.propertyType || "-"}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Date & Time:</strong>{" "}
                                                        {detailData.date ? (detailData.date.includes("T") ? detailData.date.split("T")[0] : detailData.date) : "-"}{" "}
                                                        {detailData.time ? `(${detailData.time})` : ""}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Pricing & Deposit */}
                                            <div className="col-12 col-md-6">
                                                <div className="card h-100 border p-3">
                                                    <h6 className="fw-bold mb-2 border-bottom pb-2 d-flex align-items-center gap-2">
                                                        <FiDollarSign className="text-success" /> Pricing & Deposit
                                                    </h6>
                                                    <div className="d-flex flex-column gap-2 mt-1">
                                                        {detailData.amount !== undefined && detailData.amount !== null && (
                                                            <div>
                                                                <span className="text-muted me-1">Total Amount:</span>
                                                                <strong className="text-success fs-5">${detailData.amount}</strong>
                                                            </div>
                                                        )}
                                                        {detailData.depositAmount !== undefined && detailData.depositAmount !== null && (
                                                            <div>
                                                                <span className="text-muted me-1">Deposit Amount:</span>
                                                                <strong className="fs-5">${detailData.depositAmount}</strong>
                                                            </div>
                                                        )}
                                                        {detailData.depositPaid !== undefined && (
                                                            <div>
                                                                <span className="text-muted me-1">Deposit Status:</span>
                                                                <span className={`badge ${detailData.depositPaid ? "bg-success" : "bg-warning text-dark"}`}>
                                                                    {detailData.depositPaid ? "Paid" : "Unpaid"}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            {(detailData.Notes || detailData.notes) && (
                                                <div className="col-12">
                                                    <div className="card border p-3 bg-light">
                                                        <h6 className="fw-bold mb-2 border-bottom pb-2">Notes</h6>
                                                        <p className="mb-0 text-secondary">{detailData.Notes || detailData.notes}</p>
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
                                ) : (
                                    <div className="text-center py-5 text-muted">
                                        <p className="mb-0">Failed to load request details.</p>
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
