import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import NextNProgress from "nextjs-progressbar";
import { wrapper } from "@/store/store";
import { Provider } from "react-redux";
import React from "react";
import { Windmill } from "@roketid/windmill-react-ui";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;
  return (
    <Provider store={store}>
      <NextNProgress />
      <Windmill usePreferences={true}>
        <Toaster />
        <QueryParamProvider adapter={NextAdapter}>
          <Component {...props.pageProps} />
        </QueryParamProvider>
      </Windmill>
    </Provider>
  );
}

export default MyApp;
