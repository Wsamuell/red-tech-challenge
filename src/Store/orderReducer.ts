import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewOrder } from '../types';

interface OrderState {
  formData: NewOrder;
}

const initialState: OrderState = {
  formData: {
    customerName: '',
    createdByUserName: '',
    orderType: '',
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<NewOrder>) {
      state.formData = action.payload;
    },
    clearFormData(state) {
      state.formData = initialState.formData;
    },
  },
});

export const { setFormData, clearFormData } = orderSlice.actions;
export default orderSlice.reducer;
