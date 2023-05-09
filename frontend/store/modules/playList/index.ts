import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  musicList: [],
  listSize: 0,
};

export const playList = createSlice({
  name: "playList",
  initialState,
  reducers: {
    setPlayList(state, action) {
      state.musicList = action.payload.musicList;
      state.listSize = action.payload.listSize;
    },
  },
});

export const { setPlayList } = playList.actions;

export default playList.reducer;
