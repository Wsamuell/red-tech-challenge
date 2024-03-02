import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../types';
import { RootState } from '../store';

interface FilterState {
  searchInputID: string;
  selectedTypes: OrderType[];
}

const initialState: FilterState = {
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
  },
});

export const { setSearchInputID, setSelectedTypes } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
