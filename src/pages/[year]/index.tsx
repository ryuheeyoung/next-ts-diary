import CalendarForm from "components/calendar-form";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { getFirstDate, getLastDate, MONTH } from "utils/dates/month";

/**
 * calendar layout styled
 */
const CalendarLayout = styled.div`
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
const CalendarYear = styled.p`
  text-align: center;
  padding: 2.5em;
  cursor: default;
`;
/**
 * calendar > monthly outter styled
 */
const MonthlyLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 25px 50px;
  padding: 0 50px 50px;
`;

type MonthlyType = {
  [k: string]: number[];
};

const month_list = Object.keys(MONTH); // all month list

const Calendar = () => {
  const {
    query: { year },
  } = useRouter();

  /**
   * 해당연월별 날짜배열 구하기
   * @returns 날짜배열
   */
  const getMonthly = (year: string): MonthlyType => {
    let mth: MonthlyType = Object.fromEntries(month_list.map((m) => [m, []]));
    month_list.forEach((m) => {
      const firstDate = getFirstDate(year as string, MONTH[m]);
      const lastDate = getLastDate(year as string, MONTH[m]);

      const emptyCnt = firstDate.getDay();
      let tmpMonth: number[] = [];
      for (let i = 0; i < emptyCnt; i++) {
        tmpMonth.push(0);
      }
      const dateCnt = lastDate.getDate();
      for (let i = 1; i <= dateCnt; i++) {
        tmpMonth.push(i);
      }
      mth[m] = [...tmpMonth];
    });
    return mth;
  };

  const monthly: { [k: string]: number[] } = useMemo(
    () => getMonthly(year as string),
    [year]
  ); // 연월별 날짜배열 변수

  return (
    <CalendarLayout>
      <CalendarYear>{year}년</CalendarYear>
      <MonthlyLayout>
        {month_list.map((m, i) => (
          <CalendarForm key={`${m}-${i}`} m={m} dates={monthly[m]} />
        ))}
      </MonthlyLayout>
    </CalendarLayout>
  );
};

export default Calendar;
