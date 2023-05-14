import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playing: false,
  currentTrackIndex: -1,
  currPlayingMusicInfo: {},
  musicList: new Map(),
  shuffleArr: [],
  musicListSize: -1,
  listSize: 0,
};

export const playList = createSlice({
  name: "playList",
  initialState,
  reducers: {
    setPlayList(state, action) {
      state.listSize = action.payload.listSize;
      action.payload.musicList.map((data, index) => {
        const key = state.musicListSize + index + 1;
        state.musicList.set(key, data);
      });
      if (action.payload.listSize !== 0) {
        state.currentTrackIndex = 0;
        state.currPlayingMusicInfo = action.payload.musicList[0];
        state.currPlayingMusicInfo["src"] =
          process.env.CLOUDFRONT_URL +
          "musics/" +
          state.musicList.get(state.currentTrackIndex).code +
          ".m3u8";
        for (let i = 0; i < state.listSize; i++) {
          state.shuffleArr.push(i);
        }
      }
    },
    setShuffle: (state) => {},
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
    prevTrack: (state) => {
      state.currentTrackIndex =
        (state.currentTrackIndex + state.listSize + 1) % state.listSize;
      const url =
        process.env.CLOUDFRONT_URL +
        state.musicList[state.currentTrackIndex].code;
      state.playing = true;
    },
    nextTrack: (state) => {
      state.currentTrackIndex = (state.currentTrackIndex + 1) % state.listSize;
      const url =
        process.env.CLOUDFRONT_URL +
        state.musicList[state.currentTrackIndex].code;
      // state.currSrc = url;
      state.playing = true;
    },
    setTrack: (state, action) => {
      state.currentTrackIndex = action.payload.currentTrackIndex;
      // state.currSrc =
      // process.env.CLOUDFRONT_URL +
      // state.musicList[state.currentTrackIndex].code;
    },
  },
});

export const { setPlayList, togglePlay, prevTrack, nextTrack, setTrack } =
  playList.actions;

export default playList.reducer;
