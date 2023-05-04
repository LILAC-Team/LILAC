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

const BasicSlider = ({
  imageSize,
  imageText,
  fetchUrl,
  handleSetShowModal,
}: BasicSliderProps) => {
  const handleAlbumClick = () => {
    console.log("Show Album Detail");
  };

  return (
    <>
      <Swiper slidesPerView={4.5} spaceBetween={0}>
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
                  onClickEvent={handleAlbumClick}
                  data={data}
                  showAlbumDetail={false}
                  albumSize="100%"
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
