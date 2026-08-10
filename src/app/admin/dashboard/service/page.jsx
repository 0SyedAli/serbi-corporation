"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import { FiPlus, FiSearch } from "react-icons/fi";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    serviceId: null,
    name: "",
  });

  /* =========================
     FETCH SERVICES
  ========================== */
  const getServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/admin/getAllServices`);
      if (res.data?.success) {
        setServices(res.data.data || []);
      } else {
        throw new Error(res.data?.msg || "Failed to load services");
      }
    } catch (err) {
      console.error(err.message || "Failed to load services");
      toast.error(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  /* =========================
     SEARCH & PAGINATION
  ========================== */
  const filteredServices = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return services;
    return services.filter((s) => s.name?.toLowerCase().includes(q));
  }, [services, search]);

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE) || 1;
  const paginatedServices = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, page]);

  /* =========================
     SAVE SERVICE (ADD / EDIT)
  ========================== */
  const saveService = async () => {
    if (!form.name.trim()) {
      toast.error("Service name is required");
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        const res = await axios.post(`${API}/admin/updateService`, {
          serviceId: form.serviceId,
          name: form.name.trim(),
        });
        if (res.data?.success) {
          toast.success(res.data.msg || "Service updated successfully");
          closeModal();
          getServices();
        } else {
          throw new Error(res.data?.msg || "Update failed");
        }
      } else {
        const res = await axios.post(`${API}/admin/addService`, {
          name: form.name.trim(),
        });
        if (res.data?.success) {
          toast.success(res.data.msg || "Service added successfully");
          closeModal();
          getServices();
        } else {
          throw new Error(res.data?.msg || "Add failed");
        }
      }
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     DELETE SERVICE
  ========================== */
  const confirmDelete = async () => {
    if (!deleteTarget?._id) return;

    setDeleting(true);
    try {
      const res = await axios.post(`${API}/admin/deleteService`, {
        serviceId: deleteTarget._id,
      });

      if (res.data?.success) {
        toast.success(res.data.msg || "Service deleted successfully");
        getServices();
      } else {
        throw new Error(res.data?.msg || "Delete failed");
      }
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setDeleteModal(false);
      setDeleteTarget(null);
      setDeleting(false);
    }
  };

  /* =========================
     HELPERS
  ========================== */
  const openAdd = () => {
    setIsEdit(false);
    setForm({ serviceId: null, name: "" });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setIsEdit(true);
    setForm({
      serviceId: item._id,
      name: item.name,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ serviceId: null, name: "" });
  };

  /* =========================
     RENDER
  ========================== */
  return (
    <>
      <div className="serbi-um-page">
        <div className="serbi-um-card">
          {/* Header Bar */}
          <div className="serbi-um-card-head d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-secondary px-3 py-2 fs-6">
                Total: {services.length}
              </span>
            </div>
            <button className="serbi-um-add-btn" onClick={openAdd}>
              <FiPlus size={18} /> Add Service
            </button>
          </div>

          {/* Search Box */}
          <div className="serbi-um-search mt-3">
            <FiSearch className="serbi-um-search-icon" />
            <input
              className="form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search services..."
            />
          </div>

          {/* Services Table */}
          <div className="serbi-um-table-wrap mt-3">
            <table className="serbi-um-table">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>#</th>
                  <th style={{ width: "65%" }}>Service Name</th>
                  <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={3} style={{ padding: 20, textAlign: "center" }}>
                      Loading services...
                    </td>
                  </tr>
                )}

                {!loading &&
                  paginatedServices.map((item, index) => (
                    <tr key={item._id}>
                      <td className="fw-semibold text-muted">
                        #{(page - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>

                      <td>
                        <span className="fw-bold text-dark fs-6">{item.name}</span>
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => openEdit(item)}
                            title="Edit Service"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setDeleteTarget(item);
                              setDeleteModal(true);
                            }}
                            title="Delete Service"
                          >
                            <MdDeleteForever size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {!loading && paginatedServices.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ padding: 22, textAlign: "center" }}>
                      No services found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

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
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg border-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveService();
                }}
              >
                <div className="modal-header bg-light">
                  <h5 className="modal-title fw-bold">
                    {isEdit ? "Update Service" : "Add New Service"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  />
                </div>

                <div className="modal-body p-4">
                  <div className="form-group">
                    <label className="form-label fw-semibold mb-1">Service Name</label>
                    <input
                      className="form-control form-control-lg"
                      placeholder="e.g. Rats, Mice, Termites"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : isEdit ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setDeleteModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-light">
                <h5 className="modal-title fw-bold text-danger">Delete Service</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteModal(false)}
                />
              </div>
              <div className="modal-body p-4 text-center">
                <p className="fs-5 mb-1">
                  Are you sure you want to delete service{" "}
                  <strong className="text-dark">"{deleteTarget?.name}"</strong>?
                </p>
                <small className="text-muted">This action cannot be undone.</small>
              </div>
              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={deleting}
                  onClick={confirmDelete}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </>
  );
}
