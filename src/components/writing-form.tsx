import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export type WriteType = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  type: "auto" | "default";
};

const width = `calc(100% - 2px - 1em);`;
const PaletteLayout = styled.div`
  displlay: block;
  width: ${width};
  margin: 0 auto;
  height: 40px;
  background: ${(props) => props.theme.color.grey100};
  border: 1px solid ${(props) => props.theme.color.grey500};
`;
const EditorLayout = styled.textarea<WriteType>`
  display: block;
  ${(props) => (props.type === "auto" ? `width: ${width}; height: 40%;` : "")}
  display: block;
  margin: 0 auto;
  padding: 0;
  border: 1px solid ${(props) => props.theme.color.grey500};
  resize: none;
  outline: none;
`;

const WritingForm = ({ type = "auto", cols, rows, ...props }: WriteType) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      console.log("hello", ref.current);
      (ref.current as HTMLTextAreaElement).focus();
    }
  }, [props]);

  return (
    <>
      {/* <PaletteLayout></PaletteLayout> */}
      <EditorLayout
        ref={ref as any}
        type={type}
        cols={cols}
        rows={rows}
        {...props}
      ></EditorLayout>
    </>
  );
};

export default WritingForm;
