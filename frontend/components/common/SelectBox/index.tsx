import * as S from "./style";
import { useState } from "react";

const SelectBox = ({ children, list, funcArr }) => {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <S.SelectBox>
      <S.Label>
        <div>{children}</div>
      </S.Label>
      {isDropdown &&
        list.map((data, index) => {
          <S.SelectOptions>
            <S.Option onClick={funcArr[index]}>{data}</S.Option>
          </S.SelectOptions>;
        })}
    </S.SelectBox>
  );
};

export default SelectBox;
