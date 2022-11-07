import { getCountry } from '../../../helpers/queries'

interface Props {
    params: { name: string }
}
export default async function Country({ params }: Props) {
    const country = await getCountry(params.name)
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
