// Redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAddress: "",
  provider: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAddress(state, action) {
      state.userAddress = action.payload;
    },

    setProvider(state, action) {
      state.provider = action.payload;
    },
  },
});

export const userAcitons = userSlice.actions;
export default userSlice;
