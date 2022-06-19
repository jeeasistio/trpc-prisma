import * as trpc from '@trpc/server';
import { getAllCountries, getCountry } from '../helpers/queries';
import superjson from 'superjson'

const appRouter = trpc.router()
.transformer(superjson)
.query('getAllCountries', {
    input: () => {},
    async resolve() {
        return await getAllCountries()
    }
})
.query('getCountry', {
    input: (val: string) => val,
    async resolve({ input }) {
        return await getCountry(input)
    }
});

export default appRouter