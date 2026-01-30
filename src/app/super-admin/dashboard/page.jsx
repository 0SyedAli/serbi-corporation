"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiMoreVertical,
} from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";

/* =========================
   Helper: Get token safely
========================= */
const getToken = () => {
    if (typeof window === "undefined") return null;
    const userRaw = localStorage.getItem("user");
    if (!userRaw) return null;

    try {
        const user = JSON.parse(userRaw);
        return user?.token || null;
    } catch {
        return null;
    }
};

export default function UserManagementPage() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);

    /* =========================
       GET ALL ADMINS
    ========================= */
    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const token = getToken();
            if (!token) return;

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/getAllAdmins`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.success) {
                setAdmins(res.data.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch admins");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    /* =========================
       CREATE ADMIN
    ========================= */
    // const handleCreateAdmin = async (e) => {
    //     e.preventDefault();

    //     const form = e.target;
    //     const payload = {
    //         fullName: form.fullName.value,
    //         email: form.email.value,
    //         password: form.password.value,
    //         phoneNumber: form.phoneNumber.value,
    //         schoolName: form.schoolName.value,
    //         schoolEmail: form.schoolEmail.value,
    //         schoolPhone: form.schoolPhone.value,
    //         address: form.address.value,
    //         city: form.city.value,
    //         state: form.state.value,
    //         zipCode: form.zipCode.value,
    //         principalName: form.principalName.value,
    //         grades: form.grades.value.split(",").map((g) => g.trim()),
    //         establishedYear: Number(form.establishedYear.value),
    //     };

    //     try {
    //         const token = getToken();
    //         if (!token) return;

    //         const res = await axios.post(
    //             `${process.env.NEXT_PUBLIC_API_URL}/createAdmin`,
    //             payload,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         if (res.data?.success) {
    //             setShowModal(false);
    //             fetchAdmins();
    //         }
    //     } catch (err) {
    //         console.error("Create admin failed");
    //     }
    // };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const form = e.target;
            const payload = {
                fullName: form.fullName.value,
                email: form.email.value,
                password: form.password.value,
                phoneNumber: form.phoneNumber.value,
                schoolName: form.schoolName.value,
                schoolEmail: form.schoolEmail.value,
                schoolPhone: form.schoolPhone.value,
                address: form.address.value,
                city: form.city.value,
                state: form.state.value,
                zipCode: form.zipCode.value,
                principalName: form.principalName.value,
                grades: form.grades.value.split(",").map(g => g.trim()),
                establishedYear: Number(form.establishedYear.value),
            };

            const token = getToken();
            if (!token) return;

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/createAdmin`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data?.success) {
                setShowModal(false);
                fetchAdmins();
            }
        } catch (err) {
            console.error("Create admin failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    /* =========================
       UPDATE ADMIN
    ========================= */
    // const handleUpdateAdmin = async (e) => {
    //     e.preventDefault();

    //     const form = e.target;
    //     const payload = {
    //         id: editingAdmin._id,
    //         phoneNumber: form.phoneNumber.value,
    //         principalName: form.principalName.value,
    //     };

    //     try {
    //         const token = getToken();
    //         if (!token) return;

    //         await axios.put(
    //             `${process.env.NEXT_PUBLIC_API_URL}/updateAdmin`,
    //             payload,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         setShowModal(false);
    //         setEditingAdmin(null);
    //         fetchAdmins();
    //     } catch (err) {
    //         console.error("Update admin failed");
    //     }
    // };

    const handleUpdateAdmin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const form = e.target;
            const payload = {
                id: editingAdmin._id,
                phoneNumber: form.phoneNumber.value,
                principalName: form.principalName.value,
                schoolName: form.schoolName.value,
                schoolEmail: form.schoolEmail.value,
                schoolPhone: form.schoolPhone.value,
                address: form.address.value,
                city: form.city.value,
                state: form.state.value,
                zipCode: form.zipCode.value,
                grades: form.grades.value.split(",").map(g => g.trim()),
                establishedYear: Number(form.establishedYear.value),
            };

            const token = getToken();
            if (!token) return;

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/updateAdmin`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setShowModal(false);
            setEditingAdmin(null);
            fetchAdmins();
        } catch (err) {
            console.error("Update admin failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    /* =========================
       DELETE ADMIN
    ========================= */
    const handleDeleteAdmin = async (adminId) => {
        if (!confirm("Are you sure you want to delete this admin?")) return;

        try {
            const token = getToken();
            if (!token) return;

            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/deleteAdmin`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { id: adminId }, // ⚠️ DELETE body
                }
            );

            fetchAdmins();
        } catch (err) {
            console.error("Delete admin failed");
        }
    };

    /* =========================
       UI
    ========================= */
    return (
        <section className="sos-admin-users">
            {/* HEADER */}
            <div className="breadcrumb text-black mb-1  align-items-center gap-1">
                <GoHomeFill /> <span>/</span> Admin Management
            </div>

            <h2 className="page-title text-black">Admin Management</h2>

            {/* FILTER BAR */}
            <div className="filter-bar">
                <div className="search-input">
                    <FiSearch />
                    <input placeholder="Search admin by name or email..." />
                </div>

                <button
                    className="btn primary"
                    onClick={() => {
                        setEditingAdmin(null);
                        setShowModal(true);
                    }}
                >
                    + Add Admin
                </button>
            </div>

            <small className="count-text">
                Showing {admins.length} admins
            </small>

            {/* TABLE */}
            <div className="table-box">
                <table className="sos-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.map((a) => (
                            <tr key={a._id}>
                                <td className="user-cell">
                                    <span className="avatar">
                                        {a.fullName.charAt(0)}
                                    </span>
                                    {a.fullName}
                                </td>

                                <td>{a.email}</td>

                                <td>
                                    <span className="role admin">{a.role}</span>
                                </td>

                                <td>
                                    <span
                                        className={`status ${a.isActive ? "active" : "inactive"
                                            }`}
                                    >
                                        {a.isActive ? "active" : "inactive"}
                                    </span>
                                </td>

                                <td>
                                    {new Date(a.createdAt).toLocaleDateString()}
                                </td>

                                <td className="actions">
                                    <FiEdit2
                                        onClick={() => {
                                            setEditingAdmin(a);
                                            setShowModal(true);
                                        }}
                                    />
                                    <FiTrash2
                                        className="danger"
                                        onClick={() => handleDeleteAdmin(a._id)}
                                    />
                                    {/* <FiMoreVertical /> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CREATE / UPDATE MODAL */}
            {showModal && (
                <div
                    className="modal-backdrop-lite"
                    onClick={() => {
                        setShowModal(false);
                        setEditingAdmin(null);
                    }}
                >
                    <div
                        className="modal-sheet modal-sheet2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="form-container">
                            <h5 className="mb-3">
                                {editingAdmin ? "Edit Admin" : "Add Admin"}
                            </h5>

                            <form onSubmit={editingAdmin ? handleUpdateAdmin : handleCreateAdmin}>

                                {/* ===== CREATE-ONLY FIELDS ===== */}
                                {!editingAdmin && (
                                    <>
                                        <div className="mb-3">
                                            <label className="auth-label">Full Name</label>
                                            <input name="fullName" className="form-control auth-input" required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="auth-label">Email</label>
                                            <input name="email" className="form-control auth-input" required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="auth-label">Password</label>
                                            <input name="password" type="password" className="form-control auth-input" required />
                                        </div>
                                    </>
                                )}

                                {/* ===== SHARED FIELDS (CREATE + EDIT) ===== */}
                                <div className="mb-3">
                                    <label className="auth-label">Phone Number</label>
                                    <input
                                        name="phoneNumber"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.phoneNumber || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">School Name</label>
                                    <input
                                        name="schoolName"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.schoolName || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">School Email</label>
                                    <input
                                        name="schoolEmail"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.schoolEmail || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">School Phone</label>
                                    <input
                                        name="schoolPhone"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.schoolPhone || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">Principal Name</label>
                                    <input
                                        name="principalName"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.principalName || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">Address</label>
                                    <input
                                        name="address"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.address || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">City</label>
                                    <input
                                        name="city"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.city || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">State</label>
                                    <input
                                        name="state"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.state || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">Zip Code</label>
                                    <input
                                        name="zipCode"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.zipCode || ""}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="auth-label">Grades (comma separated)</label>
                                    <input
                                        name="grades"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.grades?.join(", ") || ""}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="auth-label">Established Year</label>
                                    <input
                                        name="establishedYear"
                                        className="form-control auth-input"
                                        defaultValue={editingAdmin?.establishedYear || ""}
                                    />
                                </div>

                                {/* ===== ACTION BUTTONS ===== */}
                                {/* <div className="d-flex justify-content-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary px-3"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingAdmin(null);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button className="btn auth-primary-btn px-4" type="submit">
                                    {editingAdmin ? "Update" : "Create"}
                                </button>
                            </div> */}

                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-3"
                                        disabled={isSubmitting}
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingAdmin(null);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn auth-primary-btn px-4"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? editingAdmin
                                                ? "Updating..."
                                                : "Creating..."
                                            : editingAdmin
                                                ? "Update"
                                                : "Create"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
