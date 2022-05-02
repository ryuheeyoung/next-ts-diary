import { useEffect, useState } from "react";
import styled from "styled-components";
import { getWeekLabel } from "utils/models/weeks";

const CalendarLayout = styled.div`
  width: 100%;
  height: 80vh;
  border-color: #e6e6e6;
  box-shadow: 2px 2px 5px #ccc;
`;

const Calendar = () => {
  const [wkTitle, setWkTitle] = useState<Array<string>>();

  useEffect(() => {
    const label = getWeekLabel(0);
    setWkTitle(label);
  }, []);

  return (
    <CalendarLayout>{wkTitle && wkTitle.map((t) => <p>{t}</p>)}</CalendarLayout>
  );
};

export default Calendar;
