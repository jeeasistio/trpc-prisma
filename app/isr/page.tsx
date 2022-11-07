import { countries } from '@prisma/client'
import Link from 'next/link'
import { getBaseUrl } from '../../helpers/getBaseUrl'

const fetchFunc = async <T,>(): Promise<{ countries: T; time: string }> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries`, { next: { revalidate: 60 } })
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

            <div>
                {countries.map((country) => (
                    <div key={country.name}>
                        <Link href={`/isr/${country.name}`}>
                            <p>{country.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
