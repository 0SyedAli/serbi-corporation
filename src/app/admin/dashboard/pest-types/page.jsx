"use client";

import React, { useMemo, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";


export default function PestTypesManagementMain() {
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        pestName: "",
        category: "",
        propertyType: "",
        areaToBeTreated: "",
        issueSeverity: "",
        areaSqft: "",
        treatmentMethod: "",
        avgCostRange: "",
        notes: "",
    });

    const rows = useMemo(
        () => [
            { id: "p1", pestName: "Termites", category: "Wood Destroying", treatmentMethod: "Chemical Barrier", avgCostRange: "$500-1500" },
            { id: "p2", pestName: "Rodents", category: "Mammals", treatmentMethod: "Trapping & Exclusion", avgCostRange: "$300-800" },
            { id: "p3", pestName: "Bed Bugs", category: "Insects", treatmentMethod: "Heat Treatment", avgCostRange: "$1000-2500" },
            { id: "p4", pestName: "Cockroaches", category: "Insects", treatmentMethod: "Gel Bait", avgCostRange: "$150-400" },
            { id: "p5", pestName: "Ants", category: "Insects", treatmentMethod: "Perimeter Spray", avgCostRange: "$100-300" },
        ],
        []
    );

    const handleChange = (key, val) => {
        setForm((p) => ({ ...p, [key]: val }));
    };

    const resetForm = () => {
        setForm({
            pestName: "",
            category: "",
            propertyType: "",
            areaToBeTreated: "",
            issueSeverity: "",
            areaSqft: "",
            treatmentMethod: "",
            avgCostRange: "",
            notes: "",
        });
    };

    const openAdd = () => {
        resetForm();
        setShowModal(true);
    };

    const save = () => {
        // TODO: call your API here
        console.log("SAVE PEST TYPE:", form);
        setShowModal(false);
    };

    return (
        <div className="serbi-um-page">
            {/* Header row (title + add button) */}
            <div className="d-flex align-items-start justify-content-between gap-3">
                <div className="serbi-um-title">Pest Types Management</div>

                <button type="button" className="serbi-um-add-btn" onClick={openAdd}>
                    <FiPlus size={18} />
                    Add Pest Type
                </button>
            </div>

            {/* Card + Table */}
            <div className="serbi-um-card mt-3">
                <div className="serbi-um-card-head" style={{ marginBottom: 10 }}>
                    <div className="serbi-um-card-head-left">
                        <div className="serbi-um-card-head-title">Registered Pest Types</div>
                    </div>
                </div>

                <div className="serbi-um-table-wrap">
                    <table className="serbi-um-table" >
                        <thead>
                            <tr>
                                <th >Pest Name</th>
                                <th >Category</th>
                                <th >Treatment Method</th>
                                <th >Avg. Cost Range</th>
                                <th >Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((r) => (
                                <tr key={r.id}>
                                    <td className="serbi-um-name">{r.pestName}</td>
                                    <td>{r.category}</td>
                                    <td>{r.treatmentMethod}</td>
                                    <td>{r.avgCostRange}</td>
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
                                        No pest types found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL (same format you use) */}
            {showModal && (
                <div className="modal-backdrop-lite" onClick={() => setShowModal(false)}>
                    <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="form-container">
                            {/* header */}
                            <div className="serbi-modal-head">
                                <div className="serbi-modal-title">Add Pest Type</div>

                                <button className="serbi-modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <IoCloseOutline />
                                </button>
                            </div>

                            {/* form */}
                            <form className="serbi-form-grid">
                                <div className="serbi-form-group">
                                    <label>Pest Name</label>
                                    <input
                                        className="serbi-input"
                                        placeholder="e.g., Termites"
                                        value={form.pestName}
                                        onChange={(e) => handleChange("pestName", e.target.value)}
                                    />
                                </div>

                                <div className="serbi-form-group">
                                    <label>Category</label>
                                    <select className="serbi-select" value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                                        <option value="">Select category</option>
                                        <option value="Insects">Insects</option>
                                        <option value="Mammals">Mammals</option>
                                        <option value="Wood Destroying">Wood Destroying</option>
                                    </select>
                                </div>

                                <div className="serbi-form-group">
                                    <label>Property Type</label>
                                    <select
                                        className="serbi-select"
                                        value={form.propertyType}
                                        onChange={(e) => handleChange("propertyType", e.target.value)}
                                    >
                                        <option value="">Select property type</option>
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                    </select>
                                </div>

                                <div className="serbi-form-group">
                                    <label>Area to be Treated</label>
                                    <input
                                        className="serbi-input"
                                        placeholder="e.g., Interior, Exterior, Both"
                                        value={form.areaToBeTreated}
                                        onChange={(e) => handleChange("areaToBeTreated", e.target.value)}
                                    />
                                </div>

                                <div className="serbi-form-group">
                                    <label>Issue Severity</label>
                                    <select
                                        className="serbi-select"
                                        value={form.issueSeverity}
                                        onChange={(e) => handleChange("issueSeverity", e.target.value)}
                                    >
                                        <option value="">Select severity</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                <div className="serbi-form-group">
                                    <label>Area (Sq ft)</label>
                                    <input
                                        className="serbi-input"
                                        placeholder="e.g., 2000"
                                        value={form.areaSqft}
                                        onChange={(e) => handleChange("areaSqft", e.target.value)}
                                    />
                                </div>

                                <div className="serbi-form-group serbi-form-span-2">
                                    <label>Treatment Method</label>
                                    <input
                                        className="serbi-input"
                                        placeholder="e.g., Chemical Barrier, Heat Treatment"
                                        value={form.treatmentMethod}
                                        onChange={(e) => handleChange("treatmentMethod", e.target.value)}
                                    />
                                </div>

                                <div className="serbi-form-group serbi-form-span-2">
                                    <label>Average Cost Range</label>
                                    <input
                                        className="serbi-input"
                                        placeholder="e.g., $500-1500"
                                        value={form.avgCostRange}
                                        onChange={(e) => handleChange("avgCostRange", e.target.value)}
                                    />
                                </div>

                                <div className="serbi-form-group serbi-form-span-2">
                                    <label>Special Instructions or Notes</label>
                                    <textarea
                                        className="serbi-textarea"
                                        placeholder="Enter any special instructions, precautions, or notes about this pest type."
                                        value={form.notes}
                                        onChange={(e) => handleChange("notes", e.target.value)}
                                    />
                                </div>
                            </form>

                            {/* footer */}
                            <div className="serbi-modal-divider">
                                <div className="serbi-modal-footer-right">
                                    <button type="button" className="serbi-btn-outline" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="serbi-btn-dark" onClick={save}>
                                        Save Pest Type
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}