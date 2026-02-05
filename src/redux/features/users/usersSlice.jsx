import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* =========================
   ASYNC THUNK
========================= */
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ type, page, limit }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/getAllUsers?type=${type}&page=${page}&limit=${limit}`
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.msg || "Failed to fetch users");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: ({ type, page }, { getState }) => {
      const { users } = getState();

      if (
        users.type === type &&
        users.page === page &&
        users.list.length > 0 &&
        !users.shouldReload
      ) {
        return false;
      }
    },
  }
);

/* =========================
   SLICE
========================= */
const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,

    type: "User",
    page: 1,
    limit: 5,

    total: 0,
    totalPages: 1,

    lastFetchedAt: null,
    ttl: 60 * 1000,
    shouldReload: true,
  },

  reducers: {
    setType(state, action) {
      state.type = action.payload;
      state.page = 1;
      state.shouldReload = true;
    },

    setPage(state, action) {
      state.page = action.payload;
      state.shouldReload = true;
    },

    forceReload(state) {
      state.shouldReload = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        const usersArray = action.payload.data?.data || [];
        const pagination = action.payload.data?.pagination || {};

        state.list = usersArray.map((u) => ({
          id: u._id,
          name: u.fullName || "-",
          email: u.email || "-",
          phone: u.phone || "-",
          address: u.locationName || "-",
          status: u.isDeleted ? "Inactive" : "Active",
        }));

        state.total = pagination.total || usersArray.length;
        state.totalPages = pagination.totalPages || 1;

        state.lastFetchedAt = Date.now();
        state.shouldReload = false;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setType, setPage, forceReload } = usersSlice.actions;
export default usersSlice.reducer;
