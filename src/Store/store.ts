import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './Slices/orderSlice';
import filterReducer from './Slices/filterSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
