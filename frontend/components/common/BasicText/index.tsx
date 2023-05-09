import * as S from "./style";

interface BasicTextProps {
  text: string;
  size?: string;
  color?: string;
  background?: string;
  clipText?: boolean;
  font?: string;
  isOverflow?: boolean;
}

const BasicText = ({
  text,
  size = "100%",
  color = "#ffffff",
  background = "transparent",
  clipText,
  font,
  isOverflow,
}: BasicTextProps) => {
  return (
    <S.Text
      size={size}
      color={color}
      background={background}
      clipText={clipText}
      font={font}
      isOverflow={isOverflow}
    >
      {text}
    </S.Text>
  );
};

export default BasicText;
