import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatStatus } from "./statusMap";

export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (parentTab = "request", { rejectWithValue }) => {
    try {
      const endpoint =
        parentTab === "discussion"
          ? `${process.env.NEXT_PUBLIC_API_URL}/user/getAllDiscussionForms`
          : `${process.env.NEXT_PUBLIC_API_URL}/user/getAllRequestForms`;

      const res = await fetch(endpoint);
      const json = await res.json();

      if (!json.success) throw new Error(json.msg || "Failed to fetch requests");

      let list = [];
      if (parentTab === "discussion") {
        list = json.data || [];
      } else {
        list = json.data?.requestForms || json.data || [];
      }

      return { parentTab, list };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requestForms: [],
    discussionForms: [],
    loading: false,
    error: null,
    loadedTabs: {
      request: false,
      discussion: false,
    },
  },

  reducers: {
    forceReload(state) {
      state.loadedTabs = { request: false, discussion: false };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        const { parentTab, list } = action.payload;

        const mapped = list.map((r) => ({
          id: r._id,
          customer:
            r.userId?.fullName ||
            r.technicianId?.fullName ||
            "User",
          typeOfPest:
            (typeof r.serviceId === "object" ? r.serviceId?.name : null) ||
            r.typeOfPest ||
            "-",
          property: r.propertyType || "-",
          severity: r.severity || "-",
          area: r.areaSqFt
            ? `${r.areaSqFt} sq ft`
            : r.areaTobeTreated || "-",
          date: r.date
            ? (r.date.includes("T") ? r.date.split("T")[0] : r.date)
            : "-",
          time: r.time || "-",
          status: formatStatus(r.status || "Pending"),
          raw: r,
        }));

        if (parentTab === "discussion") {
          state.discussionForms = mapped;
          state.loadedTabs.discussion = true;
        } else {
          state.requestForms = mapped;
          state.loadedTabs.request = true;
        }
      })

      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { forceReload } = requestsSlice.actions;
export default requestsSlice.reducer;
