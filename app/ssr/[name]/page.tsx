import { countries } from '@prisma/client'
import { getBaseUrl } from '../../../helpers/getBaseUrl'

const fetchFunc = async <T,>(name: string): Promise<T> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountry?name=${name}`, { cache: 'no-store' })
    const data = await res.json()
    return data.country as T
}

interface Props {
    params: { name: string }
}
export default async function Country({ params }: Props) {
    const country = await fetchFunc<countries[][number]>(params.name)
    return (
        <div>
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