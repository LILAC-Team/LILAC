import * as S from "./style";

interface BasicTextProps {
  text: string;
  size?: string;
  color: string;
  font: string;
}

const BasicText = ({ text, size = "100%", color, font }: BasicTextProps) => {
  return (
    <S.Text size={size} color={color} font={font}>
      {text}
    </S.Text>
  );
};

export default BasicText;
