import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import * as S from "./style";
import AlbumCard from "../../common/AlbumCard";
import { AlbumDataProps } from "@/pages";

interface BasicSliderProps {
  data: AlbumDataProps[];
}

const BasicSlider = ({ data }: BasicSliderProps) => {
  const handleAlbumClick = () => {
    console.log("Show Album Detail");
  };

  return (
    <>
      <Swiper slidesPerView={3.5} spaceBetween={0}>
        {data.map((data: AlbumDataProps) => (
          <SwiperSlide key={data.code}>
            <S.AlbumWrap>
              <AlbumCard
                onClickEvent={handleAlbumClick}
                data={data}
                showAlbumDetail={false}
                albumSize="100%"
              />
            </S.AlbumWrap>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BasicSlider;
