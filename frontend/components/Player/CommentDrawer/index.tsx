import BasicText from "@/components/common/BasicText";
import * as S from "./style";
import React, { useEffect, useState, useCallback } from "react";
import CommentInput from "../CommentInput";
import CommentCard from "../CommentCard";
import { useSelector } from "react-redux";
import { musicApi } from "@/api/utils/music";

interface userState {
  user: any;
}

interface MusicControllerState {
  playList: {
    playing: boolean;
    currentTrackIndex: number;
    currSrc: string;
    musicList: MusicTrack[];
    listSize: number;
  };
}

interface MusicTrack {
  name: string;
  artistName: string;
  playtime: number;
  code: string;
  albumImage: string;
}

interface Comment {
  code: string;
  content: string;
  presentTime: number;
  createdTime: string;
  memberInfo: {
    nickname: string;
    profileImage: string;
    email: string;
  };
}

interface CommentListResponse {
  commentList: Comment[];
  totalPages: number;
  totalElements: number;
  number: number;
  first: boolean;
  last: boolean;
}

const initialCommentList: CommentListResponse = {
  commentList: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  first: true,
  last: true,
};

const CommentDrawer = () => {
  const [inputData, setInputData] = useState("");
  const userInfo = useSelector((state: userState) => state.user);

  // GET All Comments
  const [nowCommentList, setNowCommentList] =
    useState<CommentListResponse>(initialCommentList);
  const [nowPage, setNowPage] = useState(1);

  const commentHandler = useCallback(async () => {
    try {
      // const { data } = await musicApi.getCommentList(currentTrack.code, nowPage);
      const { data } = await musicApi.getCommentList(
        "da798686-10a7-428b-a154-10f34ddd5034",
        nowPage
      );
      setNowCommentList(data);
    } catch (error) {
      console.log(error);
    }
  }, [nowPage]);

  useEffect(() => {
    commentHandler();
  }, [commentHandler]);

  // POST New Comment
  const [nowTime, setNowTime] = useState(65);

  const newCommentHandler = useCallback(
    async (comment: string) => {
      try {
        // await musicApi.postRegisterComment(
        //   currentTrack.code,
        //   { content: comment, presentTime: nowTime }
        // );
        await musicApi.postRegisterComment(
          "da798686-10a7-428b-a154-10f34ddd5034",
          {
            content: comment,
            presentTime: nowTime,
          }
        );
        commentHandler();
      } catch (error) {
        console.log(error);
      }
    },
    [commentHandler]
  );

  // DELETE Comment
  const deleteCommentHandler = useCallback(
    async (code: string) => {
      try {
        // await musicApi.deleteComment(
        //   currentTrack.code, code);
        await musicApi.deleteComment(
          "da798686-10a7-428b-a154-10f34ddd5034",
          code
        );
        setTimeout(() => commentHandler(), 1000);
      } catch (error) {
        console.log(error);
      }
    },
    [commentHandler]
  );

  // CHANGE InputData
  const changeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  // PRESS Enter Key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputData !== "") {
      console.log(inputData);
      newCommentHandler(inputData);
      setInputData("");
    }
  };

  // ONCLICK Button
  const handleOnClick = () => {
    console.log(inputData);
    newCommentHandler(inputData);
    setInputData("");
  };

  return (
    <S.Comment>
      <S.Top>
        <S.Bar />
        <BasicText text="Comment" size="125%" font="NotoSansKR500" />
      </S.Top>
      <S.InputAllWrap>
        <CommentInput
          nowTime={nowTime}
          src={userInfo.profileImage}
          value={inputData}
          handleOnChangeValue={changeInputData}
          handleOnKeyDownValue={handleKeyPress}
          handleOnClickValue={handleOnClick}
        />
      </S.InputAllWrap>
      <S.CommentAllWrap>
        {nowCommentList.commentList.map((item, code) => {
          return (
            <React.Fragment key={code}>
              <CommentCard
                handler={() => deleteCommentHandler(item.code)}
                code={item.code}
                src={item.memberInfo.profileImage}
                nickname={item.memberInfo.nickname}
                time={item.presentTime}
                content={item.content}
                isMine={item.memberInfo.email === userInfo.email ? true : false}
              />
            </React.Fragment>
          );
        })}
      </S.CommentAllWrap>
    </S.Comment>
  );
};

export default CommentDrawer;
