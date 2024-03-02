import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../types';
import { RootState } from '../store';

interface FilterState {
  searchInputID: string;
  selectedTypes: OrderType[];
  openCreateModal: boolean;
}

const initialState: FilterState = {
  searchInputID: '',
  selectedTypes: [],
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
    setOpenCreateModal: (state, action: PayloadAction<boolean>) => {
      state.openCreateModal = action.payload;
    },
  },
});

export const { setSearchInputID, setSelectedTypes, setOpenCreateModal } =
  filterSlice.actions;

export default filterSlice.reducer;
