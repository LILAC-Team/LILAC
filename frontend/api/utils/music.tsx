import { api } from "../index";

export const musicApi = {
  // 음원 상세 정보를 가져오는 API
  // 음원의 상세 정보를 표시하고 음원에 달린 최신 댓글 리스트를 같이 반환
  getMusicInfo: (musicCode) => api.get(`/musics/${musicCode}`),

  // 음원 댓글 생성 API
  // 댓글 내용과 댓글을 달 시간이 필요
  postRegisterComment: (musicCode, comment) =>
    api.post(`/musics/${musicCode}/comments`, comment),

  // 음원 댓글 삭제 API
  // 댓글 및 최신 댓글에서 삭제, 자기가 단 댓글만 지움
  deleteComment: (musicCode, commentCode) =>
    api.delete(`/musics/${musicCode}/comments/${commentCode}`),

  // 음원 댓글 API
  // 댓글 리스트 페이지로 반환, 페이지 번호는 1부터 시작
  getCommentList: (musicCode, pageNumber) =>
    api.get(`/music/${musicCode}/comments/${pageNumber}`),
};
