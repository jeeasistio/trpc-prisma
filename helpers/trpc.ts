import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from '../pages/api/trpc/[trpc]'
import superjson from 'superjson'

const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : 'http://localhost:3000/api/trpc'

export const trpc = createTRPCNext<AppRouter>({
    config({ ctx }) {
        return {
            links: [httpBatchLink({ url })],
            transformer: superjson,
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        staleTime: 60,
                    },
                },
            },
        }
    },
    ssr: false,
})
