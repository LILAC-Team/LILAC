import * as S from "./style";

interface BasicTextProps {
  text: string;
  size?: string;
  color?: string;
  background?: string;
  clip?: boolean;
  font: string;
}

const BasicText = ({
  text,
  size = "100%",
  color = "#ffffff",
  background = "transparent",
  clip,
  font,
}: BasicTextProps) => {
  return (
    <S.Text
      size={size}
      color={color}
      background={background}
      clip={clip}
      font={font}
    >
      {text}
    </S.Text>
  );
};

export default BasicText;
