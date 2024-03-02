import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order } from '../../Helper/types';

interface OrdersState {
  orders: Order[];
  filteredOrders: Order[];
  selectedRows: string[];
}

const initialState: OrdersState = {
  orders: [],
  filteredOrders: [],
  selectedRows: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setFilteredOrders: (state, action: PayloadAction<Order[]>) => {
      state.filteredOrders = action.payload;
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
    setSelectedRows: (state, action: PayloadAction<string[]>) => {
      state.selectedRows = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<string[]>) => {
      state.orders = state.orders.filter(
        (order) => !action.payload.includes(order.orderId)
      );
    },
  },
});

export const {
  setOrders,
  setFilteredOrders,
  setSelectedRows,
  addOrder,
  updateOrder,
  deleteOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
