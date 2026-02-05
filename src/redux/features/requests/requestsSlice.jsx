import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { normalizeStatus, formatStatus } from "./statusMap";

export const fetchRequests = createAsyncThunk(
  "requests/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/getAllRequestForms`
      );
      const json = await res.json();

      if (!json.success) throw new Error(json.msg);

      const requestForms = json.data.requestForms || [];
      const discussionForms = json.data.discussionForms || [];

      return {
        requestForms,
        discussionForms,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { requests } = getState();
      if (requests.loaded) return false;
    },
  }
);

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requestForms: [],
    discussionForms: [],
    loading: false,
    error: null,
    loaded: false,
  },

  reducers: {
    forceReload(state) {
      state.loaded = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;

        state.requestForms = action.payload.requestForms.map((r) => ({
          id: r._id,
          customer: r.userId?.fullName || "User",
          pestType: r.typeOfPest || r.serviceId?.name || "-",
          property: r.propertyType || "-",
          severity: r.severity || "-",
          area: r.areaSqFt
            ? `${r.areaSqFt} sq ft`
            : r.areaTobeTreated || "-",
          date: r.date?.split("T")[0],
          status: formatStatus(r.status),
          raw: r,
        }));

        state.discussionForms = action.payload.discussionForms.map((r) => ({
          id: r._id,
          customer: r.userId?.fullName || "User",
          pestType: r.typeOfPest || "-",
          property: r.propertyType || "-",
          severity: r.severity || "-",
          area: "-",
          date: r.date?.split("T")[0],
          status: formatStatus(r.status),
          raw: r,
        }));

        state.loaded = true;
      })

      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { forceReload } = requestsSlice.actions;
export default requestsSlice.reducer;
