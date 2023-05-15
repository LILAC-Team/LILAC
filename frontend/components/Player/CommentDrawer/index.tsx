import BasicText from "@/components/common/BasicText";
import * as S from "./style";
import React, { useState } from "react";
import CommentInput from "../CommentInput";
import CommentCard from "../CommentCard";
import { useSelector } from "react-redux";
import { setPlayList } from "@/store/modules/playList";
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

const CommentDrawer = () => {
  const [inputData, setInputData] = useState("");

  const changeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputData !== "") {
      console.log(inputData);
      setInputData("");
    }
  };

  const handleOnClick = () => {
    console.log(inputData);
    setInputData("");
  };

  const userInfo = useSelector((state: userState) => state.user);
  const currentTrackIndex = useSelector(
    (state: MusicControllerState) => state.playList.currentTrackIndex
  );
  const musicList = useSelector(
    (state: MusicControllerState) => state.playList.musicList
  );
  const currentTrack = musicList[currentTrackIndex];
  console.log(currentTrack);
  // const currSrc = useSelector((state) => state.playList);

  // GET All Comments
  const commentHandler = async () => {
    try {
      const { data } = await musicApi.getCommentList(currentTrack.code, 1);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("userInfo", userInfo);
  return (
    <S.Comment>
      <S.Top>
        <S.Bar />
        <BasicText text="Comment" size="125%" font="NotoSansKR500" />
      </S.Top>
      <S.InputAllWrap>
        <CommentInput
          src={userInfo.profileImage}
          value={inputData}
          handleOnChangeValue={changeInputData}
          handleOnKeyDownValue={handleKeyPress}
          handleOnClickValue={handleOnClick}
        />
      </S.InputAllWrap>
      <S.CommentAllWrap>
        {/* {comment.commentList.map((item, code) => {
          return (
            <React.Fragment key={code}>
              <CommentCard
                src={item.userInfo.profileImage}
                nickname={item.userInfo.nickname}
                time={item.presentTime}
                content={item.content}
                isMine={item.userInfo.email === userInfo.email ? true : false}
              />
            </React.Fragment>
          );
        })} */}
      </S.CommentAllWrap>
    </S.Comment>
  );
};

export default CommentDrawer;
