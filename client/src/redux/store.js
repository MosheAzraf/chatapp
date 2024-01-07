import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/features/authSlice"
import userReducer from '../redux/features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
});
