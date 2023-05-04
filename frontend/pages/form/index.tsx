import * as S from "./style";
import { useState } from "react";
import CircularJSON from "circular-json";
import Layout from "@/components/common/Layout";
import MusicCard from "@/components/Player/MusicCard";
import BasicText from "@/components/common/BasicText";
import BasicInput from "@/components/common/BasicInput";
import ImageInput from "@/components/common/ImageInput";
import AudioFileInput from "@/components/common/AudioFileInput";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import CustomTextButton from "@/components/common/CustomTextButton";
interface ProfileState {
  previewImgUrl: string | ArrayBuffer;
  file: File | {};
}

const Form = () => {
  const [albumTitle, setAlbumTitle] = useState("NewHyunsus");
  const [albumImage, setAlbumImage] = useState<ProfileState>({
    previewImgUrl: "",
    file: {},
  });

  const [currTrackInfo, setCurrTrackInfo] = useState({
    title: "",
    artist: "",
    file: {},
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albumTrackList, setAlbumTrackList] = useState([]);

  const handleAlbumImageChange = async (e) => {
    const {
      target: { files },
    } = e;

    if (e.target.value === "") {
      setAlbumImage({ previewImgUrl: "", file: {} });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setAlbumImage({ previewImgUrl: reader.result, file: files[0] });
      };
    }
  };

  const handleAddAlbumTrack = async (e) => {
    const {
      target: { files, value },
    } = e;
    if (e.target.value === "") {
      setCurrTrackInfo({ title: "", artist: "", file: {} });
    } else {
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const audioContext = new AudioContext();
      //   audioContext.decodeAudioData(files[0]).then(function (audioBuffer) {
      //     console.log(`Duration: ${audioBuffer.duration} seconds`);
      //   });
      // };
      setCurrTrackInfo({ ...currTrackInfo, file: files[0] });
      setIsModalOpen(true);
    }
  };

  const handleAlbumTitleOnChange = (e) => {
    setAlbumTitle(e.target.value);
  };

  const handleCurrTrackInfoOnChange = (e) => {
    const { id, value } = e.target;
    setCurrTrackInfo({ ...currTrackInfo, [id]: value });
  };

  const addTrackToAlbum = () => {
    setAlbumTrackList([currTrackInfo, ...albumTrackList]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Layout>
        <S.ContentWrap>
          <ImageInput
            src={albumImage.previewImgUrl}
            onChangeEvent={handleAlbumImageChange}
          />
          <S.AlbumTitleWrap>
            <BasicInput
              id="nickname"
              type="text"
              value={albumTitle}
              handleOnChangeValue={handleAlbumTitleOnChange}
            />
          </S.AlbumTitleWrap>
          <S.ContentTitleWrap>
            <BasicText text="음원목록" size="1.5rem" font="NotoSansKR700" />
          </S.ContentTitleWrap>
          <AudioFileInput onChangeEvent={handleAddAlbumTrack} />
          <MusicCard
            onClickEvent={() => console.log("ClickClick")}
            data={{ name: "name", albumImage: "", nickname: "nickname" }}
            isEditable={true}
          />

          {/* {albumTrackList.length > 0 &&
            albumTrackList.map((val, index) => <MusicCard key={index}>하하하</MusicCard>)} */}
        </S.ContentWrap>
      </Layout>
      {isModalOpen && (
        <SmallModal
          handleSetShowModal={() => {
            setIsModalOpen(false);
          }}
        >
          <S.ModalContainer>
            <BasicText
              text="제목"
              size="1.25rem"
              color="var(--color-background)"
            />
            <BasicInput
              id="title"
              type="text"
              color="var(--color-background)"
              value={currTrackInfo.title}
              handleOnChangeValue={handleCurrTrackInfoOnChange}
            />

            <BasicText
              text="아티스트"
              size="1.25rem"
              color="var(--color-background)"
            />
            <BasicInput
              id="artist"
              type="text"
              color="var(--color-background)"
              value={currTrackInfo.artist}
              handleOnChangeValue={handleCurrTrackInfoOnChange}
            />
            <div></div>
            <CustomTextButton
              text="등록"
              fontColor="var(--color-background)"
              handleOnClickButton={() => console.log("등록성공!")}
            />
          </S.ModalContainer>
        </SmallModal>
      )}
    </>
  );
};

export async function getServerSideProps({ req }) {
  const serializedReq = CircularJSON.stringify(req);
  return {
    props: {
      req: serializedReq,
    },
  };
}

export default Form;
