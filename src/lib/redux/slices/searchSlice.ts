import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchText: string;
}

const initialState: SearchState = {
  searchText: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    clearSearch: (state) => {
      state.searchText = '';
    },
  },
});

export const { setSearchText, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;