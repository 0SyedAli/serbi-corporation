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
} from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";

import {
  fetchUsers,
  setPage,
  setType,
  forceReload,
} from "@/redux/features/users/usersSlice";
import { showErrorToast } from "@/lib/toast";

export default function UserManagementMain() {
  const [tab, setTab] = useState("customers");
  const [showModal, setShowModal] = useState(false);
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
    const now = Date.now();
    const isStale =
      !lastFetchedAt || now - lastFetchedAt > ttl;

    if (!shouldReload && !isStale) return;

    dispatch(fetchUsers({ type, page, limit }));
  }, [type, page, shouldReload]);

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

  return (
    <div className="serbi-um-page">
      <div className="serbi-um-title">User Management</div>

      {/* Tabs */}
      <div className="mt-3">
        <div className="serbi-um-tabs">
          <button
            className={`serbi-um-tab ${type === "User" ? "active" : ""
              }`}
            onClick={() => dispatch(setType("User"))}
          >
            Customers
          </button>

          <button
            className={`serbi-um-tab ${type === "Technician" ? "active" : ""
              }`}
            onClick={() => dispatch(setType("Technician"))}
          >
            Technicians
          </button>
        </div>
      </div>

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
                {/* <th style={{ width: "10%" }}>Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} style={{ padding: 20 }}>
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                rows.map((u) => (
                  <tr key={u.id}>
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
                      <span
                        className={`serbi-um-status ${u.status === "Active" ? "active" : "inactive"
                          }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    {/* <td>
                      <div className="serbi-um-actions">
                        <button
                          type="button"
                          className="serbi-um-action-btn serbi-um-action-edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          className="serbi-um-action-btn serbi-um-action-trash"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td> */}
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
        </div>
      </div>
    </div>
  );
}
