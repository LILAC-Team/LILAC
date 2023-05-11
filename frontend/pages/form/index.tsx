import * as S from "./style";
import React, { useState } from "react";
import CircularJSON from "circular-json";
import Layout from "@/components/common/Layout";
import MusicCard from "@/components/Player/MusicCard";
import BasicText from "@/components/common/BasicText";
import BasicInput from "@/components/common/BasicInput";
import ImageInput from "@/components/common/ImageInput";
import AudioFileInput from "@/components/common/AudioFileInput";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import CustomTextButton from "@/components/common/CustomTextButton";
import { albumApi } from "@/api/utils/album";
import { useRouter } from "next/router";
interface ProfileState {
  previewImgUrl: any;
  file: any;
}

const Form = () => {
  const router = useRouter();
  const [albumTitle, setAlbumTitle] = useState("NewHyunsus");
  const [albumImage, setAlbumImage] = useState<ProfileState>({
    previewImgUrl: "",
    file: {},
  });

  const [currTrackInfo, setCurrTrackInfo] = useState({
    title: "",
    artist: "",
    isTitle: false,
    playtime: 0,
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
        console.log("typeof reader.result: ", typeof reader.result);
        const str = reader.result;
        console.log("str: ", str);
        setAlbumImage({ previewImgUrl: str, file: files[0] });
      };
    }
  };

  const handleAddAlbumTrack = async (e) => {
    const {
      target: { files, value },
    } = e;
    if (value === "") {
      setCurrTrackInfo({
        title: "",
        artist: "",
        isTitle: false,
        playtime: 0,
        file: {},
      });
    } else {
      const fileReader = new FileReader();
      const audioContext = new AudioContext();

      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          setCurrTrackInfo({
            ...currTrackInfo,
            playtime: Math.ceil(audioBuffer.duration),
            file: files[0],
          });
          console.log(`Duration: ${Math.ceil(audioBuffer.duration)} seconds`);
        });
      };
      fileReader.readAsArrayBuffer(files[0]);
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

  const handleAddTrackToAlbum = () => {
    setAlbumTrackList([currTrackInfo, ...albumTrackList]);
    setCurrTrackInfo({
      title: "",
      artist: "",
      isTitle: false,
      playtime: 0,
      file: {},
    });
    setIsModalOpen(false);
  };

  // 앨범 등록
  const registerAlbum = async () => {
    const formData = new FormData();
    const arr: Object[] = new Array();
    const albumInfo = {};
    albumInfo["name"] = albumTitle;
    // 앨범 정보
    albumTrackList.map((data, index) => {
      const obj = {
        artistName: data.artist,
        musicIndex: index,
        isTitle: false,
        name: data.title,
        playtime: data.playtime,
      };
      arr.push(obj);
    });
    albumInfo["musicList"] = arr;

    formData.append("albumInfo", JSON.stringify(albumInfo));

    // 앨범 이미지 정보
    const reader = new FileReader();
    const imageFilePromise = new Promise<void>((resolve, reject) => {
      reader.onload = () => {
        const blob = new Blob([reader.result], {
          type: albumImage.file.type,
        });
        formData.append("imageFile", blob);
        resolve();
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(albumImage.file);
    });

    // 음원 파일 Blob 처리
    const musicFilePromises = albumTrackList.map((data) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const blob = new Blob([reader.result], { type: data.file.type });
          formData.append("musicFiles", blob);
          resolve();
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(data.file);
      });
    });

    Promise.all([imageFilePromise, ...musicFilePromises])
      .then(() => {
        return albumApi.uploadAlbum(formData);
      })
      .then((res) => {
        console.log("res: ", res);
        router.push(`/album/${res.data}`);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
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
          {albumTrackList.length > 0 &&
            albumTrackList.map((val, index) => (
              <MusicCard
                key={index}
                onClickEvent={() => console.log("ClickClick")}
                data={{
                  code: "index",
                  name: val.title,
                  playtime: val.playtime,
                  albumImage: albumImage.previewImgUrl,
                  artistName: val.artist,
                }}
                isEditable={false}
              ></MusicCard>
            ))}
          <CustomTextButton
            text="등록"
            fontColor="var(--color-background)"
            handleOnClickButton={registerAlbum}
            // border="2px soild white"
          />
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
            <div>
              <input type="checkbox" />
              title 여부
            </div>
            <CustomTextButton
              text="등록"
              fontColor="var(--color-background)"
              handleOnClickButton={handleAddTrackToAlbum}
              // border="2px soild white"
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
