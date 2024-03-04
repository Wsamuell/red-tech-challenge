import {
  filterOrdersBySearchAndType,
  filterSearchOrders,
} from '../../Helper/filterFunctionality';
import { Order, OrderType } from '../../Helper/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrdersState {
  error: string | null;
  filteredOrders: Order[];
  loading: boolean;
  orders: Order[];
  selectedRows: string[];
}

const initialState: OrdersState = {
  error: null,
  filteredOrders: [],
  loading: true,
  orders: [],
  selectedRows: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFilteredOrders: (state, action: PayloadAction<Order[]>) => {
      state.filteredOrders = action.payload;
    },
    addOrder: (
      state,
      action: PayloadAction<{
        order: Order;
        searchInputID: string;
        selectedTypes: OrderType[];
      }>
    ) => {
      const { order, searchInputID, selectedTypes } = action.payload;
      state.orders.push(order);
      state.filteredOrders = filterOrdersBySearchAndType(
        state.orders,
        searchInputID,
        selectedTypes
      );
    },
    filteredOrdersBySearch: (state, action: PayloadAction<string>) => {
      state.filteredOrders = filterSearchOrders(state.orders, action.payload);
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
    setDeleteOrders: (state, action: PayloadAction<string[]>) => {
      state.orders = state.orders.filter(
        (order) => !action.payload.includes(order.orderId)
      );
    },
    setDeleteFilteredOrders: (state, action: PayloadAction<string[]>) => {
      state.filteredOrders = state.filteredOrders.filter(
        (order) => !action.payload.includes(order.orderId)
      );
    },
  },
});

export const {
  addOrder,
  filteredOrdersBySearch,
  setDeleteFilteredOrders,
  setDeleteOrders,
  setError,
  setFilteredOrders,
  setLoading,
  setOrders,
  setSelectedRows,
  updateOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
