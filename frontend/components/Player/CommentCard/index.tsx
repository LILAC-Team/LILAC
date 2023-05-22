import ProfileImg from "@/components/common/ProfileImg";
import * as S from "./style";
import { useState, useEffect } from "react";
import BasicText from "@/components/common/BasicText";
import CustomIconButton from "@/components/common/CustomIconButton";
import { FaTimes } from "react-icons/fa";
import SmallModal from "@/components/common/CommonModal/SmallModal";
import CustomTextButton from "@/components/common/CustomTextButton";
import BasicImage from "@/components/common/BasicImage";
import { musicApi } from "@/api/utils/music";

interface CommentCardProps {
  code: string;
  src: string;
  nickname: string;
  time: number;
  content: string;
  isMine: boolean;
  handler?: (code: string) => void;
}

const CommentCard = ({
  code,
  src,
  nickname,
  time,
  content,
  isMine,
  handler,
}: CommentCardProps) => {
  const [convertTime, setConvertTime] = useState("");

  useEffect(() => {
    setConvertTime(
      (time - (time % 60)) / 60 +
        " : " +
        (time % 60 >= 10 ? time % 60 : "0" + (time % 60))
    );
  }, [time]);

  // isRealDelete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // After AddAlbum
  const [changeNext, setChangeNext] = useState(false);

  useEffect(() => {
    if (changeNext) {
      handler(code);
      setTimeout(() => setChangeNext(false), 1000);
      setTimeout(() => setIsDeleteModalOpen(false), 1000);
      // setChangeNext(false);
    }
  }, [changeNext]);

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
            <CustomIconButton
              size="2rem"
              handleOnClickButton={() => setIsDeleteModalOpen(true)}
            >
              <FaTimes color="#F68888" size={20} />
            </CustomIconButton>
          </S.CommentDelete>
        )}
        {isDeleteModalOpen && (
          <SmallModal
            handleSetShowModal={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            <S.ModalContainer>
              {!changeNext ? (
                <>
                  <S.ModalText>
                    <BasicText
                      text="정말 삭제하시겠습니까?"
                      size="1.5rem"
                      color="black"
                    />
                  </S.ModalText>
                  <S.ModalBtn>
                    <CustomTextButton
                      text="삭제"
                      handleOnClickButton={() => {
                        setChangeNext(true);
                      }}
                    />
                  </S.ModalBtn>
                </>
              ) : (
                <S.ModalLine>
                  <S.ModalIcon>
                    <BasicImage
                      isAlbumPage={true}
                      src="/icons/favicon-512x512.png"
                    />
                  </S.ModalIcon>
                  <S.ModalText>
                    <BasicText text="삭제완료" size="1.5rem" color="black" />
                  </S.ModalText>
                  <S.ModalIcon>
                    <BasicImage
                      isAlbumPage={true}
                      src="/icons/favicon-512x512.png"
                    />
                  </S.ModalIcon>
                </S.ModalLine>
              )}
            </S.ModalContainer>
          </SmallModal>
        )}
      </S.CommentDivWrap>
    </S.CommentCard>
  );
};

export default CommentCard;
