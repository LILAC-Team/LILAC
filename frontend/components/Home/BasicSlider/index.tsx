import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import * as S from "./style";

const dummy: { title: string }[] = [
  {
    title: "slide 1",
  },
  {
    title: "slide 2",
  },
  {
    title: "slide 3",
  },
  {
    title: "slide 4",
  },
  {
    title: "slide 5",
  },
  {
    title: "slide 6",
  },
  {
    title: "slide 7",
  },
  {
    title: "slide 8",
  },
  {
    title: "slide 9",
  },
];

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
      <Swiper slidesPerView={3} spaceBetween={30}>
        {dummy.map((value: { title: string }) => (
          <SwiperSlide key={value.title}>
            <S.DummyWrap>
              <S.ContentWrap>{value.title}</S.ContentWrap>
            </S.DummyWrap>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BasicSlider;
