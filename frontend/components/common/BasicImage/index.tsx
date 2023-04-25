import * as S from "./style";
import React from "react";

interface BasicImageProps {
  src: string;
  size: number;
  radius?: number;
  isRotate?: boolean;
}

const BasicImage = ({ src, size, radius, isRotate }: BasicImageProps) => {
  return (
    <S.BasicImage src={src} size={size} radius={radius} isRotate={isRotate} />
  );
};

export default BasicImage;
