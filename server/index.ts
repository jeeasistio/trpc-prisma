import * as trpc from '@trpc/server'
import { getAllCountries, getCountry } from '../helpers/queries'
import superjson from 'superjson'
import { z } from 'zod'

const appRouter = trpc
    .router()
    .transformer(superjson)
    .query('getAllCountries', {
        input: z.object({
            name: z.string().optional(),
            cursor: z.string().nullish()
        }),
        async resolve({ input }) {
            const limit = 5
            const name = input.name !== '' ? input.name : undefined
            const cursor = input.cursor ? { id: input.cursor } : undefined
            const cursorObject = input.cursor !== '' ? cursor : undefined
            const skip = input.name === '' ? 1 : 0

            const countries = await getAllCountries(name, limit, cursorObject, skip)
            const nextCursor = countries.length === limit ? countries[limit - 1].id : undefined

            return {
                countries,
                nextCursor
            }
        }
    })
    .query('getCountry', {
        input: (val: string) => val,
        async resolve({ input }) {
            return await getCountry(input)
        }
    })

export default appRouter
