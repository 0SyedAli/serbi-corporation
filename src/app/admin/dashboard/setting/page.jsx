"use client";

import React, { useState } from "react";
import { FiBell, FiLock, FiShield, FiUser } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

export default function SettingsMain() {
    const [emailNoti, setEmailNoti] = useState(true);
    const [smsNoti, setSmsNoti] = useState(false);
    const [pushNoti, setPushNoti] = useState(true);
    const [dailySummary, setDailySummary] = useState(true);

    const [twoFA, setTwoFA] = useState(true);
    const [autoTimeout, setAutoTimeout] = useState(true);
    const [activityLogging, setActivityLogging] = useState(true);

    const roles = [
        {
            role: "Super Admin",
            users: 2,
            permissions: ["All Access"],
        },
        {
            role: "Admin",
            users: 5,
            permissions: ["User Management", "Service Requests", "Reports"],
        },
        {
            role: "Technician",
            users: 12,
            permissions: ["View Jobs", "Update Status", "Customer Contact"],
        },
        {
            role: "Customer Support",
            users: 8,
            permissions: ["View Requests", "Customer Management", "Support Tickets"],
        },
    ];

    return (
        <div className="serbi-um-page">
            {/* If you already have page title above, remove this */}
            {/* <div className="serbi-um-title">Settings</div> */}

            {/* Top cards */}
            <div className="serbi-set-grid">
                {/* Notifications */}
                <div className="serbi-um-card">
                    <div className="serbi-card-head-row">
                        <FiBell className="serbi-card-head-icon" />
                        <div className="serbi-card-head-title">Notifications</div>
                    </div>
                    <div className="serbi-card-head-sub">Manage your notification preferences</div>

                    <div className="serbi-toggle-row">
                        <div className="serbi-toggle-left">
                            <div className="serbi-toggle-label">Email Notifications</div>
                            <div className="serbi-toggle-desc">Receive email updates for new requests</div>
                        </div>
                        <label className="serbi-switch">
                            <input type="checkbox" checked={emailNoti} onChange={(e) => setEmailNoti(e.target.checked)} />
                            <span className="serbi-slider" />
                        </label>
                    </div>

                    <div className="serbi-toggle-row">
                        <div className="serbi-toggle-left">
                            <div className="serbi-toggle-label">SMS Notifications</div>
                            <div className="serbi-toggle-desc">Get text alerts for urgent matters</div>
                        </div>
                        <label className="serbi-switch">
                            <input type="checkbox" checked={smsNoti} onChange={(e) => setSmsNoti(e.target.checked)} />
                            <span className="serbi-slider" />
                        </label>
                    </div>

                    <div className="serbi-toggle-row">
                        <div className="serbi-toggle-left">
                            <div className="serbi-toggle-label">Push Notifications</div>
                            <div className="serbi-toggle-desc">Browser notifications for updates</div>
                        </div>
                        <label className="serbi-switch">
                            <input type="checkbox" checked={pushNoti} onChange={(e) => setPushNoti(e.target.checked)} />
                            <span className="serbi-slider" />
                        </label>
                    </div>

                    <div className="serbi-toggle-row">
                        <div className="serbi-toggle-left">
                            <div className="serbi-toggle-label">Daily Summary</div>
                            <div className="serbi-toggle-desc">Receive daily activity summary</div>
                        </div>
                        <label className="serbi-switch">
                            <input type="checkbox" checked={dailySummary} onChange={(e) => setDailySummary(e.target.checked)} />
                            <span className="serbi-slider" />
                        </label>
                    </div>
                </div>

                {/* Security */}
                <div className="serbi-um-card">
                    <div className="serbi-card-head-row">
                        <FiLock className="serbi-card-head-icon" />
                        <div className="serbi-card-head-title">Security</div>
                    </div>
                    <div className="serbi-card-head-sub">Security and privacy settings</div>

                    <div className="serbi-toggle-row">
                        <div className="serbi-toggle-left">
                            <div className="serbi-toggle-label">Two-Factor Authentication</div>
                            <div className="serbi-toggle-desc">Add extra security to your account</div>
                        </div>
                        <label className="serbi-switch">
                            <input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} />
                            <span className="serbi-slider" />
                        </label>
                    </div>

                    <div className="serbi-toggle-row">
                        <div className="serbi-toggle-left">
                            <div className="serbi-toggle-label">Auto Session Timeout</div>
                            <div className="serbi-toggle-desc">Logout after 30 minutes of inactivity</div>
                        </div>
                        <label className="serbi-switch">
                            <input type="checkbox" checked={autoTimeout} onChange={(e) => setAutoTimeout(e.target.checked)} />
                            <span className="serbi-slider" />
                        </label>
                    </div>

                    <div className="serbi-toggle-row">
                        <div className="serbi-toggle-left">
                            <div className="serbi-toggle-label">Activity Logging</div>
                            <div className="serbi-toggle-desc">Track all user activities</div>
                        </div>
                        <label className="serbi-switch">
                            <input type="checkbox" checked={activityLogging} onChange={(e) => setActivityLogging(e.target.checked)} />
                            <span className="serbi-slider" />
                        </label>
                    </div>

                    <div className="mt-3">
                        <button className="serbi-btn-wide-outline" type="button">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Roles table */}
            <div className="serbi-um-card mt-4">
                <div className="serbi-card-head-row">
                    <FiShield className="serbi-card-head-icon" />
                    <div className="serbi-card-head-title">Roles &amp; Permissions</div>
                </div>
                <div className="serbi-card-head-sub">Manage user roles and their access levels</div>

                <div className="serbi-um-table-wrap">
                    <table className="serbi-um-table" >
                        <thead>
                            <tr>
                                <th >Role</th>
                                <th >Users</th>
                                <th >Permissions</th>
                                <th >Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {roles.map((r) => (
                                <tr key={r.role}>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <FiUser />
                                            <span className="serbi-um-name">{r.role}</span>
                                        </div>
                                    </td>
                                    <td>

                                        <div style={{ color: "#7a7f8a" }}>{r.users} users</div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-2">
                                            {r.permissions.map((p) => (
                                                <span key={p} className="serbi-tech-tag">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" className="btn serbi-um-action-edit" >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
