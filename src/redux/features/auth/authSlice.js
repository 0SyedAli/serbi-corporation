// features/auth/authSlice.js (New File)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

const initialState = {
  user: null,
  adminId: null,
  // ADD THESE TEMPORARY FIELDS
  tempToken: null,
  tempEmail: null,
  // -------------------------
  status: 'idle',
  error: null,
  otpStatus: 'idle',
  otpError: null,
  resendStatus: 'idle',
  resendMessage: null,
};
// Define the async thunk for the Signup API call
export const signUpAdmin = createAsyncThunk(
  'auth/signUpAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/signUpAdmin', {
        email,
        password,
      });

      // CRITICAL FIX: Return the email along with the API response data, 
      // as the email is needed for the next step (OTP verification).
      return {
        ...response.data,
        email: email // Pass the email from the input form
      };

    } catch (error) {
      // ... error handling
      return rejectWithValue(error.response?.data?.message || 'Signup failed');

    }
  }
);


export const signInAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/loginAdmin', {
        email,
        password,
      });

      // Crucial: Handle token/session storage here. 
      // For security, use HTTP-only cookies set by your server.
      // If a token is returned in the body:
      // localStorage.setItem('authToken', response.data.token); 

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed. Check credentials');
    }
  }
);
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  // We only need OTP code and the temporary token from the state
  async ({ otp, token }, { rejectWithValue }) => {
    try {
      // CRITICAL FIX: Use the exact keys 'token' and 'Otp' as required by your API
      const response = await api.post('/verifyOtp', {
        "token": token,
        "Otp": otp,
      });

      // Interceptor should handle success: false check globally

      // Assuming API returns final token and user data upon successful verification
      return response.data;

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'OTP verification failed.';

      return rejectWithValue(errorMessage);
    }
  }
);

// Define the async thunk for the Create Profile API call
export const createProfile = createAsyncThunk(
  'auth/updateAdminProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.post('/updateAdminProfile', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data', // ✅ Important for FormData
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An unknown error occurred.';
      return rejectWithValue(errorMessage);
    }
  }
);

// features/auth/authSlice.js
export const createBusinessProfile = createAsyncThunk(
  'auth/updateAdminBussiness',
  async (businessData, { rejectWithValue }) => {
    try {
      const response = await api.post('/updateAdminProfile', businessData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Business profile creation failed.';
      return rejectWithValue(errorMessage);
    }
  }
);

// features/auth/authSlice.js
export const createBusinessProfile2 = createAsyncThunk(
  'auth/updateAdminBussiness2',
  async (businessDetailsData, { rejectWithValue }) => {
    try {
      const response = await api.post('/updateAdminProfile', businessDetailsData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update business details.';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignupDetails: (state, action) => {
      state.user = action.payload.user;
      state.tempToken = action.payload.token;
      state.tempEmail = action.payload.email;
    },
    clearOTPState: (state) => {
      state.otpStatus = "idle";
      state.otpError = null;
    },
    logout: (state) => {
      state.user = null;
      state.adminId = null;
      state.tempToken = null;
      state.tempEmail = null;
      state.status = "idle";
      state.error = null;
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("adminId");
    },
  },

  extraReducers: (builder) => {
    // signUpAdmin
    builder
      .addCase(signUpAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpAdmin.fulfilled, (state, action) => {
        state.status = 'awaitingOTP';
        state.user = action.payload;

        // --- FIX: Use the 'email' returned from the thunk and the 'token' from the API ---
        state.tempEmail = action.payload.email; // Extracted from the thunk return object
        state.tempToken = action.payload.token; // Using the correct API field name: 'token'
        // ----------------------------------------------------------------------------------

        state.error = null;
      })
      .addCase(signUpAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // The error message from rejectWithValue
        state.user = null;
      });
    // --- OTP Verification Cases ---
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.otpStatus = 'loading';
        state.otpError = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        const { token, data } = action.payload;

        state.status = 'authenticated';
        state.otpStatus = 'succeeded';
        state.token = token;
        state.adminId = data._id;
        state.user = data;

        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('s_u_adminId', data._id);

        state.tempToken = null;
        state.tempEmail = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload;
      })
    // signInAdmin
    builder
      .addCase(signInAdmin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signInAdmin.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        // state.user = action.payload;
        // // Assuming your API response has an 'adminId' field
        // state.adminId = action.payload.adminId;
        // state.error = null;
         const { token, data } = action.payload;

        state.status = 'authenticated';
        state.otpStatus = 'succeeded';
        state.token = token;
        state.adminId = data._id;
        state.user = data;

        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('adminId', data._id);

        state.tempToken = null;
        state.tempEmail = null;
      })
      .addCase(signInAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // The error message
        state.user = null;
      });

    // --- Create Profile Cases ---
    builder
      .addCase(createProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.status = 'profileCreated'; // Change to reflect profile is done
        // Update user state with new profile details
        state.user = { ...state.user, ...action.payload };
        state.adminId = action.payload.adminId;
        state.error = null;
        // The adminId and token should already be set from verifyOTP
      })

      .addCase(createProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    builder
      .addCase(createBusinessProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBusinessProfile.fulfilled, (state, action) => {
        state.status = 'businessProfileCreated';
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(createBusinessProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    builder
      .addCase(createBusinessProfile2.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBusinessProfile2.fulfilled, (state, action) => {
        state.status = 'businessDetailsUpdated';
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(createBusinessProfile2.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;