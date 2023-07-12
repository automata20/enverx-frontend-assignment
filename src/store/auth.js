import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isLoggedIn: false
  },
  reducers: {
    updateCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    },
    updateIsLoggedIn: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload
      };
    }
  }
});

// Actions
export const { updateCurrentUser, updateIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
