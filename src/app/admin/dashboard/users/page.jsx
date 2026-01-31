"use client";

import React, { useMemo, useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiMail, FiPhone, FiUsers } from "react-icons/fi";

const CUSTOMERS = [
  { id: "c1", name: "John Smith", email: "john@example.com", phone: "555-0101", address: "123 Main St", status: "Active" },
  { id: "c2", name: "Sarah Johnson", email: "sarah@example.com", phone: "555-0102", address: "456 Oak Ave", status: "Active" },
  { id: "c3", name: "Michael Brown", email: "michael@example.com", phone: "555-0103", address: "789 Pine Rd", status: "Inactive" },
  { id: "c4", name: "Emily Davis", email: "emily@example.com", phone: "555-0104", address: "321 Elm St", status: "Active" },
  { id: "c5", name: "David Wilson", email: "david@example.com", phone: "555-0105", address: "654 Maple Dr", status: "Active" },
];

const TECHNICIANS = [
  { id: "t1", name: "Maria Garcia", email: "maria@serbi.com", phone: "555-0201", address: "Service Hub - North", status: "Active" },
  { id: "t2", name: "Alex Turner", email: "alex@serbi.com", phone: "555-0202", address: "Service Hub - East", status: "Active" },
  { id: "t3", name: "James Lee", email: "james@serbi.com", phone: "555-0203", address: "Service Hub - West", status: "Inactive" },
];

export default function UserManagementMain() {
  const [tab, setTab] = useState("customers");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const rows = useMemo(() => {
    const base = tab === "customers" ? CUSTOMERS : TECHNICIANS;
    const q = search.trim().toLowerCase();

    if (!q) return base;

    return base.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        u.address.toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q)
      );
    });
  }, [tab, search]);

  const title = tab === "customers" ? "Customers" : "Technicians";
  const placeholder = tab === "customers" ? "Search customers..." : "Search technicians...";

  return (
    <div className="serbi-um-page">
      <div className="serbi-um-title">User Management</div>

      {/* Tabs (reuse previous tabs CSS) */}
      <div className="mt-3">
        <div className="serbi-um-tabs">
          <button
            type="button"
            className={`serbi-um-tab ${tab === "customers" ? "active" : ""}`}
            onClick={() => setTab("customers")}
          >
            Customers
          </button>

          <button
            type="button"
            className={`serbi-um-tab ${tab === "technicians" ? "active" : ""}`}
            onClick={() => setTab("technicians")}
          >
            Technicians
          </button>
        </div>
      </div>
      {/* Add New User */}
      {showModal && (
        <div className="modal-backdrop-lite" onClick={() => setShowModal(false)}>
          <div
            className="modal-sheet"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <form className="form-container">
              <h3 className="mb-3">Add New {tab === "customers" ? "Customer" : "Technician"}</h3>
              <div className="mb-3">
                <label className="auth-label">Full Name</label>
                <input
                  className="form-control auth-input"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label className="auth-label">Email</label>
                <input
                  className="form-control auth-input"
                  type="email"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label className="auth-label">Phone</label>
                <input
                  className="form-control auth-input"
                  type="tel"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label className="auth-label">Address</label>
                <input
                  className="form-control auth-input"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label className="auth-label">Address</label>
                <select name="" id="" className="form-select auth-input">
                  <option value="">Active</option>
                  <option value="">Non Active</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-secondary px-3"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn auth-primary-btn px-4">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Main Card */}
      <div className="serbi-um-card">
        <div className="serbi-um-card-head">
          <div className="serbi-um-card-head-left">
            <FiUsers className="serbi-um-head-icon" />
            <div className="serbi-um-card-head-title">{title}</div>
          </div>

          <button type="button" className="serbi-um-add-btn" onClick={() => setShowModal(true)}
          >
            <FiPlus size={18} />
            Add {tab === "customers" ? "Customer" : "Technician"}
          </button>
        </div>

        {/* Search */}
        <div className="serbi-um-search">
          <FiSearch className="serbi-um-search-icon" />
          <input
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
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
              </tr>
            </thead>

            <tbody>
              {rows.map((u) => (
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

                  <td>{u.address}</td>

                  <td>
                    <span className={`serbi-um-status ${u.status === "Active" ? "active" : "inactive"}`}>
                      {u.status}
                    </span>
                  </td>

                  <td>
                    <div className="serbi-um-actions">
                      <button type="button" className="serbi-um-action-btn serbi-um-action-edit" title="Edit">
                        <FiEdit2 />
                      </button>
                      <button type="button" className="serbi-um-action-btn serbi-um-action-trash" title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: "22px 12px", color: "#7a7f8a", fontWeight: 700 }}>
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
