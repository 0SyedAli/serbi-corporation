"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

const Severity = () => {
  const router = useRouter();

  const [severities, setSeverities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    severityId: null,
    severity: "",
  });

  /* =========================
     FETCH SEVERITIES
  ========================== */
  // const getSeverities = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${API}/admin/getAllSeverities`);

  //     if (res.data?.success) {
  //       setSeverities(res.data.data);
  //     } else {
  //       // Handle NO DATA case safely
  //       if (res.data?.msg === "No Property Types Found!") {
  //         toast.info("No severities found");
  //         setSeverities([]);

  //         // redirect after short delay
  //         setTimeout(() => {
  //           router.push("/admin/dashboard"); // change if needed
  //         }, 1200);
  //       } else {
  //         toast.error(res.data?.msg || "Failed to load severities");
  //       }
  //     }
  //   } catch (err) {
  //     toast.error(err.message || "Failed to load severities");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getSeverities = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/admin/getAllSeverities`);
      if (res.data?.success) {
        setSeverities(res.data.data);
      } else {
        throw new Error(res.data?.msg);
      }
    } catch (err) {
      console.error(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSeverities();
  }, []);

  /* =========================
     SAVE SEVERITY
  ========================== */
  const saveSeverity = async () => {
    if (!form.severity.trim()) {
      toast.error("Severity name is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        severity: form.severity,
      };

      if (isEdit) {
        payload.severityId = form.severityId;
      }

      const url = isEdit
        ? `${API}/admin/updateSeverity`
        : `${API}/admin/addSeverity`;

      const res = await axios.post(url, payload);

      if (res.data?.success) {
        toast.success(res.data.msg);
        closeModal();
        getSeverities();
      } else {
        toast.error(res.data?.msg || "Save failed");
      }
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     DELETE SEVERITY
  ========================== */
  const confirmDelete = async () => {
    if (!deleteTarget?._id) return;

    setDeleting(true);
    try {
      const res = await axios.post(`${API}/admin/deleteSeverity`, {
        severityId: deleteTarget._id,
      });

      if (res.data?.success) {
        toast.success("Severity deleted successfully");
        getSeverities();
      } else {
        toast.error(res.data?.msg || "Delete failed");
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
    setForm({ severityId: null, severity: "" });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setIsEdit(true);
    setForm({
      severityId: item._id,
      severity: item.severity,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ severityId: null, severity: "" });
  };

  /* =========================
     RENDER
  ========================== */
  return (
    <>
      <div className="serbi-um-page">
        <div className="d-flex justify-content-between align-items-center">
          <div className="serbi-um-title">All Severities</div>
          <button className="serbi-um-add-btn" onClick={openAdd}>
            <FiPlus size={18} /> Add Severity
          </button>
        </div>

        {loading && <p className="mt-3">Loading...</p>}

        {!loading && severities.length === 0 && (
          <p className="mt-3">No severities available.</p>
        )}

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-3">
          {severities.map((item) => (
            <div className="col" key={item._id}>
              <div className="category-card text-center">
                <img
                  src="/images/severity.jpg"
                  className="category-image"
                  alt={item.propertyType}
                />
                <h4 className="category-title">{item.severity}</h4>

                <div className="category-actions">
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => openEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      setDeleteTarget(item);
                      setDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-backdrop-lite" onClick={closeModal}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <form
              className="form-container h-auto"
              onSubmit={(e) => {
                e.preventDefault();
                saveSeverity();
              }}
            >
              <div className="serbi-modal-head">
                <div className="serbi-modal-title">
                  {isEdit ? "Update Severity" : "Add Severity"}
                </div>
                <button
                  type="button"
                  className="serbi-modal-close"
                  onClick={closeModal}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className="serbi-form-group mt-3">
                <label>Severity Name</label>
                <input
                  className="serbi-input"
                  placeholder="e.g. High"
                  value={form.severity}
                  onChange={(e) =>
                    setForm({ ...form, severity: e.target.value })
                  }
                />
              </div>

              <div className="serbi-modal-footer-right mt-4">
                <button
                  type="button"
                  className="serbi-btn-outline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="serbi-btn-dark"
                  disabled={saving}
                >
                  {saving ? "Saving..." : isEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="modal-backdrop-lite" onClick={() => setDeleteModal(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="form-container text-center h-auto pb-4">
              <div className="serbi-modal-head">
                <div className="serbi-modal-title text-danger">
                  Delete Severity
                </div>
                <button
                  className="serbi-modal-close"
                  onClick={() => setDeleteModal(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <p className="mt-3">
                Are you sure you want to delete
                <br />
                <strong>"{deleteTarget?.severity}"</strong>?
              </p>

              <div className="serbi-modal-footer-right mt-4 justify-content-center">
                <button
                  className="serbi-btn-outline"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="serbi-btn-danger"
                  disabled={deleting}
                  onClick={confirmDelete}
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Severity;
