import AlbumCard from "@/components/common/AlbumCard";
import BasicImage from "@/components/common/BasicImage";
import BasicText from "@/components/common/BasicText";
import React, { useState } from "react";
import { useRouter } from "next/router";
import test from "./test.json";
import CustomTextButton from "@/components/common/CustomTextButton";
import CustomIconButton from "@/components/common/CustomIconButton";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import MusicCard from "@/components/Player/MusicCard";

const Test = () => {
  const router = useRouter();
  const tmpStyle = {
    display: "flex",
  };
  const btnStyle = {
    width: "50rem",
  };
  const tmpFunction = () => {
    router.push("/");
  };
  return (
    <>
      <BasicText
        text="테스트"
        // color="transparent"
        // background="linear-gradient(0deg, rgba(216,194,254,1) 0%, rgba(204,164,252,1) 35%, rgba(61,58,75,1) 100%)"
        font=""
        // clip={true}
        size="2rem"
      />
      <BasicImage
        src="https://i.namu.wiki/i/m60BZ35BZRrbiqpurjIPB7GAs74I2LPNXe0MuHeEemha3ksZzGJo21PfgIdXn6JXZV0Wnps6xiAMPCVb_BYIwMeDwGEtL1R9Sxe5lmGUb4ZlPMyUO-vxTNG-6RMTR23h-myh5DqQk0h38DUi-wxiUA.jpg"
        size="15rem"
        radius={10}
        isRotate={true}
      />
      <Wrap>
        {test.releasedAlbumList.map((item) => {
          return (
            <MusicCard
              key={item.code}
              onClickEvent={tmpFunction}
              data={item}
              isEditable={true}
            />
          );
        })}
      </Wrap>
      <Wrapper>
        {test.releasedAlbumList.map((item) => {
          return (
            <AlbumCard
              key={item.code}
              onClickEvent={tmpFunction}
              data={item}
              showAlbumDetail={true}
            />
          );
        })}
      </Wrapper>
      <Wrapper>
        <CustomTextButton
          text="생성"
          size="2rem"
          font=""
          fontColor="#ffffff"
          // border="5px dashed green"
          // isBackground={false}
          // isDisabled={true}
          handleOnClickButton={tmpFunction}
        />
      </Wrapper>
      <Wrapper>
        <CustomIconButton
          color="#d47a7a"
          size="5rem"
          // border="5px dashed black"
          // isDisabled={true}
          handleOnClickButton={tmpFunction}
        >
          <AiOutlinePlus color="#ffffff" size="5rem" />
        </CustomIconButton>
      </Wrapper>
    </>
  );
};

export default Test;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Wrap = styled.div`
  justify-content: center;
  width: 100%;
`;
