import { api } from "../index";

export const memberApi = {
  // 회원가입 API
  signUp: (formData) =>
    api.post("/members", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // 엑세스 재발급 API
  refresh: (refreshToken) => api.post("/refresh", refreshToken),

  // 회원정보 가져오기
  getUserInfo: () => api.get("/members"),

  // 회원정보 수정 API
  profileEdit: (formData) =>
    api.put("/members", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
