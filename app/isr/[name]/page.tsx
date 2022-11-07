import { countries } from '@prisma/client'
import { getBaseUrl } from '../../../helpers/getBaseUrl'
import { getAllCountries } from '../../../helpers/queries'

const fetchFunc = async <T,>(name: string): Promise<{ country: T; time: string }> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountry?name=${name}`, { next: { revalidate: 60 } })
    const data = await res.json()
    return {
        country: data.country as T,
        time: new Date().toLocaleString(),
    }
}

interface Props {
    params: { name: string }
}
export default async function Country({ params }: Props) {
    const { country, time } = await fetchFunc<countries[][number]>(params.name)
    return (
        <div>
            <h3>{time}</h3>

            {country && (
                <div>
                    <h1>{country.name}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Continent: {country.continent}</p>
                    <p>Region: {country.region}</p>
                    <p>Population: {country.population}</p>
                </div>
            )}
        </div>
    )
}

export async function generateStaticParams() {
    const countries = await getAllCountries({ take: 100 })

    return countries.map((country) => ({
        name: country.name,
    }))
}
