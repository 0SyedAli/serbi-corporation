import React from "react";
import { FiUsers, FiClipboard, FiUserCheck } from "react-icons/fi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";

function StatCard({ title, value, subText, tone = "success", icon }) {
  return (
    <div className="serbi-stat-card">
      <div className="serbi-stat-left">
        <div className="serbi-stat-title">{title}</div>
        <div className="d-flex align-items-center justify-content-between py-2">
          <div className="serbi-stat-value">{value}</div>
          <div className="serbi-stat-icon">{icon}</div>
        </div>
        <div className={`serbi-stat-sub ${tone === "success" ? "serbi-sub-success" : "serbi-sub-warning"}`}>
          {subText}
        </div>
      </div>

    </div>
  );
}


export default function DashboardOverviewMain() {
  const requests = [
    { name: "John Smith", code: "SR001", issue: "Termites", status: "New" },
    { name: "Sarah Johnson", code: "SR002", issue: "Rodents", status: "New" },
    { name: "Emily Davis", code: "SR004", issue: "Ants", status: "Assigned" },
  ];

  const techs = [
    { name: "Maria Garcia", jobs: 156, rating: 4.9 },
    { name: "Alex Turner", jobs: 127, rating: 4.8 },
    { name: "James Lee", jobs: 98, rating: 4.7 },
  ];

  return (
    <div className="serbi-page">
      {/* Title */}
      <div className="mb-4">
        <div className="serbi-title">Dashboard Overview</div>
        <div className="serbi-subtitle">Welcome to Serbi admin dashboard</div>
      </div>

      {/* Top stats */}
      <div className="row g-4">
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="Total Customers" value="247" subText="+12% from last month" tone="success" icon={<FiUsers />} />
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="Active Requests" value="18" subText="3 pending assignment" tone="warning" icon={<FiClipboard />} />
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="Active Technicians" value="12" subText="4 available now" tone="success" icon={<FiUserCheck />} />
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <StatCard title="Revenue (MTD)" value="$18,500" subText="+8% from last month" tone="success" icon={<HiOutlineCurrencyDollar />} />
        </div>
      </div>

      {/* Bottom sections */}
      <div className="row g-4 mt-1">
        {/* Recent Service Requests */}
        <div className="col-12 col-lg-6">
          <div className="serbi-big-card">
            <div className="serbi-big-title">Recent Service Requests</div>

            <div className="serbi-list-wrap">
              {requests.map((r) => (
                <div key={r.code} className="serbi-list-item">
                  <div className="serbi-list-left">
                    <div className="serbi-list-name">{r.name}</div>

                    <div className="serbi-list-meta">
                      <span>{r.code}</span>
                      <span className="serbi-dot">-</span>
                      <span>{r.issue}</span>
                    </div>
                  </div>

                  <span className={`serbi-pill ${r.status === "New" ? "serbi-pill-new" : "serbi-pill-assigned"}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Technicians */}
        <div className="col-12 col-lg-6">
          <div className="serbi-big-card">
            <div className="serbi-big-title">Top Performing Technicians</div>

            <div className="serbi-list-wrap">
              {techs.map((t) => (
                <div key={t.name} className="serbi-list-item">
                  <div className="serbi-list-left">
                    <div className="serbi-list-name">{t.name}</div>
                    <div className="serbi-list-meta-muted">{t.jobs} jobs completed</div>
                  </div>

                  <div className="serbi-rating">
                    <FaStar className="serbi-star" />
                    <span className="serbi-rating-text">{t.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
