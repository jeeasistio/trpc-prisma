import { countries } from '@prisma/client'
import { getBaseUrl } from '../../helpers/getBaseUrl'
import { CountryList } from '../../ui/CountryList'
import SSRLoadMore from '../../ui/SSRLoadMore'

const fetchFunc = async <T,>(page?: number): Promise<{ countries: T; time: string }> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries?page=${page}`, { cache: 'no-store' })
    const data = await res.json()
    return {
        countries: data.countries as T,
        time: new Date().toLocaleString(),
    }
}

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
    const { countries, time } = await fetchFunc<countries[]>(Number(searchParams.page ?? 1))
    const lastPage = Number(searchParams.page ?? 1)

    return (
        <div>
            <h3>{time}</h3>
            <CountryList page="ssr" countries={countries} />
            <SSRLoadMore newPage={lastPage + 1} />
        </div>
    )
}
