import { showSuccessToast } from "@/lib/toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE = process.env.NEXT_PUBLIC_API_URL;

const getAdminId = () => {
  const admin = localStorage.getItem("admin");
  if (!admin) throw new Error("Admin not authenticated");

  const parsed = JSON.parse(admin);
  if (!parsed?._id) throw new Error("Invalid admin session");

  return parsed._id;
};

/* VERIFY TECHNICIAN */
export const verifyTechnician = createAsyncThunk(
  "admin/verifyTechnician",
  async (userId, { rejectWithValue }) => {
    try {
      const adminId = getAdminId();

      const res = await fetch(`${BASE}/admin/verifyTechnician`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, userId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.msg || "Verify failed");
      showSuccessToast("Technician Verified Successfully!")
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* SUSPEND USER */
// Example: Modify the suspendUser action
export const suspendUser = createAsyncThunk(
  "admin/suspendUser",
  async ({ userId, durationValue, durationUnits, reason }, { rejectWithValue, dispatch }) => {
    try {
      const adminId = getAdminId();

      const res = await fetch(`${BASE}/admin/suspendUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminId,
          userId,
          durationValue,
          durationUnits,
          suspensionReason: reason,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.msg || "Suspend failed");

      // Show success toast
      dispatch(showSuccessToast("User suspended successfully"));
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* UNSUSPEND USER */
export const unsuspendUser = createAsyncThunk(
  "admin/unsuspendUser",
  async (userId, { rejectWithValue }) => {
    try {
      const adminId = getAdminId();

      const res = await fetch(`${BASE}/admin/unsuspendUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, userId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.msg || "Unsuspend failed");

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* BLOCK USER */
export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const adminId = getAdminId();

      const res = await fetch(`${BASE}/admin/blockUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, userId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.msg || "Block failed");

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* UNBLOCK USER */
export const unblockUser = createAsyncThunk(
  "admin/unblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const adminId = getAdminId();

      const res = await fetch(`${BASE}/admin/unblockUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, userId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.msg || "Unblock failed");

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);