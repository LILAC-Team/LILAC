import AlbumCard from "@/components/common/AlbumCard";
import { BasicImage } from "@/components/common/BasicImage/style";
import BasicText from "@/components/common/BasicText";
import React from "react";
import { useRouter } from "next/router";
import test from "./test.json";

const Test = () => {
  const router = useRouter();
  const tmpStyle = {
    display: "flex",
  };
  const tmpFunction = () => {
    router.push("/");
  };
  return (
    <>
      <BasicText text="테스트" color="#ffffff" font="" size={2} />
      <BasicImage
        src="https://i.namu.wiki/i/m60BZ35BZRrbiqpurjIPB7GAs74I2LPNXe0MuHeEemha3ksZzGJo21PfgIdXn6JXZV0Wnps6xiAMPCVb_BYIwMeDwGEtL1R9Sxe5lmGUb4ZlPMyUO-vxTNG-6RMTR23h-myh5DqQk0h38DUi-wxiUA.jpg"
        size={20}
        radius={10}
        isRotate={true}
      />
      <div style={tmpStyle}>
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
      </div>
    </>
  );
};

export default Test;
