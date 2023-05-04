import { api } from "../index";

export const memberApi = {
  // 닉네임 중복확인 API
  checkDuplicateNickName: (nickname) =>
    api.post("/duplicateNickName", nickname),

  // 회원가입 API
  signUp: (formData) => api.post("/member/signup", formData),

  // 엑세스 재발그 API
  refresh: (refreshToken) => api.post("/refresh", refreshToken),
};
