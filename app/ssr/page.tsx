import { countries } from '@prisma/client'
import { getBaseUrl } from '../../helpers/getBaseUrl'
import { CountryList } from '../../ui/CountryList'
import SSRLoadMore from '../../ui/SSRLoadMore'

const fetchFunc = async <T,>(cursor?: number): Promise<{ countries: T; time: string }> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries?cursor=${cursor}`, { cache: 'no-store' })
    const data = await res.json()
    return {
        countries: data.countries as T,
        time: new Date().toLocaleString(),
    }
}

export default async function Home({ searchParams }: { searchParams: { cursor?: string } }) {
    const { countries, time } = await fetchFunc<countries[]>(Number(searchParams.cursor))
    const lastItem = countries.pop()

    return (
        <div>
            <h3>{time}</h3>
            <CountryList page="ssr" countries={countries} />
            <SSRLoadMore newCursor={lastItem?.id} />
        </div>
    )
}
