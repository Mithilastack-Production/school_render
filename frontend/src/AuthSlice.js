import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  schoolName: null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setTrue: (state) => {
      state.isAuthenticated = true;
    },
    setFalse: (state) => {
      state.isAuthenticated = false;
    },
    setSchoolName: (state, action) => {
      state.schoolName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTrue,setFalse,setSchoolName  } = authSlice.actions;

export default authSlice.reducer;
