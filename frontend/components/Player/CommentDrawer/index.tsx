import BasicText from "@/components/common/BasicText";
import * as S from "./style";
import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import CommentInput from "../CommentInput";
import CommentCard from "../CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { musicApi } from "@/api/utils/music";
import { commentListState } from "@/store/modules/commentList";
import { playListState } from "@/store/modules/playList";
interface playerState {
  playList: playListState;
}
interface userState {
  user: any;
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
interface commentState {
  commentList: commentListState;
}

interface commentProps {
  time: number;
}
const CommentDrawer = ({ time }: commentProps) => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState("");
  const userInfo = useSelector((state: userState) => state.user);
  const { currPlayingMusicInfo } = useSelector(
    (state: playerState) => state.playList
  );

  // GET All Comments
  const [nowCommentList, setNowCommentList] =
    useState<CommentListResponse>(initialCommentList);
  const [nowPage, setNowPage] = useState(1);

  const commentHandler = useCallback(async () => {
    try {
      const { data } = await musicApi.getCommentList(
        currPlayingMusicInfo.code,
        nowPage
      );
      setNowCommentList(data);
    } catch (error) {
      console.log(error);
    }
  }, [nowPage, currPlayingMusicInfo]);

  useEffect(() => {
    commentHandler();
  }, []);

  useEffect(() => {
    commentHandler();
  }, [currPlayingMusicInfo]);

  // POST New Comment
  const newCommentHandler = useCallback(
    async (comment: string, time: number) => {
      try {
        await musicApi.postRegisterComment(currPlayingMusicInfo.code, {
          content: comment,
          presentTime: time,
        });
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
        await musicApi.deleteComment(currPlayingMusicInfo.code, code);
        setTimeout(() => commentHandler(), 500);
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
    if (e.key === "Enter" && inputData.length !== 0) {
      newCommentHandler(inputData, time);
      setInputData("");
    }
  };

  // ONCLICK Button
  const handleOnClick = () => {
    if (inputData !== "") {
      newCommentHandler(inputData, time);
      setInputData("");
    }
  };
  return (
    <S.Comment>
      <S.Top>
        <S.Bar />
        <BasicText text='Comment' size='125%' font='NotoSansKR500' />
      </S.Top>
      <S.InputAllWrap>
        <CommentInput
          nowTime={time}
          src={userInfo.profileImage}
          value={inputData}
          handleOnChangeValue={changeInputData}
          handleOnKeyDownValue={handleKeyPress}
          handleOnClickValue={handleOnClick}
        />
      </S.InputAllWrap>
      <S.ContentWrap>
        <S.CommentAllWrap>
          {nowCommentList &&
            nowCommentList.commentList.map((item, code) => {
              return (
                <React.Fragment key={code}>
                  <CommentCard
                    handler={() => deleteCommentHandler(item.code)}
                    code={item.code}
                    src={item.memberInfo.profileImage}
                    nickname={item.memberInfo.nickname}
                    time={item.presentTime}
                    content={item.content}
                    isMine={
                      item.memberInfo.email === userInfo.email ? true : false
                    }
                  />
                </React.Fragment>
              );
            })}
        </S.CommentAllWrap>
      </S.ContentWrap>
    </S.Comment>
  );
};

export default CommentDrawer;
