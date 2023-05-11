import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import * as S from "./style";
import AlbumCard from "../../common/AlbumCard";
import Link from "next/link";

interface AlbumDataProps {
  name: string;
  albumImage: string;
  code: string;
  releasedDate: string;
  nickname: string;
}

interface BasicSliderProps {
  data: AlbumDataProps[];
}

const BasicSlider = ({ data }: BasicSliderProps) => {
  return (
    <>
      <Swiper slidesPerView={3.5} spaceBetween={0}>
        {data.map((data: AlbumDataProps) => (
          <SwiperSlide key={data.code}>
            <Link key={data.code} href={`/album/${data.code}`}>
              <S.AlbumWrap>
                <AlbumCard
                  data={data}
                  showAlbumDetail={false}
                  albumSize="100%"
                />
              </S.AlbumWrap>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BasicSlider;
