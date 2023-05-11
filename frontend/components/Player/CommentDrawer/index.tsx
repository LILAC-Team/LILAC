import BasicText from "@/components/common/BasicText";
import * as S from "./style";
import React, { useState } from "react";
import CommentInput from "../CommentInput";
import CommentCard from "../CommentCard";
import comment from "../../../pages/comment.json";
import { useSelector } from "react-redux";

interface userState {
  user: any;
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
        {comment.commentList.map((item, code) => {
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
        })}
      </S.CommentAllWrap>
    </S.Comment>
  );
};

export default CommentDrawer;
