// src/redux/features/revenue/revenueSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salonId: null,
  totalCustomers: 0,
  totalBookings: 0,
  total10MonthRevenue: 0,
  data: [],
};

const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {
    setRevenueData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearRevenueData: () => initialState,
  },
});

export const { setRevenueData, clearRevenueData } = revenueSlice.actions;
export default revenueSlice.reducer;
