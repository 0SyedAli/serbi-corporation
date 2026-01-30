import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

// ✅ Fetch all appointments for a vendor/admin
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const adminId = sessionStorage.getItem("adminId");

      if (!token || !adminId) throw new Error("Authentication required");

      const response = await api.get(`/getBookingsBySalonId?salonId=${"68ee7ede382fb808717dff8d"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // should contain appointments array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch appointments"
      );
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload?.data || []; // ensure it’s an array
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;
