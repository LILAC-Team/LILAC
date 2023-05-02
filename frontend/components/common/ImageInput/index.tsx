import * as S from "./style";

const ImageInput = () => {
  return (
    <>
      <S.ImageWrap>
        <label htmlFor="imageInput">
          <S.IconWrap>+</S.IconWrap>
        </label>
        <S.textWrap>앨범 커버를 등록하세요.</S.textWrap>
        <S.InputWrap id="imageInput" name="imageInput" type="image" />
      </S.ImageWrap>
    </>
  );
};

export default ImageInput;
