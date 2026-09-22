import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatStatus } from "./statusMap";

export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (parentTab = "request", { rejectWithValue }) => {
    try {
      const BASE = process.env.NEXT_PUBLIC_API_URL;
      const endpoint =
        parentTab === "discussion"
          ? `${BASE}/user/getAllDiscussionForms`
          : `${BASE}/user/getAllRequestForms`;

      const [resForms, resServices, resUsers, resTechs] = await Promise.allSettled([
        fetch(endpoint).then((r) => r.json()),
        fetch(`${BASE}/admin/getAllServices`).then((r) => r.json()),
        fetch(`${BASE}/user/getAllUsers?type=User`).then((r) => r.json()),
        fetch(`${BASE}/user/getAllUsers?type=Technician`).then((r) => r.json()),
      ]);

      const jsonForms = resForms.status === "fulfilled" ? resForms.value : {};
      const jsonServices = resServices.status === "fulfilled" ? resServices.value : {};
      const jsonUsers = resUsers.status === "fulfilled" ? resUsers.value : {};
      const jsonTechs = resTechs.status === "fulfilled" ? resTechs.value : {};

      if (!jsonForms.success) throw new Error(jsonForms.msg || "Failed to fetch requests");

      let list = [];
      if (parentTab === "discussion") {
        list = jsonForms.data || [];
      } else {
        list = jsonForms.data?.requestForms || jsonForms.data || [];
      }

      // Services Map
      const servicesArray = jsonServices.success ? jsonServices.data || [] : [];
      const servicesMap = {};
      servicesArray.forEach((s) => {
        if (s._id) servicesMap[s._id] = s;
      });

      // Users Map
      const usersArray = jsonUsers.success ? jsonUsers.data?.data || [] : [];
      const usersMap = {};
      usersArray.forEach((u) => {
        if (u._id) usersMap[u._id] = u;
      });

      // Technicians Map
      const techsArray = jsonTechs.success ? jsonTechs.data?.data || [] : [];
      const techniciansMap = {};
      techsArray.forEach((t) => {
        if (t._id) techniciansMap[t._id] = t;
      });

      return { parentTab, list, servicesMap, usersMap, techniciansMap };
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
    servicesMap: {},
    usersMap: {},
    techniciansMap: {},
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
        const { parentTab, list, servicesMap, usersMap, techniciansMap } = action.payload;

        state.servicesMap = { ...state.servicesMap, ...servicesMap };
        state.usersMap = { ...state.usersMap, ...usersMap };
        state.techniciansMap = { ...state.techniciansMap, ...techniciansMap };

        const mapped = list.map((r) => {
          const userObj = typeof r.userId === "object" && r.userId !== null ? r.userId : state.usersMap[r.userId] || null;
          const techObj = typeof r.technicianId === "object" && r.technicianId !== null ? r.technicianId : state.techniciansMap[r.technicianId] || null;
          const serviceObj = typeof r.serviceId === "object" && r.serviceId !== null ? r.serviceId : state.servicesMap[r.serviceId] || null;

          return {
            id: r._id,
            customer: userObj?.fullName || userObj?.name || (typeof r.userId === "string" ? `User (${r.userId.slice(0, 5)})` : "User"),
            technicianName: techObj?.fullName || techObj?.name || "-",
            typeOfPest: serviceObj?.name || r.typeOfPest || "-",
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
            paymentStatus: r.paymentStatus || (r.depositPaid ? "Paid" : "Pending"),
            amount: r.amount || r.depositAmount || "-",
            userObj,
            techObj,
            serviceObj,
            raw: r,
          };
        });

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
