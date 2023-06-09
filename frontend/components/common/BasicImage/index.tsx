import * as S from "./style";
import React from "react";

interface BasicImageProps {
  src: string;
  size?: string;
  radius?: number;
  isRotate?: boolean;
  isAlbumPage?: boolean;
}

const BasicImage = ({
  src,
  size = "100%",
  radius = 1,
  isRotate = false,
  isAlbumPage = false,
}: BasicImageProps) => {
  return (
    <>
      {src.startsWith("images/") ? (
        <S.BasicImage
          src={process.env.CLOUDFRONT_URL + src}
          size={size}
          radius={radius}
          isRotate={isRotate}
        />
      ) : (
        <S.BasicImage
          src={src !== "" ? src : "/icons/favicon-512x512.png"}
          size={size}
          radius={radius}
          isRotate={isRotate}
        />
      )}
    </>
  );
};

export default BasicImage;
