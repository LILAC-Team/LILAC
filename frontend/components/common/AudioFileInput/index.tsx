import * as S from "./style";

const AudioFileInput = () => {
  return (
    <>
      <S.AudioInput>
        <label htmlFor="audioInput" id="audioLabel">
          업로드할 음원을 선택하세요.
        </label>
        <S.InputWrap id="audioInput" />
      </S.AudioInput>
    </>
  );
};

export default AudioFileInput;
