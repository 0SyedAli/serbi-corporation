"use client"
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiMail, FiPhone, FiUsers, FiMoreVertical } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import { fetchUsers, setPage, forceReload } from "@/redux/features/users/usersSlice";

export default function TechnicianManagement() {
  const dispatch = useDispatch();

  const { list, loading, page, limit, total } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filterVerified, setFilterVerified] = useState(null); // new state to filter based on verification

  const dropdownRef = useRef(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchUsers({ type: "Technician", page, limit }));
  }, [dispatch, page, limit]);

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= SEARCH AND FILTER ================= */
  const rows = useMemo(() => {
    const q = search.toLowerCase();
    let filteredList = list;

    if (filterVerified !== null) {
      filteredList = list.filter((u) => u.isVerified === filterVerified);
    }

    if (q) {
      filteredList = filteredList.filter((u) =>
        [u.name, u.email, u.phone, u.address, u.isVerified]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return filteredList;
  }, [list, search, filterVerified]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="serbi-um-page">
      <div className="serbi-um-card">
        {/* ================= HEADER ================= */}
        <div className="serbi-um-card-head">
          <div className="serbi-um-card-head-left">
            <FiUsers className="serbi-um-head-icon" />
            <div className="serbi-um-card-head-title">Technicians</div>
          </div>
          <div className="d-flex align-items-center">
            <div className="filter-buttons d-flex align-items-cetner gap-2">
              <button
                className="btn serbi-um-add-btn2 suab2"
                onClick={() => setFilterVerified(null)} // Reset filter
              >
                All
              </button>
              <button
                className="btn serbi-um-add-btn2 btn-success"
                onClick={() => setFilterVerified(true)} // Show only verified technicians
              >
                Verified
              </button>
              <button
                className="btn serbi-um-add-btn2 btn-secondary"
                onClick={() => setFilterVerified(false)} // Show only unverified technicians
              >
                Unverified
              </button>

            </div>
            {/* <button className="serbi-um-add-btn ms-2" onClick={() => dispatch(forceReload())}>
              <TfiReload />
              Refresh
            </button> */}
          </div>
        </div>

        {/* ================= FILTER BUTTONS ================= */}


        {/* ================= SEARCH ================= */}
        <div className="serbi-um-search">
          <FiSearch className="serbi-um-search-icon" />
          <input
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="serbi-um-table-wrap">
          <table className="serbi-um-table">
            <thead>
              <tr>
                <th style={{ width: "18%" }}>Name</th>
                <th style={{ width: "28%" }}>Contact</th>
                <th style={{ width: "18%" }}>Address</th>
                <th style={{ width: "10%" }}>Actions</th>
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
                      {u.isVerified ? (
                        <span className="badge bg-success serbi-um-status">Verified</span>
                      ) : (
                        <button
                          type="button"
                          className="btn serbi-um-status sus-verify"
                          style={{
                            border: "1px solid #000",
                          }}
                          onClick={() => dispatch(verifyTechnician(u.id))}
                        >
                          Verify Technician
                        </button>
                      )}
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

          {/* ================= PAGINATION ================= */}
          {/* <div className="d-flex justify-content-between align-items-center px-3 gap-2 mt-3">
            <button
              className="btn btn-secondary"
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages || 1}
            </span>

            <button
              className="btn btn-secondary"
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}