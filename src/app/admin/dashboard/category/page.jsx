"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { FaPencil } from "react-icons/fa6";

const API = process.env.NEXT_PUBLIC_API_URL;
const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

const PestTypeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    categoryId: null,
    pestName: "",
    image: null,
    existingImage: null,
  });

  /* =========================
     FETCH CATEGORIES
  ========================== */
  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/admin/getAllCategories`);
      if (res.data?.success) {
        setCategories(res.data.data);
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
    getCategories();
  }, []);

  /* =========================
     SAVE CATEGORY
  ========================== */
  const saveCategory = async () => {
    if (!form.pestName.trim()) {
      toast.error("Category name is required");
      return;
    }
    setLoading2(true)
    try {
      const formData = new FormData();
      formData.append("pestName", form.pestName);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (isEdit) {
        formData.append("categoryId", form.categoryId);
      }

      const url = isEdit
        ? `${API}/admin/updateCategory`
        : `${API}/admin/addCategory`;

      const res = await axios.post(url, formData);

      if (res.data?.success) {
        toast.success(res.data.msg);
        closeModal();
        getCategories();
      } else {
        throw new Error(res.data?.msg);
      }
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setLoading2(false)
    }
  };

  /* =========================
     DELETE
  ========================== */
  // const deleteCategory = async (id) => {
  //   try {
  //     const res = await axios.post(`${API}/admin/deleteCategory`, {
  //       categoryId: id,
  //     });

  //     if (res.data?.success) {
  //       toast.success("Category deleted");
  //       getCategories();
  //     } else {
  //       throw new Error(res.data?.msg);
  //     }
  //   } catch (err) {
  //     toast.error(err.message || "Delete failed");
  //   }
  // };
  const confirmDelete = async () => {
    if (!deleteTarget?._id) return;
    setLoading3(true)
    try {
      const res = await axios.post(`${API}/admin/deleteCategory`, {
        categoryId: deleteTarget._id,
      });

      if (res.data?.success) {
        toast.success("Category deleted successfully");
        getCategories();
      } else {
        throw new Error(res.data?.msg);
      }
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setDeleteModal(false);
      setDeleteTarget(null);
      setLoading3(false)
    }
  };

  /* =========================
     HELPERS
  ========================== */
  const openAdd = () => {
    setIsEdit(false);
    setForm({
      categoryId: null,
      pestName: "",
      image: null,
      existingImage: null,
    });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setIsEdit(true);
    setForm({
      categoryId: cat._id,
      pestName: cat.pestName,
      image: null,
      existingImage: cat.image,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({
      categoryId: null,
      pestName: "",
      image: null,
      existingImage: null,
    });
  };

  /* =========================
     IMAGE PREVIEW
  ========================== */
  const imagePreview = form.image
    ? URL.createObjectURL(form.image)
    : form.existingImage
      ? `${IMG_URL}/${form.existingImage}`
      : null;

  return (

    <>
      <div className="serbi-um-page">
        <div className="d-flex justify-content-between align-items-center">
          <div className="serbi-um-title mb-0">All Categories</div>
          <button className="serbi-um-add-btn" onClick={openAdd}>
            <FiPlus size={18} /> Add Category
          </button>
        </div>

        {/* {loading && <p>Loading...</p>} */}

        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-3">
          {
            loading ? <p>Loading...</p> :
              categories.map((cat) => (
                <div className="col" key={cat._id}>
                  <div className="category-card">
                    <img
                      src={`${IMG_URL}/${cat.image}`}
                      className="category-image"
                      alt={cat.pestName}
                    />

                    <h4 className="category-title">{cat.pestName}</h4>

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
                      {/* <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteCategory(cat._id)}
                      >
                        Delete
                      </button> */}
                    </div>
                  </div>
                </div>
              ))
          }
          {!loading && categories.length === 0 && <p>No categories found.</p>}

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop-lite" onClick={closeModal}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={(e) => {
              e.preventDefault();
              saveCategory();
            }} className="form-container h-auto">
              <div className="serbi-modal-head mb-4">
                <div className="serbi-modal-title">
                  {isEdit ? "Update Category" : "Add Category"}
                </div>
                <button className="serbi-modal-close" onClick={closeModal}>
                  <IoCloseOutline />
                </button>
              </div>

              <div
                className="upload-box"
                onClick={() => document.getElementById("imageInput").click()}
              >
                {/* {imagePreview ? (
                  <img src={imagePreview} className="upload-preview" />
                ) */}
                {imagePreview ? (
                  <div className="upload-preview-wrapper">
                    <img src={imagePreview} alt="preview" className="upload-preview" />

                    {/* EDIT ICON */}
                    <button
                      type="button"
                      className="upload-edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("imageInput").click();
                      }}
                    >
                      <FaPencil />
                    </button>
                  </div>
                )
                  : (
                    <div className="text-center">
                      <RiUploadCloud2Line size={36} />
                      <p>Upload Image</p>
                    </div>
                  )}
                <input
                  id="imageInput"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.files[0] })
                  }
                />
              </div>

              <div className="serbi-form-group mt-3">
                <label>Category Name</label>
                <input
                  className="serbi-input"
                  value={form.pestName}
                  onChange={(e) =>
                    setForm({ ...form, pestName: e.target.value })
                  }
                />
              </div>

              <div className="serbi-modal-footer-right mt-4">
                <button className="serbi-btn-outline" onClick={closeModal}>
                  Cancel
                </button>
                {/* <button className="serbi-btn-dark" disabled={loading2} onClick={saveCategory}>
                  {isEdit ? "Update" : "Create"}
                </button> */}
                <button
                  type="submit"
                  className="serbi-btn-dark"
                  disabled={loading2}
                // onClick={saveCategory}
                >
                  {loading2 ? "loading..." : isEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="modal-backdrop-lite" onClick={() => setDeleteModal(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="form-container h-auto pb-4 text-center">
              <div className="serbi-modal-head">
                <div className="serbi-modal-title text-danger text-center">
                  {/* Delete Category */}
                </div>
                <button
                  className="serbi-modal-close"
                  onClick={() => setDeleteModal(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>
              <div className="serbi-modal-title fs-3 mb-4 text-danger text-center">
                Delete Category
              </div>
              <p className="mt-3">
                Are you sure you want to delete
                <strong> "{deleteTarget?.pestName}" </strong> category?
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
                  disabled={loading3}
                  onClick={confirmDelete}
                >
                  {loading3 ? "loading..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default PestTypeCategory;
