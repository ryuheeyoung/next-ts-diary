import PlannerForm from "components/planner-form";
import theme from "components/styles/theme";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { MONTH } from "utils/dates/month";

/**
 * calendar layout styled
 */
const PlanMonthLayout = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-color: ${(props) => props.theme.color.grey100};
  box-shadow: 2px 2px 5px ${(props) => props.theme.color.grey000};
  position: relative;
`;
/**
 * calendar year title styled
 */
const PlanMonthTitle = styled.p`
  text-align: center;
  padding: 2.5em;
  cursor: default;
`;

const PlanMonth = () => {
  const router = useRouter();

  const month: string = useMemo(
    () => router!.query["month"],
    [router]
  ) as string;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poor+Story"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <PlanMonthLayout>
          <PlanMonthTitle>{MONTH[month] + 1} 월</PlanMonthTitle>
          <PlannerForm />
        </PlanMonthLayout>
      </ThemeProvider>
    </>
  );
};

export default PlanMonth;
