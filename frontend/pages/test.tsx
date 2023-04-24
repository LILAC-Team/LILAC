import { BasicImage } from "@/components/common/BasicImage/style";
import BasicText from "@/components/common/BasicText";
import React from "react";

const Test = () => {
  return (
    <>
      <BasicText text="테스트" color="#ffffff" font="" size={16} />
      <BasicImage
        src="https://i.namu.wiki/i/m60BZ35BZRrbiqpurjIPB7GAs74I2LPNXe0MuHeEemha3ksZzGJo21PfgIdXn6JXZV0Wnps6xiAMPCVb_BYIwMeDwGEtL1R9Sxe5lmGUb4ZlPMyUO-vxTNG-6RMTR23h-myh5DqQk0h38DUi-wxiUA.jpg"
        size={20}
      />
    </>
  );
};

export default Test;
