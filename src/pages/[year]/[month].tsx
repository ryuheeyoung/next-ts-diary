import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { getFirstDate, getLastDate, MONTH } from "utils/dates/month";
import { getWeekLabel } from "utils/dates/weeks";

/**
 * calendar layout styled
 */
const PlanMonthLayout = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-color: #e6e6e6;
  box-shadow: 2px 2px 5px #ccc;
`;
/**
 * calendar year title styled
 */
const PlanMonthTitle = styled.p`
  text-align: center;
  padding: 2.5em;
  cursor: default;
`;

/**
 * weeks name layout styled
 */
const WeekNameLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  cursor: default;
  box-sizing: border-box;
  &.title {
    & div {
      padding: 5px;
    }
  }
  & > div {
    padding: 5px;
    box-shadow: 1px 1px 1px 0px #ccc;
    &:nth-child(1),
    &:nth-child(7n + 1) {
      color: red;
    }
    &:nth-child(7n) {
      color: blue;
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
  & span {
    padding: 0 7px;
    border-bottom: 1px solid #ccc;
  }
  & div {
    display: block;
  }
`;

/**
 * get weeks name
 * @param {LangType} lang language type
 * @returns {string[]} weeks array
 */
const wkTitle: string[] = getWeekLabel(0);

const PlanMonth = () => {
  const router = useRouter();

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

  return (
    <PlanMonthLayout>
      <PlanMonthTitle>{MONTH[month] + 1} 월</PlanMonthTitle>
      <WeekNameLayout className="title">
        {wkTitle.map((nm, i) => (
          <div key={i} className="noHover">
            {nm}
          </div>
        ))}
      </WeekNameLayout>
      <WeekNameLayout>
        {dates.map((d, i) => (
          <PlanMonly key={`P-${month}-${d}-${i}`}>
            <span>{d ? d : ""}</span>
            <div></div>
          </PlanMonly>
        ))}
      </WeekNameLayout>
    </PlanMonthLayout>
  );
};

export default PlanMonth;
