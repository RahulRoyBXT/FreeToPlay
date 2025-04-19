import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlatformState {
  selectedPlatform: string;
}

const initialState: PlatformState = {
  selectedPlatform: '',
};

export const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    setSelectedPlatform: (state, action: PayloadAction<string>) => {
      state.selectedPlatform = action.payload;
    },
    clearPlatformFilter: (state) => {
      state.selectedPlatform = '';
    },
  },
});

export const { setSelectedPlatform, clearPlatformFilter } = platformSlice.actions;
export default platformSlice.reducer;