"use client";

import React from "react";
import {
  FiMessageSquare,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/* ---------- Mini Stat Card ---------- */
function StatCardMini({ title, value, icon }) {
  return (
    <div className="serbi-stat-card">
      <div className="serbi-stat-left">
        <div className="serbi-stat-title">{title}</div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="serbi-stat-value">{value}</div>
          <div className="serbi-stat-icon">{icon}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function ReportsAnalytics() {
  const stats = {
    avgRating: "4.6 / 5.0",
    totalReviews: 5,
    positive: 5,
    negative: 0,
  };

  const revenueData = [
    { month: "Jul", revenue: 12500 },
    { month: "Aug", revenue: 14800 },
    { month: "Sep", revenue: 13200 },
    { month: "Oct", revenue: 17000 },
    { month: "Nov", revenue: 15500 },
    { month: "Dec", revenue: 17500 },
    { month: "Jan", revenue: 19000 },
  ];

  const feedback = [
    {
      name: "John Smith",
      technician: "Alex Turner",
      rating: 5,
      date: "2026-01-17",
      comment: "Excellent service! Very professional and thorough.",
    },
    {
      name: "Sarah Johnson",
      technician: "Maria Garcia",
      rating: 5,
      date: "2026-01-16",
      comment: "Quick response and solved the problem completely.",
    },
  ];

  return (
    <div className="serbi-um-page">
      <div className="serbi-um-title mb-3">Reports & Analytics</div>

      {/* ---------- Stats ---------- */}
      <div className="row g-4">
        <div className="col-xl-3 col-md-6">
          <StatCardMini
            title="Avg. Rating"
            value={stats.avgRating}
            icon={<AiFillStar className="text-warning" />}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCardMini
            title="Total Reviews"
            value={stats.totalReviews}
            icon={<FiMessageSquare className="text-primary" />}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCardMini
            title="Positive"
            value={stats.positive}
            icon={<FiThumbsUp className="text-success" />}
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCardMini
            title="Negative"
            value={stats.negative}
            icon={<FiThumbsDown className="text-danger" />}
          />
        </div>
      </div>

      {/* ---------- Revenue Chart ---------- */}
      <div className="serbi-um-card mt-4">
        <h5 className="serbi-um-card-head-title" style={{marginBottom: "30px"}}>Monthly Revenue</h5>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8B87D9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------- Customer Feedback ---------- */}
      <div className="serbi-um-card mt-4">
        <h5 className="serbi-um-card-head-title mb-3">Customer Feedback</h5>

        {feedback.map((f, i) => (
          <div key={i} className="serbi-feedback-card mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{f.name}</strong>
                <div className="text-muted small">
                  Technician: {f.technician}
                </div>
              </div>
              <div className="text-end">
                <div className="text-warning">
                  {"★".repeat(f.rating)}
                </div>
                <div className="small text-muted">{f.date}</div>
              </div>
            </div>

            <p className="mt-2 mb-0">{f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
