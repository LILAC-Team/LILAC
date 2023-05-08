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
import { albumApi } from "@/api/utils/album";

interface ProfileState {
  // previewImgUrl: string | ArrayBuffer;
  // file: File | {};
  previewImgUrl: any;
  file: any;
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
    isTitle: false,
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
    if (e.target.value === "") {
      setCurrTrackInfo({ title: "", artist: "", isTitle: false, file: {} });
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

  const handleAddTrackToAlbum = () => {
    setAlbumTrackList([currTrackInfo, ...albumTrackList]);
    setCurrTrackInfo({ title: "", artist: "", isTitle: false, file: {} });
    setIsModalOpen(false);
  };

  const registerAlbum = async () => {
    const formData = new FormData();
    const arr: Object[] = new Array();
    const reader = new FileReader();

    // 앨범 정보
    arr.push({ name: albumTitle });
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

    formData.append("musicList", JSON.stringify(arr));

    // 앨범 이미지 정보
    await reader.readAsArrayBuffer(albumImage.file);
    const blob = new Blob([reader.result], {
      type: albumImage.file.type,
    });
    formData.append("imageFile", blob);

    await albumTrackList.map(async (data, index) => {
      await reader.readAsArrayBuffer(data.file);
      const blob = new Blob([reader.result], {
        type: albumImage.file.type,
      });
      formData.append("musicFiles", blob);
    });
    console.log("헤헤헤헤");
    // albumApi
    //   .uploadAlbum(formData)
    //   .then((res) => {
    //     console.log("res: ", res);
    //   })
    //   .catch((err) => {
    //     console.log("err: ", err);
    //   });
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
          {/* <MusicCard
            onClickEvent={() => console.log("ClickClick")}
            data={{ name: "name", albumImage: "", nickname: "nickname" }}
            isEditable={true}
          /> */}

          {albumTrackList.length > 0 &&
            albumTrackList.map((val, index) => (
              <MusicCard
                key={index}
                onClickEvent={() => console.log("ClickClick")}
                data={{
                  code: "index",
                  name: val.title,
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
            <div></div>
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
