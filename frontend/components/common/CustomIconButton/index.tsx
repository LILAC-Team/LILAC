import * as S from "./style";

interface CustomIconButtonProps {
  color?: string;
  size?: string;
  children: React.ReactNode;
  border?: string;
  isDisabled?: boolean;
  handleOnClickButton: () => void;
}

const CustomIconButton = ({
  color = "transparent",
  size = "100%",
  children,
  border = "none",
  isDisabled = false,
  handleOnClickButton,
}: CustomIconButtonProps) => {
  return (
    <S.CustomIconButton
      color={color}
      size={size}
      border={border}
      isDisabled={isDisabled}
      onClick={handleOnClickButton}
    >
      {children}
    </S.CustomIconButton>
  );
};

export default CustomIconButton;
