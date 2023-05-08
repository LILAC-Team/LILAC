import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogIn: false,
  isUser: false,
  email: "",
  nickName: "",
  profileImagePath: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogIn(state, action) {
      state.email = action.payload.email;
      state.isLogIn = true;
      state.nickName = action.payload.nickName;
      state.profileImagePath = action.payload.profileImagePath;
    },
    setLogOut(state, action) {
      state.email = "";
      state.isLogIn = false;
      state.nickName = "";
      state.profileImagePath = "";
    },
    setIsUser(state, action) {
      state.isUser = action.payload;
    },

    setProfileImg(state, action) {
      state.profileImagePath = action.payload.profileImagePath;
    },

    setMemberAccount(state, action) {
      state.nickName = action.payload.nickName;
      state.profileImagePath = action.payload.profileImagePath;
    },
  },
});

export const { setLogIn, setLogOut, setProfileImg, setMemberAccount } =
  userSlice.actions;

export default userSlice.reducer;
