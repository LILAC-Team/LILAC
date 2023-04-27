import * as S from "./style";

interface BasicTextProps {
  text: string;
  size?: string;
  color?: string;
  background?: string;
  clipText?: boolean;
  font?: string;
}

const BasicText = ({
  text,
  size = "100%",
  color = "#ffffff",
  background = "transparent",
  clipText,
  font,
}: BasicTextProps) => {
  return (
    <S.Text
      size={size}
      color={color}
      background={background}
      clipText={clipText}
      font={font}
    >
      {text}
    </S.Text>
  );
};

export default BasicText;
