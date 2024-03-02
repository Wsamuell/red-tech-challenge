import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order } from '../../types';
import { RootState } from '../store';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(
        (order) => order.orderId === action.payload.orderId
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<string[]>) => {
      state.orders = state.orders.filter(
        (order) => !action.payload.includes(order.orderId)
      );
    },
  },
});

export const { setOrders, addOrder, updateOrder, deleteOrder } =
  ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders;

export default ordersSlice.reducer;
