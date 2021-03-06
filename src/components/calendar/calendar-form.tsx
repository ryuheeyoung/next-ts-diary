import styled from "styled-components";
import { MONTH } from "utils/dates/month";
import { getWeekLabel } from "utils/dates/weeks";

/**
 * Monthly layout styled
 */
const MonthlyLayout = styled.div``;
/**
 * Month title styled
 */
const MonthTitle = styled.div`
  cursor: default;
  text-align: center;
  padding-bottom: 1.25em;
`;
/**
 * weeks name layout styled
 */
const WeekNameLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  text-align: center;
  cursor: default;
  &.title {
    padding-bottom: 10px;
  }
  & div {
    padding: 5px;
    &:nth-child(1),
    &:nth-child(7n + 1) {
      color: red;
    }
    &:nth-child(7n) {
      color: blue;
    }
    &:hover {
      &:not(.noHover) {
        background: #e6e6e6;
      }
    }
  }
`;

/**
 * calendar-form component props types
 */
type PropsType = {
  m: string;
  dates: number[];
};

/**
 * get weeks name
 * @param {LangType} lang language type
 * @returns {string[]} weeks array
 */
const wkTitle: string[] = getWeekLabel(0);

const CalendarForm = ({ m, dates }: PropsType) => {
  return (
    <MonthlyLayout>
      <MonthTitle>{MONTH[m] + 1}월</MonthTitle>
      <WeekNameLayout className="title">
        {wkTitle.map((nm, i) => (
          <div key={i} className="noHover">
            {nm}
          </div>
        ))}
      </WeekNameLayout>
      <WeekNameLayout>
        {dates.map((d, i) => (
          <div key={`${m}-${d}-${i}`} className={!d ? "noHover" : ""}>
            {d || ""}
          </div>
        ))}
      </WeekNameLayout>
    </MonthlyLayout>
  );
};

export default CalendarForm;
