import * as S from "./style";

interface AudioFileInputProps {
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudioFileInput = ({ onChangeEvent }: AudioFileInputProps) => {
  return (
    <>
      <S.AudioInput onChange={onChangeEvent}>
        <label htmlFor="audioInput">업로드할 음원을 선택하세요.</label>
        <S.InputWrap
          id="audioInput"
          type="file"
          accept="audio/*"
          defaultValue=""
        />
      </S.AudioInput>
    </>
  );
};

export default AudioFileInput;
