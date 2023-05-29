import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";
import {wrapper} from "@/store/store";
import {RouterTransition} from "@/router/OlaRouterTransition";
import {Notifications} from "@mantine/notifications";

function App({Component, pageProps}: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{colorScheme: 'light'}}
    >
      <Notifications/>
      <RouterTransition/>
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default wrapper.withRedux(App);

