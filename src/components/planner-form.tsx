import { useRouter } from "next/router";
import React, { useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import { findHoliday } from "utils/dates/holiday";
import { getFirstDate, getLastDate, MONTH } from "utils/dates/month";
import { getWeekLabel } from "utils/dates/weeks";

/**
 * weeks name layout styled
 */
const WeekNameLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  cursor: default;
  box-sizing: border-box;
  position: relative;
  &.title {
    & div {
      padding: 5px;
    }
  }
  & > div {
    padding: 5px;
    box-shadow: 1px 1px 1px 0px #ccc;
    position: relative;
    &:nth-child(1),
    &:nth-child(7n + 1) {
      color: ${(props) => props.theme.color.red};
    }
    &:nth-child(7n) {
      color: ${(props) => props.theme.color.blue};
    }
    &:hover {
      &:not(.noHover) {
      }
    }
    &.holiday {
      color: red;
    }
  }
`;

const PlanMonly = styled.div`
  min-height: 150px;
  overflow: overlay;
  cursor: text;
  &:hover {
    background: #d9d9d96b;
  }
  & span {
    padding: 0 7px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  & div {
    display: inline-flex;
    position: absolute;
    text-align: justify;
    font-family: "Poor Story";
    color: black;
    line-height: 0;
    text-shadow: 0px 0px 5px orangered;
    cursor: pointer;
    &:after {
      content: "x";
      position: absolute;
      right: -10px;
      top: 0;
      bottom: 0;
      cursor: pointer;
    }
  }
`;

/**
 * get weeks name
 * @param {LangType} lang language type
 * @returns {string[]} weeks array
 */
const wkTitle: string[] = getWeekLabel(0);

const PlannerForm = () => {
  const router = useRouter();

  const refs = useRef<HTMLElement[]>([]);

  const year: string = useMemo(() => router!.query["year"], [router]) as string;
  const month: string = useMemo(
    () => router!.query["month"],
    [router]
  ) as string;

  const getPlanMonth = (year: string, month: string) => {
    const firstDate = getFirstDate(year as string, MONTH[month]);
    const lastDate = getLastDate(year as string, MONTH[month]);

    const emptyCnt = firstDate.getDay();
    let tmpMonth: number[] = [];
    for (let i = 0; i < emptyCnt; i++) {
      tmpMonth.push(0);
    }
    const dateCnt = lastDate.getDate();
    for (let i = 1; i <= dateCnt; i++) {
      tmpMonth.push(i);
    }
    return tmpMonth;
  };

  const dates: number[] = useMemo(() => {
    const { year, month } = router.query;
    return getPlanMonth(year as string, month as string);
  }, [router]);

  const onClick = useCallback((e) => WritingHandler(e), []);

  const WritingHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const divTarget = e.currentTarget;

    if (target === divTarget) {
      if (!target.id.match("edit")) {
        const cX = e.clientX;
        const cY = e.clientY;

        const pX = divTarget.parentElement!.offsetLeft;
        const pY = divTarget.parentElement!.offsetTop;

        const dX = divTarget.offsetLeft;
        const dY = divTarget.offsetTop;

        const x = cX - pX - dX;
        const y = cY - pY - dY;

        const w = divTarget.offsetWidth;

        const PConId = target.id.replace("id", "Con");
        const div = document.createElement("div");
        div.style.left = `${x - 10}px`;
        div.style.top = `${y - 20}px`;
        div.style.width = `${w - x}px`;
        div.style.background = "red";
        div.style.height = `22px`;
        div.style.lineHeight = "1em";
        div.style.zIndex = "999";
        div.classList.add("editor");
        div.style.userSelect = "none";
        div.id = `edit-${PConId}-${new Date().getTime()}`;
        div.contentEditable = "true";

        divTarget.appendChild(div);
        div.focus();
      }
    } else {
      const id = target.dataset.itemid;
      if (id === "planDate") {
        return;
      }
    }
  };

  const addHoliday = (date: number) => {
    const holiday = findHoliday(month, date);
    return holiday ? "holiday" : "";
  };

  /**
   *
   * @param ele div element
   * @returns refs
   */
  const addToRefs = (ele: HTMLDivElement) => refs.current.push(ele);

  return (
    <>
      <WeekNameLayout className="title">
        {wkTitle.map((nm, i) => (
          <div key={i} className="noHover">
            {nm}
          </div>
        ))}
      </WeekNameLayout>
      <WeekNameLayout>
        {dates.map((d, i) => (
          <PlanMonly
            onClick={d ? onClick : undefined}
            ref={(e: HTMLDivElement) => addToRefs(e)}
            key={`P-${year}-${month}-${d}-${i}`}
            id={`Pid-${year}-${month}-${d}-${i}`}
            className={addHoliday(d)}
          >
            <span data-itemid="planDate">{d ? d : ""}</span>
          </PlanMonly>
        ))}
      </WeekNameLayout>
    </>
  );
};

export default PlannerForm;
