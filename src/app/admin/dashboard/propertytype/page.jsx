"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL;

const PropertyType = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    propertyTypeId: null,
    propertyType: "",
  });

  /* =========================
     FETCH PROPERTY TYPES
  ========================== */
  // const getCategories2 = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${API}/admin/getAllPropertyTypes`);
  //     if (res.data?.success) {
  //       setCategories(res.data.data);
  //     } else {
  //       // throw new Error(res.data?.msg);
  //       // Handle NO DATA case safely
  //       if (res.data?.msg === "No Property Types Found!") {
  //         toast.info("No properties found");
  //         return;
  //       } else {
  //         toast.error(res.data?.msg || "Failed to load severities");
  //       }
  //     }
  //   } catch (err) {
  //     toast.error(err.message || "Failed to load property types");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getCategories2 = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${API}/admin/getAllPropertyTypes`);

  //     if (res.data?.success) {
  //       setCategories(res.data.data);
  //     } else {
  //       if (
  //         res.data?.msg === "No Property Types Found!" &&
  //         !toastShown.current
  //       ) {
  //         toast.info("No properties found");
  //         toastShown.current = true;
  //         return;
  //       } else {
  //         toast.error(res.data?.msg || "Failed to load severities");
  //       }
  //     }
  //   } catch (err) {
  //     toast.error(err.message || "Failed to load property types");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getCategories2 = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/admin/getAllPropertyTypes`);
      if (res.data?.success) {
        setCategories(res.data.data);
      } else {
        throw new Error(res.data?.msg);
      }
    } catch (err) {
      console.error(err.message || "Failed to load property types");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getCategories2();
  }, []);

  /* =========================
     SAVE PROPERTY TYPE
  ========================== */
  const saveCategory = async () => {
    if (!form.propertyType.trim()) {
      toast.error("Property type name is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        propertyType: form.propertyType,
      };

      if (isEdit) {
        payload.propertyTypeId = form.propertyTypeId;
      }

      const url = isEdit
        ? `${API}/admin/updatePropertyType`
        : `${API}/admin/addPropertyType`;

      const res = await axios.post(url, payload);

      if (res.data?.success) {
        toast.success(res.data.msg);
        closeModal();
        getCategories2();
      } else {
        throw new Error(res.data?.msg);
      }
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     DELETE PROPERTY TYPE
  ========================== */
  const confirmDelete = async () => {
    if (!deleteTarget?._id) return;

    setDeleting(true);
    try {
      const res = await axios.post(`${API}/admin/deletePropertyType`, {
        propertyTypeId: deleteTarget._id,
      });

      if (res.data?.success) {
        toast.success("Property type deleted successfully");
        getCategories2();
      } else {
        throw new Error(res.data?.msg);
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
    setForm({ propertyTypeId: null, propertyType: "" });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setIsEdit(true);
    setForm({
      propertyTypeId: cat._id,
      propertyType: cat.propertyType,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ propertyTypeId: null, propertyType: "" });
  };

  /* =========================
     RENDER
  ========================== */
  return (
    <>
      <div className="serbi-um-page">
        <div className="d-flex justify-content-between align-items-center">
          <div className="serbi-um-title">All Property Types</div>
          <button className="serbi-um-add-btn" onClick={openAdd}>
            <FiPlus size={18} /> Add Property Type
          </button>
        </div>

        {loading && <p className="mt-3">Loading...</p>}

        {!loading && categories.length === 0 && (
          <p className="mt-3">No property types found.</p>
        )}

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-3">
          {categories.map((cat) => (
            <div className="col" key={cat._id}>
              <div className="category-card text-center">
                <img
                  src="/images/property-icon.png"
                  className="category-image"
                  alt={cat.propertyType}
                />

                <h4 className="category-title">{cat.propertyType}</h4>

                <div className="category-actions">
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => openEdit(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      setDeleteTarget(cat);
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
                saveCategory();
              }}
            >
              <div className="serbi-modal-head">
                <div className="serbi-modal-title">
                  {isEdit ? "Update Property Type" : "Add Property Type"}
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
                <label>Property Type Name</label>
                <input
                  className="serbi-input"
                  placeholder="e.g. Apartment"
                  value={form.propertyType}
                  onChange={(e) =>
                    setForm({ ...form, propertyType: e.target.value })
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

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && (
        <div className="modal-backdrop-lite" onClick={() => setDeleteModal(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="form-container text-center h-auto pb-4">
              <div className="serbi-modal-head">
                <div className="serbi-modal-title text-danger">
                  Delete Property Type
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
                <strong>"{deleteTarget?.propertyType}"</strong>?
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

export default PropertyType;
