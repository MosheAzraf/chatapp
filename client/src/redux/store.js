import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/features/authSlice"
import userReducer from '../redux/features/userSlice';
import chatReducer  from '../redux/features/chatSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chat: chatReducer
  },
});
