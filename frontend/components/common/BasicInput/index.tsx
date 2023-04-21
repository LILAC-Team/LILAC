import * as S from "./style";

const BasicInput = ({
  id,
  type,
  value,
  handleOnChangeValue,
  placeholder = "",
  isReadOnly = false,
}: {
  id: any;
  type: any;
  value: any;
  handleOnChangeValue: any;
  placeholder: any;
  isReadOnly: any;
}) => {
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
