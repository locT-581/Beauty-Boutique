import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: { isShowBackDrop: false, element: null },
  reducers: {
    showBackDrop: (state, actions) => {
      state.isShowBackDrop = true;
      if (actions?.payload) {
        state.element = actions.payload.element;
      }
    },
    closeBackDrop: (state) => {
      state.isShowBackDrop = false;
    },
  },
});

const { actions, reducer } = uiSlice;
export const { showBackDrop, closeBackDrop } = actions;
export default reducer;
