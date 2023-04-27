import * as S from "./style";
import React from "react";

interface BasicImageProps {
  src: string;
  size?: string;
  radius?: number;
  isRotate?: boolean;
}

const BasicImage = ({
  src,
  size = "100%",
  radius = 1,
  isRotate = false,
}: BasicImageProps) => {
  return (
    <S.BasicImage src={src} size={size} radius={radius} isRotate={isRotate} />
  );
};

export default BasicImage;
