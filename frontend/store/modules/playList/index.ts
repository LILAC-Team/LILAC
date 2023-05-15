import { createSlice } from "@reduxjs/toolkit";

export interface currPlayingMusicInfoState {
  name: string;
  artistName: string;
  playtime: number;
  code: string;
  albumImage: string;
  src: string;
}

export interface playListState {
  playing: boolean;
  currentTrackIndex: number;
  currPlayingMusicInfo: currPlayingMusicInfoState;
  musicList: Object;
  shuffleArr: number[];
  musicListSize: number;
  listSize: number;
}

export const initialState: playListState = {
  playing: false,
  currentTrackIndex: -1,
  currPlayingMusicInfo: {
    name: "",
    artistName: "",
    playtime: 0,
    code: "",
    albumImage: "",
    src: "",
  },
  musicList: {},
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
        const object = data;
        object["src"] =
          process.env.CLOUDFRONT_URL +
          "musics/" +
          state.musicList[`${state.currentTrackIndex}`].code +
          ".m3u8";
        state.musicList[`${key}`] = object;
      });
      if (action.payload.listSize !== 0) {
        state.currentTrackIndex = 0;
        state.currPlayingMusicInfo = action.payload.musicList[0];
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
      state.currPlayingMusicInfo =
        state.musicList[`${state.currentTrackIndex}`];
      state.playing = true;
      // state.currPlayingMusicInfo["src"] =
      //   process.env.CLOUDFRONT_URL +
      //   "musics/" +
      //   state.currPlayingMusicInfo.code +
      //   ".m3u8";
    },
    nextTrack: (state) => {
      state.currentTrackIndex = (state.currentTrackIndex + 1) % state.listSize;
      state.currPlayingMusicInfo =
        state.musicList[`${state.currentTrackIndex}`];
      state.playing = true;
    },
    setTrack: (state, action) => {
      state.currentTrackIndex = action.payload.currentTrackIndex;
    },
  },
});

export const { setPlayList, togglePlay, prevTrack, nextTrack, setTrack } =
  playList.actions;

export default playList.reducer;
