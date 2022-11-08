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

let cursor: number | undefined = 0

export default async function Home() {
    const { countries, time } = await fetchFunc<countries[]>(cursor)
    const lastItem = countries.pop()

    return (
        <div>
            <h3>{time}</h3>
            <CountryList page="ssr" countries={countries} />
            <SSRLoadMore oldCursor={cursor} newCursor={lastItem?.id} />
        </div>
    )
}
