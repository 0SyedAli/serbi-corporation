import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/redux/features/users/usersSlice";
import requestsReducer from "@/redux/features/requests/requestsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    requests: requestsReducer,

  },
});
