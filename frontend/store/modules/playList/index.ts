import { createSlice } from "@reduxjs/toolkit";

export interface currPlayingMusicInfoState {
  index: number;
  name: string;
  artistName: string;
  playtime: number;
  code: string;
  albumImage: string;
  src: string;
}

export interface playListState {
  playing: boolean;
  shuffle: boolean;
  currentTrackIndex: number;
  currPlayingMusicInfo: currPlayingMusicInfoState;
  musicList: object;
  shuffleArr: number[];
  musicListSize: number;
  listSize: number;
}

export const initialState: playListState = {
  playing: false,
  shuffle: false,
  currentTrackIndex: -1,
  currPlayingMusicInfo: {
    index: 0,
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
        const object = {
          ...data,
          index,
          albumImage: process.env.CLOUDFRONT_URL + data.albumImage,
          src:
            process.env.CLOUDFRONT_URL + "musics/music-" + data.code + ".m3u8",
        };
        state.musicList[`${key}`] = object;
      });
      if (action.payload.listSize !== 0) {
        state.currentTrackIndex = 0;
        state.currPlayingMusicInfo = state.musicList["0"];
        state.shuffleArr = Array.from(Array(state.listSize), (_, v) => v);
      }
    },
    setShuffle: (state) => {
      state.shuffle = !state.shuffle;
      if (state.shuffle) {
        const copyNums = [...state.shuffleArr];
        let numsLength = copyNums.length;
        while (numsLength) {
          let randomIndex = Math.floor(numsLength-- * Math.random());
          let temp = copyNums[randomIndex];
          copyNums[randomIndex] = copyNums[numsLength];
          copyNums[numsLength] = temp;
        }
        state.shuffleArr = [...copyNums];
        for (let i = 0; i < state.listSize; i++) {
          if (state.shuffleArr[i] === state.currentTrackIndex) {
            state.currentTrackIndex = i;
            break;
          }
        }
      } else {
        state.shuffleArr = Array.from(Array(state.listSize), (_, v) => v);
      }
    },
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
    prevTrack: (state) => {
      state.playing = false;
      state.currentTrackIndex =
        (state.currentTrackIndex + state.listSize + 1) % state.listSize;
      state.currPlayingMusicInfo =
        state.musicList[`${state.shuffleArr[state.currentTrackIndex]}`];
      state.playing = true;
    },
    nextTrack: (state) => {
      state.playing = false;
      state.currentTrackIndex = (state.currentTrackIndex + 1) % state.listSize;
      state.currPlayingMusicInfo =
        state.musicList[`${state.shuffleArr[state.currentTrackIndex]}`];
      state.playing = true;
    },
    setTrack: (state, action) => {
      state.playing = false;
      state.currentTrackIndex = action.payload.currentTrackIndex;
      state.playing = true;
    },
    addAlbum: (state, action) => {},
  },
});

export const {
  setPlayList,
  setShuffle,
  togglePlay,
  prevTrack,
  nextTrack,
  setTrack,
  addAlbum,
} = playList.actions;

export default playList.reducer;
