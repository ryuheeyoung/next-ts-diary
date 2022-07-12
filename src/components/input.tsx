import styled from "styled-components";

type InputProps = {
  key: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  className: string[];
};

interface InputStypeProps {
  x?: number;
  y?: number;
  w?: number;
}

const InputStyled = styled.div<InputStypeProps>`
  left: ${(props) => `${props.x! - 10}px`};
  top: ${(props) => `${props.y! - 10}px`};
  width: ${(props) => `${props.w! - props.x!}px`};
  background: red;
  height: 22px;
  line-height: 1em;
  zindex: 999;
  user-select: none;
  &.editor {
  }
`;

const Input = ({ key, x, y, w, ...props }: InputProps) => {
  return <InputStyled key={key} contentEditable></InputStyled>;
};

export default Input;
