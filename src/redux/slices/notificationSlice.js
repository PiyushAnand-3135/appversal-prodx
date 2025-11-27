import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const id = Date.now();
      state.items.push({
        id,
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
