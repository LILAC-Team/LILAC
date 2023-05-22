import BasicText from "@/components/common/BasicText";
import * as S from "./style";
import CustomIconButton from "@/components/common/CustomIconButton";
import BasicImage from "@/components/common/BasicImage";
import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const Docs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [androidModalOpen, setAndroidModalOpen] = useState(false);
  const [iOSModalOpen, setIOSModalOpen] = useState(false);
  const [swipe_android, setSwipe_android] = useState<any>();
  const [reachingEnd_android, setReachingEnd_android] =
    useState<boolean>(false);
  const [reachingFirst_android, setReachingFirst_android] =
    useState<boolean>(true);
  const [swipe_iOS, setSwipe_iOS] = useState<any>();
  const [reachingEnd_iOS, setReachingEnd_iOS] = useState<boolean>(false);
  const [reachingFirst_iOS, setReachingFirst_iOS] = useState<boolean>(true);

  return (
    <>
      <Header isShown={false} link="/login" />
      <S.DocsContainer>
        <S.AllWrapper onClick={() => setAndroidModalOpen(!androidModalOpen)}>
          <S.ImageWrapper>
            <BasicImage isAlbumPage={true} src="/pictures/For_Android.png" />
          </S.ImageWrapper>
          <S.TextWrapper>
            <S.TopTextWrapper>
              <BasicText
                text="android"
                color="black"
                font="NotoSansKR700"
                size="200%"
              />
            </S.TopTextWrapper>
            <S.BottomTextWrapper>
              <BasicText
                text="사용설명서"
                color="black"
                font="NotoSansKR400"
                size="150%"
              />
            </S.BottomTextWrapper>
          </S.TextWrapper>
        </S.AllWrapper>
        {androidModalOpen && (
          <SmallModal handleSetShowModal={() => setAndroidModalOpen(false)}>
            <S.SliderWrap>
              <S.SliderButton>
                <CustomIconButton
                  handleOnClickButton={() => swipe_android?.slidePrev()}
                  isDisabled={reachingFirst_android}
                >
                  <AiOutlineLeft
                    color={reachingFirst_android ? "#D4D2D9" : "#6732FF"}
                  />
                </CustomIconButton>
              </S.SliderButton>
              <Swiper
                onBeforeInit={(swipper) => {
                  setSwipe_android(swipper);
                  setReachingEnd_android(false);
                  setReachingFirst_android(true);
                }}
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(e) => {
                  e.isEnd
                    ? setReachingEnd_android(true)
                    : setReachingEnd_android(false);
                  e.isBeginning
                    ? setReachingFirst_android(true)
                    : setReachingFirst_android(false);
                }}
                // navigation
                pagination={{
                  clickable: true,
                }}
              >
                <SwiperSlide>
                  <S.OneSlide>
                    <S.AllWrap>
                      <S.LeftWrap>
                        <BasicText text="💡" size="150%" />
                      </S.LeftWrap>
                      <S.RightWrap>
                        <BasicText
                          text="Google Play"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                        <BasicText
                          text="다운로드 하러가기"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                      </S.RightWrap>
                    </S.AllWrap>
                    <Link href="https://play.google.com/store/apps/details?id=net.lilac_music.twa">
                      <S.ImageWrap src="/pictures/android_1.png" />
                    </Link>
                    <BasicText
                      text="※ PWA 설치는 다음장을 참고해주세요"
                      color="black"
                      font="NotoSansKR400"
                      size="50%"
                    />
                  </S.OneSlide>
                </SwiperSlide>
                {/* 이미지 수정필요 */}
                <SwiperSlide>
                  <S.OneSlide>
                    <S.AllWrap>
                      <S.LeftWrap>
                        <BasicText text="1" size="150%" />
                      </S.LeftWrap>
                      <S.RightWrap>
                        <BasicText
                          text="다운로드 버튼을"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                        <BasicText
                          text="눌러주세요"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                      </S.RightWrap>
                    </S.AllWrap>
                    <S.ImageWrap src="/pictures/android_2.png" />
                  </S.OneSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <S.OneSlide>
                    <S.AllWrap>
                      <S.LeftWrap>
                        <BasicText text="2" size="150%" />
                      </S.LeftWrap>
                      <S.RightWrap>
                        <BasicText
                          text="안내에 따라"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                        <BasicText
                          text="설치해주세요"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                      </S.RightWrap>
                    </S.AllWrap>
                    <S.ImageWrap src="/pictures/android_3.png" />
                  </S.OneSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <S.OneSlide>
                    <S.AllWrap>
                      <S.LeftWrap>
                        <BasicText text="3" size="150%" />
                      </S.LeftWrap>
                      <S.RightWrap>
                        <BasicText
                          text="이제 홈화면에서"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                        <BasicText
                          text="확인할 수 있습니다!"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                      </S.RightWrap>
                    </S.AllWrap>
                    <S.ImageWrap src="/pictures/android_4.png" />
                  </S.OneSlide>
                </SwiperSlide>
              </Swiper>
              <S.SliderButton>
                <CustomIconButton
                  handleOnClickButton={() => swipe_android?.slideNext()}
                  isDisabled={reachingEnd_android}
                >
                  <AiOutlineRight
                    color={reachingEnd_android ? "#D4D2D9" : "#6732FF"}
                  />
                </CustomIconButton>
              </S.SliderButton>
            </S.SliderWrap>
            <S.PlayWrap>
              <Link href="https://play.google.com/store/apps/details?id=net.lilac_music.twa">
                <S.GoogleWrap src="/pictures/Google_Play.png" />
              </Link>
            </S.PlayWrap>
          </SmallModal>
        )}
        <S.AllWrapper onClick={() => setIOSModalOpen(!iOSModalOpen)}>
          <S.ImageWrapper>
            <BasicImage isAlbumPage={true} src="/pictures/For_iOS.png" />
          </S.ImageWrapper>
          <S.TextWrapper>
            <S.TopTextWrapper>
              <BasicText
                text="iOS"
                color="black"
                font="NotoSansKR700"
                size="200%"
              />
            </S.TopTextWrapper>
            <S.BottomTextWrapper>
              <BasicText
                text="사용설명서"
                color="black"
                font="NotoSansKR400"
                size="150%"
              />
            </S.BottomTextWrapper>
          </S.TextWrapper>
        </S.AllWrapper>
        {iOSModalOpen && (
          <SmallModal
            handleSetShowModal={() => {
              setIOSModalOpen(false);
              setReachingEnd_iOS(false);
              setReachingFirst_iOS(true);
            }}
          >
            <S.SliderWrap>
              <S.SliderButton>
                <CustomIconButton
                  handleOnClickButton={() => swipe_iOS?.slidePrev()}
                  isDisabled={reachingFirst_iOS}
                >
                  <AiOutlineLeft
                    color={reachingFirst_iOS ? "#D4D2D9" : "#6732FF"}
                  />
                </CustomIconButton>
              </S.SliderButton>
              <Swiper
                onBeforeInit={(swipper) => setSwipe_iOS(swipper)}
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(e) => {
                  e.isEnd
                    ? setReachingEnd_iOS(true)
                    : setReachingEnd_iOS(false);
                  e.isBeginning
                    ? setReachingFirst_iOS(true)
                    : setReachingFirst_iOS(false);
                }}
                // navigation
                pagination={{
                  clickable: true,
                }}
              >
                <SwiperSlide>
                  <S.OneSlide>
                    <S.AllWrap>
                      <S.LeftWrap>
                        <BasicText text="1" size="150%" />
                      </S.LeftWrap>
                      <S.RightWrap>
                        <BasicText
                          text="사이트에 접속하신 후"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                        <BasicText
                          text="공유버튼을 눌러주세요"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                      </S.RightWrap>
                    </S.AllWrap>
                    <S.ImageWrap src="/pictures/iOS_1.png" />
                  </S.OneSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <S.OneSlide>
                    <S.AllWrap>
                      <S.LeftWrap>
                        <BasicText text="2" size="150%" />
                      </S.LeftWrap>
                      <S.RightWrap>
                        <BasicText
                          text="홈 화면에 추가"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                        <BasicText
                          text="버튼을 눌러주세요"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                      </S.RightWrap>
                    </S.AllWrap>
                    <S.ImageWrap src="/pictures/iOS_2.png" />
                  </S.OneSlide>
                </SwiperSlide>
                <SwiperSlide>
                  <S.OneSlide>
                    <S.AllWrap>
                      <S.LeftWrap>
                        <BasicText text="3" size="150%" />
                      </S.LeftWrap>
                      <S.RightWrap>
                        <BasicText
                          text="LILAC을 입력하고"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                        <BasicText
                          text="추가하면 완료!"
                          color="black"
                          font="NotoSansKR400"
                          size="125%"
                        />
                      </S.RightWrap>
                    </S.AllWrap>
                    <S.ImageWrap src="/pictures/iOS_3.png" />
                  </S.OneSlide>
                </SwiperSlide>
              </Swiper>
              <S.SliderButton>
                <CustomIconButton
                  handleOnClickButton={() => swipe_iOS?.slideNext()}
                  isDisabled={reachingEnd_iOS}
                >
                  <AiOutlineRight
                    color={reachingEnd_iOS ? "#D4D2D9" : "#6732FF"}
                  />
                </CustomIconButton>
              </S.SliderButton>
            </S.SliderWrap>
          </SmallModal>
        )}
      </S.DocsContainer>
    </>
  );
};

export default Docs;
