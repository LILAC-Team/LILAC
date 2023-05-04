import ProfileImg from "@/components/common/ProfileImg";
import * as S from "./style";
import { useState, useEffect } from "react";
import BasicText from "@/components/common/BasicText";
import CustomIconButton from "@/components/common/CustomIconButton";
import { MdDelete } from "react-icons/md";

interface CommentCardProps {
  src: string;
  nickname: string;
  time: number;
  content: string;
  isMine: boolean;
}

const CommentCard = ({
  src,
  nickname,
  time,
  content,
  isMine,
}: CommentCardProps) => {
  const [convertTime, setConvertTime] = useState("");

  const handleDelete = () => {
    console.log("delete");
  };
  useEffect(() => {
    setConvertTime(
      (time - (time % 60)) / 60 +
        " : " +
        (time % 60 >= 10 ? time % 60 : "0" + (time % 60))
    );
  }, [time]);

  return (
    <S.CommentCard>
      <S.CommentImg>
        <ProfileImg src={src} />
      </S.CommentImg>
      <S.CommentDivWrap>
        <S.CommentDiv>
          <S.CommentInfoTop>
            <S.CommentNick>
              <BasicText text={nickname} font="NotoSansKR700" />
            </S.CommentNick>
            <S.CommentTime>
              <BasicText
                text={convertTime}
                font="NotoSansKR400"
                color="#979797"
                size="75%"
              />
            </S.CommentTime>
          </S.CommentInfoTop>
          <S.CommentInfoBottom>
            <S.CommentContent>
              <BasicText text={content} size="90%" />
            </S.CommentContent>
          </S.CommentInfoBottom>
        </S.CommentDiv>
        {isMine && (
          <S.CommentDelete>
            <CustomIconButton handleOnClickButton={handleDelete}>
              <MdDelete color="#ffffff" size="2.5rem" />
            </CustomIconButton>
          </S.CommentDelete>
        )}
      </S.CommentDivWrap>
    </S.CommentCard>
  );
};

export default CommentCard;
