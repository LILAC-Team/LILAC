import * as S from "./style";
import React from "react";

interface BasicImageProps {
  src: string;
  size: number;
  radius?: number;
}

const index = ({ src, size, radius }: BasicImageProps) => {
  return <S.BasicImage src={src} size={size} radius={radius} />;
};

export default index;
