import Layout from "components/layout";
import theme from "components/styles/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { ComponentType } from "react";

type CompProps = AppProps["Component"] & {
  Layout?: ComponentType;
};

const App = ({ Component, pageProps }: AppProps & { Component: CompProps }) => {
  const ComputedLayout = Component.Layout || Layout;

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="width=device-width" />
        <title>HeeApp</title>
      </Head>
      <ThemeProvider theme={theme}>
        <ComputedLayout>
          <Component {...pageProps} />
        </ComputedLayout>
      </ThemeProvider>
    </>
  );
};

export default App;
