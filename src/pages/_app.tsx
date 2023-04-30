import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {MantineProvider} from "@mantine/core";

export default function App({Component, pageProps}: AppProps) {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colors: {
                  blue: ['#e0edfc', '#b3d2f8', '#80b5f4', '#4d97f0', '#2680ec', '#006ae9', '#0062e6', '#0057e3', '#004ddf', '#003cd9']
                },
                colorScheme: 'light',
            }}
        >
            <Component {...pageProps} />
        </MantineProvider>
    )
}
