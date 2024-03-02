import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../types';

interface FilterState {
  searchInputID: string;
  selectedTypes: OrderType[];
  selectedRows: string[];
  openCreateModal: boolean;
}

const initialState: FilterState = {
  searchInputID: '',
  selectedTypes: [],
  selectedRows: [],
  openCreateModal: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchInputID: (state, action: PayloadAction<string>) => {
      state.searchInputID = action.payload;
    },
    setSelectedTypes: (state, action: PayloadAction<OrderType[]>) => {
      state.selectedTypes = action.payload;
    },
    setSelectedRows: (state, action: PayloadAction<string[]>) => {
      state.selectedRows = action.payload;
    },
    setOpenCreateModal: (state, action: PayloadAction<boolean>) => {
      state.openCreateModal = action.payload;
    },
  },
});

export const {
  setSearchInputID,
  setSelectedTypes,
  setSelectedRows,
  setOpenCreateModal,
} = filterSlice.actions;

export default filterSlice.reducer;
