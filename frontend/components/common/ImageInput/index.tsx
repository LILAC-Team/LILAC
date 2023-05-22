import * as S from "./style";

interface ImageInputProps {
  src: string | ArrayBuffer;
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ src, onChangeEvent }: ImageInputProps) => {
  return (
    <>
      <S.ImageWrap src={src} onChange={onChangeEvent}>
        <label htmlFor="imageInput">
          {(src === undefined || src === "") && (
            <>
              <S.IconWrap>+</S.IconWrap>
              <S.textWrap>앨범 커버를 등록하세요.</S.textWrap>
            </>
          )}
        </label>
        <S.InputWrap
          id="imageInput"
          type="file"
          accept="image/*"
          defaultValue=""
        />
      </S.ImageWrap>
    </>
  );
};

export default ImageInput;
