import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
    notifications: notificationReducer,
  },
});

export default store;
