import { getAllCountries, getCountry } from '../helpers/queries'
import superjson from 'superjson'
import { z } from 'zod'

import { initTRPC } from '@trpc/server'
// You may rename the `t` variable to whatever you prefer.
// Just make sure you initialize your root variable once per application.
const t = initTRPC.create({ transformer: superjson, })
// We explicitly export the methods we use here
// This allows us to create reusable & protected base procedure
export const middleware = t.middleware
export const router = t.router
export const publicProcedure = t.procedure

const appRouter = router({
    getAllCountries: publicProcedure
        .input(
            z.object({
                name: z.string().optional(),
                cursor: z.number().nullish(),
            })
        )
        .query(async ({ input }) => {
            const limit = 5
            const name = input.name !== '' ? input.name : undefined
            const cursor = input.cursor ? { id: input.cursor } : undefined
            const cursorObject = input.cursor ? cursor : undefined
            const skip = input.name === '' ? 1 : 0

            const countries = await getAllCountries({ take: limit, cursor: cursorObject, skip, name })
            const nextCursor = countries.length === limit ? countries[limit - 1].id : undefined

            return {
                countries,
                nextCursor,
            }
        }),
    getCountry: publicProcedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .query(async ({ input }) => {
            return await getCountry(input.name)
        }),
})

export default t.mergeRouters(appRouter)
