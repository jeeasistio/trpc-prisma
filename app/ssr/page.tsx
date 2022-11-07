import { countries } from '@prisma/client'
import Link from 'next/link'
import { getBaseUrl } from '../../helpers/getBaseUrl'

const fetchFunc = async <T,>(): Promise<T> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries`, { cache: 'no-store' })
    const data = await res.json()
    return data.countries as T
}

export default async function Home() {
    const countries = await fetchFunc<countries[]>()

    return (
        <div>
            <div>
                {countries.map((country) => (
                    <div key={country.name}>
                        <Link href={`/ssr/${country.name}`}>
                            <p>{country.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
