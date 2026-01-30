// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchProductsBySalon = createAsyncThunk(
    "products/fetchBySalon",
    async (salonId, { rejectWithValue }) => {
        try {
            // const adminId = sessionStorage.getItem("adminId");

            if (!salonId) throw new Error("Authentication required");
            const response = await api.get(`/getAllProductsBySalonId?salonId=${salonId}`);
            return response.data.data; // API returns { success, data: [...] }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsBySalon.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProductsBySalon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload || [];
            })
            .addCase(fetchProductsBySalon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
