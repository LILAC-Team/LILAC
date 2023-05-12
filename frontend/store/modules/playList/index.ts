import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playing: false,
  currentTrackIndex: -1,
  currSrc: "",
  musicList: [],
  listSize: 0,
};

export const playList = createSlice({
  name: "playList",
  initialState,
  reducers: {
    setPlayList(state, action) {
      state.listSize = action.payload.listSize;
      state.musicList = action.payload.musicList;
      if (action.payload.listSize !== 0) {
        state.currentTrackIndex = 0;
        state.currSrc =
          process.env.CLOUDFRONT_URL +
          state.musicList[state.currentTrackIndex].code;
      }
    },
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
    prevTrack: (state) => {
      state.currentTrackIndex =
        (state.currentTrackIndex + state.listSize + 1) % state.listSize;
      const url =
        process.env.CLOUDFRONT_URL +
        state.musicList[state.currentTrackIndex].code;
      state.currSrc = url;
      state.playing = true;
    },
    nextTrack: (state) => {
      state.currentTrackIndex = (state.currentTrackIndex + 1) % state.listSize;
      const url =
        process.env.CLOUDFRONT_URL +
        state.musicList[state.currentTrackIndex].code;
      state.currSrc = url;
      state.playing = true;
    },
    setTrack: (state, action) => {
      // 수정 필요...
      const url = action.payload
        ? process.env.CLOUDFRONT_URL + action.payload
        : "";
      state.currSrc = url;
    },
  },
});

export const { setPlayList, togglePlay, prevTrack, nextTrack, setTrack } =
  playList.actions;

export default playList.reducer;
