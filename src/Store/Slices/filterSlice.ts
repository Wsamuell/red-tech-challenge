import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../Helper/types';

interface FilterState {
  openCreateModal: boolean;
  searchInputID: string;
  selectedTypes: OrderType[];
}

const initialState: FilterState = {
  openCreateModal: false,
  searchInputID: '',
  selectedTypes: [],
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
    setOpenCreateModal: (state, action: PayloadAction<boolean>) => {
      state.openCreateModal = action.payload;
    },
  },
});

export const { setOpenCreateModal, setSearchInputID, setSelectedTypes } =
  filterSlice.actions;

export default filterSlice.reducer;
