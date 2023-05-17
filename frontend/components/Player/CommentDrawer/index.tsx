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
import { useSelector } from "react-redux";
import { musicApi } from "@/api/utils/music";
import { commentListState } from "@/store/modules/commentList";
import { playListState } from "@/store/modules/playList";
interface playerState {
  playList: playListState;
}
interface userState {
  user: any;
}

interface MusicControllerState {
  loop: boolean;
  playing: boolean;
  shuffle: boolean;
  OnSeekToZero: boolean;
  currentTrackIndex: number;
  currPlayingMusicInfo: MusicTrack;
  musicList: object;
  shuffleArr: number[];
  musicListSize: number;
  listSize: number;
}

interface MusicTrack {
  index: number;
  name: string;
  artistName: string;
  playtime: number;
  code: string;
  albumImage: string;
  src: string;
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
  // const listRef = useRef(null);

  // useLayoutEffect(() => {
  //   const detectMobileKeyboard = () => {
  //     if (document.activeElement.tagName === "INPUT") {
  //       listRef.current.scrollIntoView({ block: "end" });
  //     }
  //   };

  //   window.addEventListener("resize", detectMobileKeyboard);

  //   return () => window.removeEventListener("resize", detectMobileKeyboard);
  // }, []);
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
      console.log("please", currPlayingMusicInfo);
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
    console.log(currPlayingMusicInfo);
    commentHandler();
  }, [currPlayingMusicInfo]);

  // POST New Comment
  const newCommentHandler = useCallback(
    async (comment: string, time: number) => {
      try {
        console.log("content", comment, "presentTime", time);
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
    if (e.key === "Enter" && inputData !== "") {
      console.log(inputData);
      newCommentHandler(inputData, time);
      setInputData("");
    }
  };

  // ONCLICK Button
  const handleOnClick = () => {
    console.log(inputData);
    newCommentHandler(inputData, time);
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
          nowTime={time}
          src={userInfo.profileImage}
          value={inputData}
          handleOnChangeValue={changeInputData}
          handleOnKeyDownValue={handleKeyPress}
          handleOnClickValue={handleOnClick}
        />
      </S.InputAllWrap>
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
    </S.Comment>
  );
};

export default CommentDrawer;
