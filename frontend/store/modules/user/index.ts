import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogIn: false,
  email: "",
  nickName: "",
  profileImage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogIn(state, action) {
      state.email = action.payload.email;
      state.isLogIn = true;
      state.nickName = action.payload.nickName;
      state.profileImage = action.payload.profileImage;
    },
    setUserInfo(state, action) {
      state.email = action.payload.email;
      state.isLogIn = true;
      state.nickName = action.payload.nickName;
      state.profileImage = action.payload.profileImage;
    },
  },
});

export const { setLogIn } = userSlice.actions;

export default userSlice.reducer;
