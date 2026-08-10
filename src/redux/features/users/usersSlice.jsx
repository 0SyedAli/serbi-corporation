import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  verifyTechnician,
  suspendUser,
  unsuspendUser,
  blockUser,
  unblockUser,
} from "./adminActions";

/* =========================
   ASYNC THUNK
========================= */
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ type }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/getAllUsers?type=${type}`
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
    condition: ({ type }, { getState }) => {
      const { users } = getState();

      if (
        users.type === type &&
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
    limit: 10,

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

        // Sort users so newest ones appear at the top
        const sortedUsers = [...usersArray].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

          if (dateA && dateB && dateA !== dateB) {
            return dateB - dateA;
          }

          if (a._id && b._id && a._id !== b._id) {
            return String(b._id).localeCompare(String(a._id));
          }

          return 0;
        });

        const hasDistinctSortKeys = usersArray.some(
          (u, i) => i > 0 && (u.createdAt !== usersArray[0].createdAt || u._id !== usersArray[0]._id)
        );
        const finalUsers = hasDistinctSortKeys ? sortedUsers : [...usersArray].reverse();

        state.list = finalUsers.map((u) => ({
          id: u._id,
          name: u.fullName || "-",
          email: u.email || "-",
          phone: u.phone || "-",
          address: u.locationName || "-",
          isVerified: u.isVerified,
          isSuspended: u.isSuspended,
          isBlocked: u.isBlocked,
          createdAt: u.createdAt,
        }));

        state.total = finalUsers.length;
        state.totalPages = Math.ceil(finalUsers.length / state.limit) || 1;

        state.lastFetchedAt = Date.now();
        state.shouldReload = false;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyTechnician.fulfilled, (state, action) => {
        const userId = action.meta.arg;
        const user = state.list.find((u) => u.id === userId);
        if (user) {
          user.isVerified = true;
        }
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        const { userId } = action.meta.arg;
        const user = state.list.find((u) => u.id === userId);
        if (user) {
          user.isSuspended = true;
        }
      })
      .addCase(unsuspendUser.fulfilled, (state, action) => {
        const userId = action.meta.arg;
        const user = state.list.find((u) => u.id === userId);
        if (user) {
          user.isSuspended = false;
        }
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const userId = action.meta.arg;
        const user = state.list.find((u) => u.id === userId);
        if (user) {
          user.isBlocked = true;
        }
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        const userId = action.meta.arg;
        const user = state.list.find((u) => u.id === userId);
        if (user) {
          user.isBlocked = false;
        }
      });
  },
});

export const { setType, setPage, forceReload } = usersSlice.actions;
export default usersSlice.reducer;
