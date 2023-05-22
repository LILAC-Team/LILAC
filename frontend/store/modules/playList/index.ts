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
  loop: boolean;
  playing: boolean;
  shuffle: boolean;
  OnSeekToZero: boolean;
  currentTrackIndex: number;
  currPlayingMusicInfo: currPlayingMusicInfoState;
  musicList: object;
  shuffleArr: number[];
  musicListSize: number;
  listSize: number;
}
const initialState: playListState = {
  loop: false,
  playing: false,
  shuffle: false,
  OnSeekToZero: false,
  currentTrackIndex: -1,
  currPlayingMusicInfo: {
    index: -1,
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
      state.musicList = {};
      state.playing = false;
      state.listSize = action.payload.listSize;
      if (state.listSize !== 0) {
        action.payload.musicList.map((data, index) => {
          const key = index;
          const object = {
            ...data,
            index,
            albumImage: data.albumImage,
            src:
              process.env.CLOUDFRONT_URL +
              "musics/music-" +
              data.code +
              ".m3u8",
          };
          state.musicList[`${key}`] = object;
        });
        state.currentTrackIndex = 0;
        state.currPlayingMusicInfo = state.musicList["0"];
      }
    },
    updatePlayList: (state, action) => {
      state.musicList = {};
      state.listSize = action.payload.listSize;
      state.musicListSize = -1;
      // 전체 삭제일 경우
      if (action.payload.listSize === 0) {
        state.OnSeekToZero = true;
        state.playing = false;
        state.currPlayingMusicInfo = {
          index: -1,
          name: "",
          artistName: "",
          playtime: 0,
          code: "",
          albumImage: "",
          src: "",
        };
        // 일부 삭제일 경우
      } else if (action.payload.listSize !== 0) {
        let bo = false;
        action.payload.musicList.map((data, index) => {
          const key = index;
          if (data.index === state.currentTrackIndex) {
            state.currentTrackIndex = data.index;
            state.currPlayingMusicInfo.index = data.index;
            bo = true;
          }
          const object = {
            ...data,
            index,
          };
          state.musicList[`${key}`] = object;
        });
        if (!bo) {
          state.currentTrackIndex = 0;
          state.currPlayingMusicInfo = state.musicList[state.currentTrackIndex];
        }
      }
    },
    setLoop: (state) => {
      state.loop = !state.loop;
    },
    setShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
    prevTrack: (state) => {
      let len = Object.keys(state.musicList).length;
      if (state.shuffle) {
        state.currentTrackIndex = Math.floor(len-- * Math.random());
        state.currPlayingMusicInfo =
          state.musicList[`${state.currentTrackIndex}`];
      } else {
        state.currentTrackIndex = (state.currentTrackIndex + len - 1) % len;
        state.currPlayingMusicInfo =
          state.musicList[`${state.currentTrackIndex}`];
      }
      state.OnSeekToZero = true;
      state.playing = true;
    },
    nextTrack: (state) => {
      let len = Object.keys(state.musicList).length;
      if (state.shuffle) {
        state.currentTrackIndex = Math.floor(len-- * Math.random());
        state.currPlayingMusicInfo =
          state.musicList[`${state.currentTrackIndex}`];
      } else {
        state.currentTrackIndex = (state.currentTrackIndex + 1) % len;
        state.currPlayingMusicInfo =
          state.musicList[`${state.currentTrackIndex}`];
      }
      state.playing = true;
      state.OnSeekToZero = true;
    },
    setTrack: (state, action) => {
      state.currentTrackIndex = action.payload.index;
      state.currPlayingMusicInfo =
        state.musicList[`${state.currentTrackIndex}`];
      state.OnSeekToZero = true;
      state.playing = true;
    },
    PutStartingPointToZero: (state, action) => {
      state.OnSeekToZero = action.payload;
    },
    deleteTrack: (state, action) => {
      state.musicList = action.payload.musicList;
    },
    addTrackToPlayList: (state, action) => {
      let index = Object.keys(state.musicList).length;
      const data = action.payload;
      const object = {
        index,
        ...data,
        src: process.env.CLOUDFRONT_URL + "musics/music-" + data.code + ".m3u8",
      };
      state.musicList[`${index}`] = object;
      state.currentTrackIndex = index;
      state.currPlayingMusicInfo = object;
      state.OnSeekToZero = true;
      state.playing = true;
    },
  },
});

export const {
  setPlayList,
  updatePlayList,
  setLoop,
  setShuffle,
  togglePlay,
  prevTrack,
  nextTrack,
  setTrack,
  PutStartingPointToZero,
  deleteTrack,
  addTrackToPlayList,
} = playList.actions;

export default playList.reducer;
