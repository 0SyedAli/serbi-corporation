// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "@/redux/features/auth/authSlice";
import appointmentsReducer from "@/redux/features/appointments/appointmentsSlice";
import productsReducer from "@/redux/features/products/productsSlice";
import servicesReducer from "@/redux/features/services/servicesSlice";
import categoryReducer from "@/redux/features/category/categorySlice";
import revenueReducer from "@/redux/features/revenue/revenueSlice";

// Combine reducers (in case you have more later)
const rootReducer = combineReducers({
  auth: authReducer,
  appointments: appointmentsReducer,
  products: productsReducer,
  services: servicesReducer,
  category: categoryReducer,
    revenue: revenueReducer,

});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "revenue"], // Only persist auth slice
};

// Wrap reducer with persist capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);