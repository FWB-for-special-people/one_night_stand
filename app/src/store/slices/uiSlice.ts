import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isCollapsed: boolean;
}

const initialState: UIState = {
  isCollapsed: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapse: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleCollapse, setCollapse } = uiSlice.actions;
export default uiSlice.reducer;
