import { countries } from '@prisma/client'
import { getBaseUrl } from '../../helpers/getBaseUrl'
import { CountryList } from '../../ui/CountryList'

const fetchFunc = async <T,>(): Promise<{ countries: T; time: string }> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries`, { cache: 'no-store' })
    const data = await res.json()
    return {
        countries: data.countries as T,
        time: new Date().toLocaleString(),
    }
}

export default async function Home() {
    const { countries, time } = await fetchFunc<countries[]>()

    return (
        <div>
            <h3>{time}</h3>
            <CountryList page="ssr" countries={countries} />
        </div>
    )
}
