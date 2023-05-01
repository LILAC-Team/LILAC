import { isReadable } from "stream";
import * as S from "./style";

interface BasicInputProps {
  id: string;
  type: string;
  value: string;
  handleOnChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isReadOnly?: boolean;
}

const BasicInput = ({
  id,
  type,
  value,
  handleOnChangeValue,
  placeholder = "",
  isReadOnly = false,
}: BasicInputProps) => {
  return (
    <S.Input
      id={id}
      type={type}
      value={value}
      onChange={handleOnChangeValue}
      placeholder={placeholder}
      readOnly={isReadOnly}
    />
  );
};

export default BasicInput;
