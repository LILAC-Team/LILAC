import * as S from "./style";
import React, { useEffect, useState } from "react";
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
import BasicImage from "@/components/common/BasicImage";
import { resize } from "@/api/func/resize";
interface ProfileState {
  previewImgUrl: any;
  file: any;
}

const Form = () => {
  const [isMusic, setIsMusic] = useState(false);
  const [isAlbum, setIsAlbum] = useState(false);
  const [isAlbumImage, setIsAlbumImage] = useState(false);
  const [isAlbumMusic, setIsAlbumMusic] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [albumTitle, setAlbumTitle] = useState("");
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
      setIsAlbumImage(false);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const str = reader.result;
        setAlbumImage({ previewImgUrl: str, file: files[0] });
      };
      setIsAlbumImage(true);
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
            isTitle: isTitle,
            playtime: Math.ceil(audioBuffer.duration),
            file: files[0],
          });
        });
      };
      fileReader.readAsArrayBuffer(files[0]);
      setIsModalOpen(true);
    }
  };

  const handleAlbumTitleOnChange = (e) => {
    setAlbumTitle(e.target.value);
    if (e.target.value !== "") setIsAlbum(true);
    else setIsAlbum(false);
  };

  const handleCurrTrackInfoOnChange = (e) => {
    setCurrTrackInfo({ ...currTrackInfo, [e.target.id]: e.target.value });
  };

  const handleTitle = (check: boolean) => {
    setCurrTrackInfo({ ...currTrackInfo, isTitle: check });
  };

  useEffect(() => {
    handleTitle(isChecked);
  }, [isChecked]);

  useEffect(() => {
    if (currTrackInfo.artist !== "" && currTrackInfo.title !== "") {
      setIsMusic(true);
    } else {
      setIsMusic(false);
    }
  }, [currTrackInfo]);

  const handleAddTrackToAlbum = () => {
    setAlbumTrackList([...albumTrackList, currTrackInfo]);
    setCurrTrackInfo({
      title: "",
      artist: "",
      isTitle: false,
      playtime: 0,
      file: {},
    });
    setIsModalOpen(false);
    setIsChecked(false);
    setIsAlbumMusic(true);
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
        musicIndex: index + 1,
        isTitle: data.isTitle,
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
        setTimeout(() => router.push(`/album/${res.data}`), 1000);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    setTimeout(() => setIsResultModalOpen(false), 3000);
  };

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

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
          <S.AddMusicWrap>
            <AudioFileInput onChangeEvent={handleAddAlbumTrack} />
          </S.AddMusicWrap>
          <S.CardsWrapper>
            {albumTrackList.length > 0 &&
              albumTrackList.map((val, index) => (
                <S.OneMusicCard key={index}>
                  <MusicCard
                    onClickEvent={() => console.log("")}
                    data={{
                      code: "index",
                      name: val.title,
                      playtime: val.playtime,
                      albumImage: albumImage.previewImgUrl,
                      artistName: val.artist,
                    }}
                    isEditable={false}
                    isTitle={val.isTitle}
                  />
                </S.OneMusicCard>
              ))}
          </S.CardsWrapper>
          <S.UploadButtonWrap>
            {isAlbum && isAlbumImage && isAlbumMusic ? (
              <CustomTextButton
                text="등록"
                font="NotoSansKR700"
                fontColor="var(--color-background)"
                handleOnClickButton={() => {
                  setIsResultModalOpen(true);
                  registerAlbum();
                }}
              />
            ) : (
              <CustomTextButton
                text="등록"
                font="NotoSansKR700"
                fontColor="var(--color-background)"
                handleOnClickButton={registerAlbum}
                isDisabled={true}
              />
            )}
          </S.UploadButtonWrap>
        </S.ContentWrap>
      </Layout>
      {isModalOpen && (
        <SmallModal
          handleSetShowModal={() => {
            setIsModalOpen(false);
          }}
        >
          <S.ModalContainer>
            <S.ModalSubject>
              <BasicText
                text="제목"
                size="1.25rem"
                color="var(--color-background)"
              />
            </S.ModalSubject>
            <S.ModalInput>
              <BasicInput
                id="title"
                type="text"
                color="var(--color-background)"
                value={currTrackInfo.title}
                handleOnChangeValue={handleCurrTrackInfoOnChange}
              />
            </S.ModalInput>
            <S.ModalSubject>
              <BasicText
                text="아티스트"
                size="1.25rem"
                color="var(--color-background)"
              />
            </S.ModalSubject>
            <S.ModalInput>
              <BasicInput
                id="artist"
                type="text"
                color="var(--color-background)"
                value={currTrackInfo.artist}
                handleOnChangeValue={handleCurrTrackInfoOnChange}
              />
            </S.ModalInput>
            <S.TitleInputDiv>
              <BasicText
                text="Title"
                size="1.25rem"
                color="var(--color-background)"
              />
              <S.TitleInput
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              />
            </S.TitleInputDiv>
            {isMusic ? (
              <CustomTextButton
                text="등록"
                font="NotoSansKR700"
                fontColor="var(--color-background)"
                handleOnClickButton={handleAddTrackToAlbum}
              />
            ) : (
              <CustomTextButton
                text="등록"
                font="NotoSansKR700"
                fontColor="var(--color-background)"
                handleOnClickButton={handleAddTrackToAlbum}
                isDisabled={true}
              />
            )}
          </S.ModalContainer>
        </SmallModal>
      )}
      {isResultModalOpen && (
        <SmallModal
          handleSetShowModal={() => {
            setIsResultModalOpen(false);
          }}
        >
          <S.ModalAllContainer>
            <S.ModalLine>
              <S.ModalIcon>
                <BasicImage src="/icons/favicon-512x512.png" />
              </S.ModalIcon>
              <S.ModalText>
                <BasicText text="업로드중입니다" size="1.5rem" color="black" />
              </S.ModalText>
              <S.ModalIcon>
                <BasicImage src="/icons/favicon-512x512.png" />
              </S.ModalIcon>
            </S.ModalLine>
          </S.ModalAllContainer>
        </SmallModal>
      )}
    </>
  );
};

export default Form;
