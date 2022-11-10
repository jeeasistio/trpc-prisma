import { getAllCountries, getCountry } from '../../../helpers/queries'
import { EditForm } from '../../../ui/EditForm'

export const revalidate = 10

interface Props {
    params: { name: string }
}

export default async function Country({ params }: Props) {
    const { name, capital, continent, id, population, region } = await getCountry(params.name)

    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Continent: {continent}</p>
            <p>Region: {region}</p>
            <p>Population: {population}</p>

            <EditForm country={{ name, capital, continent, population, region, id }} />
        </div>
    )
}

export async function generateStaticParams() {
    const countries = await getAllCountries({})

    return countries.map((country) => ({
        name: country.name,
    }))
}
