import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import * as S from "./style";
import AlbumCard from "../../common/AlbumCard";
import dummy from "../../../pages/test.json";

interface BasicSliderProps {
  imageSize?: string;
  imageText?: string;
  fetchUrl?: string;
  handleSetShowModal?: Function;
}
// import required modules
const BasicSlider = ({
  imageSize,
  imageText,
  fetchUrl,
  handleSetShowModal,
}: BasicSliderProps) => {
  return (
    <>
      <Swiper slidesPerView={3} spaceBetween={0}>
        {dummy.releasedAlbumList.map(
          (data: {
            name: string;
            albumImage: string;
            code: string;
            releasedDate: string;
            nickname: string;
          }) => (
            <SwiperSlide key={data.code}>
              <S.AlbumWrap>
                <AlbumCard
                  onClickEvent={() => console.log("히히")}
                  data={data}
                  showAlbumDetail={false}
                />
              </S.AlbumWrap>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default BasicSlider;

// const dummy: { title: string }[] = [
//   {
//     title: "slide 1",
//   },
//   {
//     title: "slide 2",
//   },
//   {
//     title: "slide 3",
//   },
//   {
//     title: "slide 4",
//   },
//   {
//     title: "slide 5",
//   },
//   {
//     title: "slide 6",
//   },
//   {
//     title: "slide 7",
//   },
//   {
//     title: "slide 8",
//   },
//   {
//     title: "slide 9",
//   },
// ];
