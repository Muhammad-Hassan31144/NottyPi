import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import noteReducer from './slices/noteSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: noteReducer,
    theme: themeReducer,
  },
});

export default store;
