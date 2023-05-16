import * as S from "./style";
import { useEffect, useState } from "react";
import BasicText from "@/components/common/BasicText";
import CustomIconButton from "@/components/common/CustomIconButton";
import { BsFillSendFill } from "react-icons/bs";
import ProfileImg from "@/components/common/ProfileImg";

interface CommentInputProps {
  src: string;
  value: string;
  nowTime: number;
  handleOnChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyDownValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnClickValue: React.MouseEventHandler<HTMLButtonElement>;
}

const CommentInput = ({
  src,
  value,
  nowTime,
  handleOnChangeValue,
  handleOnKeyDownValue,
  handleOnClickValue,
}: CommentInputProps) => {
  const [convertTime, setConvertTime] = useState("");

  useEffect(() => {
    const min = (nowTime - (nowTime % 60)) / 60;
    const seconds = nowTime % 60;
    setConvertTime(`${min} : ${seconds}`);
  }, [nowTime]);

  return (
    <S.CommentInput>
      <S.InputImg>
        <ProfileImg src={src} />
      </S.InputImg>
      <S.InputWrap>
        <S.Input
          type='text'
          value={value}
          onChange={handleOnChangeValue}
          onKeyDown={handleOnKeyDownValue}
          placeholder='댓글을 입력하세요'
        />
        <S.InputTime>
          <BasicText
            text={convertTime}
            color='#929292'
            size='0.75rem'
            font='NotoSansKR400'
          />
        </S.InputTime>
        <S.CommentBtn>
          <CustomIconButton handleOnClickButton={handleOnClickValue}>
            <BsFillSendFill color='black' />
          </CustomIconButton>
        </S.CommentBtn>
      </S.InputWrap>
    </S.CommentInput>
  );
};

export default CommentInput;
