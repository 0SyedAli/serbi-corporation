"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiUsers,
  FiMoreVertical,
} from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";

import {
  fetchUsers,
  setPage,
  setType,
  forceReload,
} from "@/redux/features/users/usersSlice";
import { showErrorToast } from "@/lib/toast";
import {
  suspendUser,
  unsuspendUser,
  blockUser,
  unblockUser,
} from "@/redux/features/users/adminActions";

export default function UserManagementMain() {
  const [tab, setTab] = useState("customers");
  const [showModal, setShowModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [durationValue, setDurationValue] = useState("");
  const [durationUnits, setDurationUnits] = useState("minutes");
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const {
    list,
    loading,
    error,
    page,
    limit,
    total,
    type,
    lastFetchedAt,
    ttl,
    shouldReload,
  } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");

  /* =========================
     SMART FETCH
  ========================= */
  useEffect(() => {
    if (type !== "User") {
      dispatch(setType("User"));
    }
  }, [dispatch, type]);

  useEffect(() => {
    if (type !== "User") return;
    const now = Date.now();
    const isStale =
      !lastFetchedAt || now - lastFetchedAt > ttl;

    if (!shouldReload && !isStale) return;

    dispatch(fetchUsers({ type, page, limit }));
  }, [dispatch, type, page, limit, shouldReload, lastFetchedAt, ttl]);

  useEffect(() => {
    if (error) showErrorToast(error);
  }, [error]);

  /* =========================
     SEARCH
  ========================= */
  const rows = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return list;

    return list.filter((u) =>
      [u.name, u.email, u.phone, u.address, u.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [list, search]);

  const totalPages = Math.ceil(total / limit);
  const openSuspend = (userId) => {
    setSelectedUserId(userId);
    setDurationValue("");
    setDurationUnits("minutes");
    setReason("");
    setShowSuspendModal(true);
  };

  const submitSuspend = () => {
    if (!selectedUserId) return;
    if (!reason.trim()) return alert("Please add suspension reason");

    // Dispatch the suspend action
    dispatch(
      suspendUser({
        userId: selectedUserId,
        durationValue: Number(durationValue),
        durationUnits,
        reason,
      })
    );

    setShowSuspendModal(false);
    setSelectedUserId(null);
  };
  return (
    <div className="serbi-um-page">
      {/* <div className="serbi-um-title">User Management</div> */}

      {/* Tabs */}
      {/* <div className="">
        <div className="serbi-um-tabs">
          <button
            className={`serbi-um-tab ${type === "User" ? "active" : ""
              }`}
            onClick={() => dispatch(setType("User"))}
          >
            Customers
          </button>

      
        </div>
      </div> */}

      {/* Main Card */}
      <div className="serbi-um-card">
        <div className="serbi-um-card-head">
          <div className="serbi-um-card-head-left">
            <FiUsers className="serbi-um-head-icon" />
            <div className="serbi-um-card-head-title">
              {type === "User" ? "Customers" : "Technicians"}
            </div>
          </div>
          <button
            className="serbi-um-add-btn"
            onClick={() => dispatch(forceReload())}
          >
            <TfiReload />
            Refresh
          </button>
          {/* <button
            type="button"
            className="serbi-um-add-btn"
            onClick={() => setShowModal(true)}
          >
            <FiPlus size={18} />
            Add {tab === "customers" ? "Customer" : "Technician"}
          </button> */}
        </div>

        {/* Search */}
        <div className="serbi-um-search">
          <FiSearch className="serbi-um-search-icon" />
          <input
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
          />
        </div>

        {/* Table */}
        <div className="serbi-um-table-wrap">
          <table className="serbi-um-table">
            <thead>
              <tr>
                <th style={{ width: "22%" }}>Name</th>
                <th style={{ width: "34%" }}>Contact</th>
                <th style={{ width: "20%" }}>Address</th>
                <th style={{ width: "14%" }}>Status</th>
                <th style={{ width: "10%" }}>Actions</th>
                {/* <th style={{ width: "10%" }}>Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {loading && rows.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 20, textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              )}

              {rows.map((u) => (
                <tr key={u.id} style={{ opacity: loading ? 0.6 : 1, transition: "opacity 0.2s" }}>
                  <td className="serbi-um-name">{u.name}</td>

                  <td>
                    <div className="serbi-um-contact">
                      <div className="serbi-um-contact-line">
                        <FiMail className="serbi-um-contact-ico" />
                        <span>{u.email}</span>
                      </div>
                      <div className="serbi-um-contact-line">
                        <FiPhone className="serbi-um-contact-ico" />
                        <span>{u.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td className="text-wrap w-50">{u.address}</td>

                  <td>
                    {/* Display Status */}
                    <span
                      className={`serbi-um-status ${u.isSuspended || u.isBlocked ? "inactive" : "active"}`}
                    >
                      {u.isBlocked ? "Blocked" : u.isSuspended ? "Suspended" : "Active"}
                    </span>
                  </td>

                  <td>
                    {/* Actions Dropdown */}
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-light dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FiMoreVertical />
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end shadow">
                        {/* Show Suspend and Block buttons if the user is NOT suspended and NOT blocked */}
                        {!u.isSuspended && !u.isBlocked && (
                          <>
                            <li>
                              <button
                                type="button"
                                className="dropdown-item"
                                onClick={() => {
                                  openSuspend(u.id); // Open modal for suspend
                                }}
                              >
                                ⏳ Suspend
                              </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <button
                                type="button"
                                className="dropdown-item text-danger"
                                onClick={() => {
                                  dispatch(blockUser(u.id));
                                }}
                              >
                                🚫 Block
                              </button>
                            </li>
                          </>
                        )}

                        {/* Show Unsuspend button if the user is suspended */}
                        {u.isSuspended && (
                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                dispatch(unsuspendUser(u.id));
                              }}
                            >
                              🔄 Unsuspend
                            </button>
                          </li>
                        )}

                        {/* Show Unblock button if the user is blocked */}
                        {u.isBlocked && (
                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                dispatch(unblockUser(u.id)).then(() => {
                                  dispatch(forceReload()); // Refresh the user list after unblocking
                                });
                              }}
                            >
                              ✅ Unblock
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 22, fontWeight: 700 }}>
                    No results found.
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
              onClick={() => dispatch(setPage(page - 1))}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-secondary"
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next
            </button>
          </div>
          {showSuspendModal && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">

                  <div className="modal-header">
                    <h5 className="modal-title fw-bold">Suspend User</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowSuspendModal(false)}
                    />
                  </div>

                  <div className="modal-body modal-body-suspend">
                    <div className="serbi-form-group">
                      <label className="form-label mb-1 ">Duration Value</label>
                      <input
                        type="number"
                        className="form-control "
                        value={durationValue}
                        onChange={(e) => setDurationValue(e.target.value)}
                        min={1}
                        placeholder="Enter Duration"
                      />
                    </div>

                    <div className="serbi-form-group mt-3">
                      <label className="form-label mb-1">Duration Unit</label>
                      <select
                        className="form-select"
                        value={durationUnits}
                        onChange={(e) => setDurationUnits(e.target.value)}
                      >
                        <option value="minutes">minutes</option>
                        <option value="hours">hours</option>
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                        <option value="years">years</option>
                      </select>
                    </div>

                    <div className="serbi-form-group mt-3">
                      <label className="form-label mb-1">Reason</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Violation of terms..."
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowSuspendModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={submitSuspend}
                    >
                      Suspend
                    </button>
                  </div>

                </div>
              </div>

              {/* backdrop */}
              <div className="modal-backdrop fade show"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
