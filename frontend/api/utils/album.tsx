import { api } from "../index";

export const albumApi = {
  // 앨범 업로드 API
  // 앨범 제목과 커버 이미지, 음원 리스트 및 음원 정보 등이 필요
  uploadAlbum: (formData) => api.post("/albums", formData),

  // 앨범 상세 정보를 가져오는 API
  // 앨범과 앨범에 소속된 음원 리스트 및 앨범 소유 여부를 표시
  getAlbumInfo: (albumCode) => api.get(`/albums/${albumCode}`),

  // 내가 소장한 앨범을 가져오는 API
  // pageNumber는 1부터 시작되며
  // 가져오는 이상의 입력의 경우
  // 빈 리스트가 들어있는 객체 반환
  getCollectedAlbum: (pageNumber) => api.get(`/albums/collected/${pageNumber}`),

  // 내가 발매한 앨범을 가져오는 API
  // pageNumber는 1부터 시작되며 가지고 있는 이상의 입력의 경우 빈 리스트가 들어있는 객체 반환
  getReleasedAlbum: (pageNumber) => api.get(`/albums/released/${pageNumber}`),

  // 소장 앨번 추가 API
  // 추가할 앨범 코드와 로그인 필요
  addAlbumToCollectedAlbum: (data) => api.post("/user-collect-albums", data),
};
