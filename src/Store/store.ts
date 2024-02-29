import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderReducer';

const store = configureStore({
  reducer: {
    order: orderReducer,
  },
});

export default store;
