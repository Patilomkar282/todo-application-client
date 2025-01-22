import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    name: null,
    profilePicture: null,
  },
  error: null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = {
        name: null,
        profilePicture: null,
      };
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      // Simulated login - replace with actual API call
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        return {
          name: 'ABCD',
          profilePicture: 'https://example.com/default-avatar.png', // Add your default avatar URL here
        };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    }
  }
);

export default authSlice.reducer; 