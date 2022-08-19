import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

type InputValue = string | number | readonly string[] | undefined;
type InputChangeEvent = ChangeEvent<HTMLInputElement> | undefined;

interface Props {
  type: string;
  value?: InputValue;
  onChange?: Function;
}

const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  border: 2px solid #c9c9c9;
  border-radius: 5px;
  padding-left: 8px;
  font-size: 14px;
`;

const Input: React.FC<Props> = ({ type, value = "", onChange }) => {
  const [inputValue, setInputValue] = useState<InputValue>(value);

  const changeEvent = (ev: InputChangeEvent) => {
    setInputValue(ev!.target.value);
    onChange && onChange(ev);
    // onChange
  };

  return <StyledInput type={type} value={value} onChange={changeEvent} />;
};

export default Input;
