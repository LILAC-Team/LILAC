import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playing: false,
  currentTrackIndex: 0,
  currSrc: "",
};

const playerControllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
    nextTrack: (state, action) => {
      state.currentTrackIndex = (state.currentTrackIndex + 1) % action.payload;
    },
    setTrack: (state, action) => {
      const url = action.payload
        ? process.env.CLOUDFRONT_URL + action.payload
        : "";
      state.currSrc = url;
    },
  },
});

export const { togglePlay, nextTrack, setTrack } =
  playerControllerSlice.actions;

export default playerControllerSlice.reducer;
