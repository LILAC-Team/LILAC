import { useState } from "react";
import CircularJSON from "circular-json";
import ImageInput from "@/components/common/ImageInput";
import AudioFileInput from "@/components/common/AudioFileInput";
import BasicInput from "@/components/common/BasicInput";
import Layout from "@/components/common/Layout";
import * as S from "./style";
import BasicText from "@/components/common/BasicText";

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

  return (
    <Layout>
      <S.ContentWrap>
        <ImageInput />
        <S.AlbumTitleWrap>
          <BasicInput
            id="nickname"
            type="text"
            value={albumTitle}
            handleOnChangeValue={() => console.log("흠")}
          />
        </S.AlbumTitleWrap>
        <S.ContentTitleWrap>
          <BasicText text="음원목록" size="1.5rem" font="NotoSansKR700" />
        </S.ContentTitleWrap>
        <AudioFileInput />
      </S.ContentWrap>
    </Layout>
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
