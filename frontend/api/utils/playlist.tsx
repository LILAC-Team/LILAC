import { api } from "../index";

export const playlistApi = {
  // 재생목록 가져오는 API
  getPlayList: () => api.get("/playlists"),

  // 재생목록 수정 API
  // 수정된 재생목록 통째로 넘겨야함
  putPlayList: (data) => api.put("/playlists", data),

  // 재생목록 곡 추가 API
  // 추가할 음원 코드 보내야함.
  addMusicToPlayList: (data) => api.post("/playlists", data),
};
