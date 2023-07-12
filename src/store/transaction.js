import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactionList: {},
    isLoggedIn: false
  },
  reducers: {
    updateTransaction: (state, action) => {
      return {
        ...state,
        transactionList: { ...action.payload }
      };
    }
  }
});

// Actions
export const { updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
