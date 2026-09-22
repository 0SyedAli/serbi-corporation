// Parent tabs
export const PARENT_TABS = {
  REQUEST: "request",
  DISCUSSION: "discussion",
};

// Child tabs per parent
export const STATUS_TABS = {
  request: [
    "All",
    "Pending",
    "On The Way",
    "Arrived",
    "Discussing",
    "Confirm",
    "Rejected",
  ],
  discussion: [
    "All",
    "Start",
    "Stop",
    "Completed",
  ],
};

// Normalize backend status → UI status
export function normalizeStatus(status = "") {
  return status.trim().toLowerCase();
}

// Capitalize helper
export function formatStatus(status = "") {
  return status
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
