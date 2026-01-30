"use client";

import React, { useMemo } from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { LuClock3 } from "react-icons/lu";

function StatCardMini({
    title,
    value,
    icon,
    iconClassName = "",
}) {
    return (
        <div className="serbi-stat-card" >
            <div className="serbi-stat-title">{title}</div>
            <div className="serbi-stat-left d-flex align-items-center justify-content-between">
                <div className="serbi-stat-value" >
                    {value}
                </div>
                <div className={`serbi-stat-icon ${iconClassName}`}>{icon}</div>
            </div>

            {/* let bootstrap color override your icon base */}
        </div>
    );
}



export default function PaymentsBillingMain() {
    const rows = [
        { paymentId: "PAY001", customer: "John Smith", requestId: "SR006", amount: "$450", method: "Credit Card", date: "2026-01-17", status: "Completed" },
        { paymentId: "PAY002", customer: "Robert Taylor", requestId: "SR007", amount: "$250", method: "Cash", date: "2026-01-16", status: "Completed" },
        { paymentId: "PAY003", customer: "Emily Davis", requestId: "SR004", amount: "$180", method: "Debit Card", date: "2026-01-15", status: "Completed" },
        { paymentId: "PAY004", customer: "Lisa Anderson", requestId: "SR006", amount: "$320", method: "Bank Transfer", date: "2026-01-14", status: "Completed" },
        { paymentId: "PAY005", customer: "Sarah Johnson", requestId: "SR002", amount: "$680", method: "Credit Card", date: "2026-01-13", status: "Pending" },
        { paymentId: "PAY006", customer: "David Wilson", requestId: "SR005", amount: "$520", method: "Cash", date: "2026-01-12", status: "Completed" },
    ];

    const stats = useMemo(() => {
        const totalRevenue = rows.reduce((acc, r) => acc + Number(r.amount.replace("$", "")), 0);
        const completed = rows.filter((r) => r.status === "Completed").length;
        const pending = rows.filter((r) => r.status === "Pending").length;

        // demo: "This Month" as sum of latest 4 rows
        const thisMonth = rows.slice(0, 4).reduce((acc, r) => acc + Number(r.amount.replace("$", "")), 0);

        const fmt = (n) => `$${n.toLocaleString()}`;
        return {
            totalRevenue: fmt(totalRevenue),
            thisMonth: fmt(thisMonth),
            completed: completed,
            pending: pending,
        };
    }, [rows]);

    return (
        <div className="serbi-um-page">
            <div className="serbi-um-title">Payments &amp; Billing</div>

            {/* Top Cards (reuse dashboard stat card) */}
            <div className="row g-4">
                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Total Revenue" value={stats.totalRevenue} icon={<HiOutlineCurrencyDollar />} iconClassName="text-success" />
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="This Month" value={stats.thisMonth} icon={<FiTrendingUp />} iconClassName="text-primary" />
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Completed" value={stats.completed} icon={<HiOutlineCreditCard />} iconClassName="text-purple" />
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <StatCardMini title="Pending" value={stats.pending} icon={<LuClock3 />} iconClassName="text-warning" />
                </div>
            </div>

            {/* Table Card (reuse user management table styles) */}
            <div className="serbi-um-card mt-4">
                <div className="serbi-um-card-head" >
                    <div className="serbi-um-card-head-left">
                        <div className="serbi-um-card-head-title">Payment History</div>
                    </div>
                </div>

                <div className="serbi-um-table-wrap">
                    <table className="serbi-um-table" >
                        <thead>
                            <tr>
                                <th style={{ width: "14%" }}>Payment ID</th>
                                <th style={{ width: "18%" }}>Customer</th>
                                <th style={{ width: "14%" }}>Request ID</th>
                                <th style={{ width: "12%" }}>Amount</th>
                                <th style={{ width: "18%" }}>Method</th>
                                <th style={{ width: "14%" }}>Date</th>
                                <th style={{ width: "10%" }}>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((r) => (
                                <tr key={r.paymentId}>
                                    <td className="serbi-um-name">{r.paymentId}</td>
                                    <td>{r.customer}</td>
                                    <td>{r.requestId}</td>
                                    <td>{r.amount}</td>
                                    <td>{r.method}</td>
                                    <td>{r.date}</td>
                                    <td>
                                        {/* reuse existing pill styling: active = dark, inactive = light */}
                                        <span className={`serbi-um-status ${r.status === "Completed" ? "active" : "inactive"}`}>
                                            {r.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ padding: "22px 12px", color: "#7a7f8a", fontWeight: 700 }}>
                                        No payments found.
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