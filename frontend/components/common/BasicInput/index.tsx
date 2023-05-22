import * as S from "./style";

interface BasicInputProps {
  id: string;
  type: string;
  value: string;
  color?: string;
  handleOnChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isReadOnly?: boolean;
}

const BasicInput = ({
  id,
  type,
  value,
  color = "white",
  handleOnChangeValue,
  placeholder = "",
  isReadOnly = false,
}: BasicInputProps) => {
  return (
    <S.Input
      id={id}
      type={type}
      value={value}
      color={color}
      onChange={handleOnChangeValue}
      placeholder={placeholder}
      readOnly={isReadOnly}
    />
  );
};

export default BasicInput;
