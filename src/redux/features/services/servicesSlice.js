// features/services/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchServicesBySalon = createAsyncThunk(
    "services/fetchBySalon",
    async (salonId, { rejectWithValue }) => {
        try {
            // const adminId = sessionStorage.getItem("adminId");

            if (!salonId) throw new Error("Authentication required");
            const response = await api.get(`/getAllServicesBySalonId?salonId=${salonId}`);
            return response.data.data; // API returns { success, data: [...] }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch services");
        }
    }
);

const servicesSlice = createSlice({
    name: "services",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesBySalon.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchServicesBySalon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload || [];
            })
            .addCase(fetchServicesBySalon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default servicesSlice.reducer;
