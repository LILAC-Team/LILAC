import { createSlice } from "@reduxjs/toolkit";

interface memberInfoState {
  nickname: string;
  profileImage: string;
  email: string;
}

interface totalCommentListState {
  code: string;
  content: string;
  presentTime: number;
  createdTime: string;
  memberInfo: memberInfoState;
}

interface recentCommentListState {
  content: string;
  presentTime: number;
  memberInfo: memberInfoState;
}

export interface commentListState {
  recentCommentList: recentCommentListState[];
  commentList: totalCommentListState[];
  totalPages: number;
  totalElements: number;
  number: number;
  first: boolean;
  last: boolean;
  time: number;
}

const initialState: commentListState = {
  recentCommentList: [],
  commentList: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  first: false,
  last: false,
  time: 0,
};

export const commentList = createSlice({
  name: "commentList",
  initialState,
  reducers: {
    setRecentCommentList: (state, action) => {
      state.recentCommentList = [...action.payload.recentCommentList];
    },
    setTotalCommentList: (state, action) => {
      state.commentList = [...action.payload.commentList];
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
      state.number = action.payload.number;
      state.first = action.payload.first;
      state.last = action.payload.last;
    },
    setTime: (state, action) => {
      state.time = parseInt(action.payload.time);
    },
  },
});

export const { setRecentCommentList, setTotalCommentList, setTime } =
  commentList.actions;

export default commentList.reducer;
