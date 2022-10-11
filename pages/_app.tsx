import '../styles/globals.css'
import { AppProps } from 'next/app'
import { trpc } from '../helpers/trpc'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
