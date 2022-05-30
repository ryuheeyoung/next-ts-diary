import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { getFirstDate, getLastDate, MONTH } from "utils/dates/month";
import { getWeekLabel } from "utils/dates/weeks";
import Drawer from "./drawer-form";

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
  const [showDrawer, setShowDrawer] = useState(false);

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

  const WritingHandler = (e) => {
    console.log((window["foo"] = e));
    const target = e.target;
    const divTarget = e.currentTarget;

    if (target === divTarget) {
      const cX = e.clientX;
      const cY = e.clientY;

      const pX = divTarget.parentElement.offsetLeft;
      const pY = divTarget.parentElement.offsetTop;

      const dX = divTarget.offsetLeft;
      const dY = divTarget.offsetTop;

      const x = cX - pX - dX;
      const y = cY - pY - dY;

      setShowDrawer(true);

      const PConId = target.id.replace("id", "Con");
      const div = document.createElement("div");
      div.style.left = `${x}px`;
      div.style.top = `${y}px`;
      div.id = `${PConId}-${new Date().getTime()}`;
      div.innerText = "hello";

      divTarget.appendChild(div);
    } else {
      const id = target.dataset.itemid;
      if (id === "planDate") {
        return;
      }
      console.log(target);
    }
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
            onClick={onClick}
            ref={(e: HTMLDivElement) => addToRefs(e)}
            key={`P-${year}-${month}-${d}-${i}`}
            id={`Pid-${year}-${month}-${d}-${i}`}
          >
            <span data-itemid="planDate">{d ? d : ""}</span>
          </PlanMonly>
        ))}
      </WeekNameLayout>
      <Drawer visible={showDrawer}></Drawer>
    </>
  );
};

export default PlannerForm;
