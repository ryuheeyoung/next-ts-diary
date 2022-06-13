import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";

const PutAni = (x: number, y: number) => keyframes`
  0% {
    transform: translate(-100%, -100%;);
    width 20px;
    height: 150px;
    top: ${y}px;
    left: ${x}px;
    }
  100% {
    width: 480px;
    height: 720px;
  }
`;
const BookLayout = styled.div<{ x?: number; y?: number }>`
  height: 150px;
  width: 20px;
  overflow: hidden;
  margin: 5px 1px 0px;
  padding: 5px;
  text-align: center;
  background: #71efb0;
  transition: 0.5s;
  & > div {
    transition: none;
    background: ${(props) => props.theme.color.white};
    width: 100%;
    height: 100%;
    writing-mode: vertical-lr;
    line-height: 18px;
    font-size: medium;
  }

  &:hover {
    box-shadow: 0 0 2px 1px #00793c;
    width: 22px;
    height: 155px;
    margin: 5px 3px -5px;
    transform: none;
  }
  &.put {
    opacity: 0;
    & ~ div:not(#block, .show) {
      transform: rotate(-12deg) translate(-15px, -5px);
    }
  }
  &.show {
    animation: ${(props) => PutAni(props.x!, props.y!)} 0.8s;
    animation-fill-mode: forward;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 720px;
    box-shadow: 5px 5px 5px ${(props) => props.theme.color.grey400};
    z-index: 1;
    & > div {
      writing-mode: horizontal-tb;
      width: 80%;
      margin: 2em auto;
      height: 20%;
      line-height: 2;
      text-underline-offset: 2px;
      text-decoration-line: underline;
    }
  }
`;

const BookSelf = () => {
  const router = useRouter();

  const [show, setShow] = useState<HTMLDivElement>();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      let ele = e.target as HTMLDivElement;
      if (ele.hasChildNodes()) {
        ele = ele.parentElement as HTMLDivElement;
      }
      setShow(ele);
    },
    [show]
  );

  const onMove = useCallback(() => {
    console.log(show!.id);
    router.push(show!.id);
  }, [show]);

  return (
    <>
      {["1990", "1991", "1992", "1993", "1994", "2020", "2021", "2022"].map(
        (y) => (
          <BookLayout
            key={y}
            id={y}
            className={show?.id === y ? "put" : ""}
            onClick={onClick}
          >
            <div>{y} Diary</div>
          </BookLayout>
        )
      )}
      {show && (
        <>
          <BookLayout
            key={`show-${show.id}`}
            className={"show"}
            x={show.offsetLeft}
            y={show.offsetHeight}
            onClick={onMove}
          >
            <div aria-readonly>{show.id} Diary</div>
          </BookLayout>
        </>
      )}
    </>
  );
};

export default BookSelf;
