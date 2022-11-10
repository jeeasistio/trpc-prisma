'use client'

import { countries } from '@prisma/client'
import { EditForm } from '../../../ui/EditForm'
import { useEffect, useState } from 'react'

// const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

// const fetchFunc = async <T,>(name: string): Promise<T> => {
//     const res = await fetch(`${baseUrl}/api/getCountry?name=${name}`)
//     const data = await res.json()
//     return data.country as T
// }

// interface Props {
//     params: { name: string }
// }
// export default function Country({ params }: Props) {
//     const { name, capital, continent, id, population, region } = use(fetchFunc<countries[][number]>(params.name))

//     return (
//         <div>
//             <h1>{name}</h1>
//             <p>Capital: {capital}</p>
//             <p>Continent: {continent}</p>
//             <p>Region: {region}</p>
//             <p>Population: {population}</p>

//             <EditForm country={{ name, capital, continent, population, region, id }} />
//         </div>
//     )
// }

interface Props {
    params: { name: string }
}
export default function Country({ params }: Props) {
    const [country, setCountry] = useState<countries>()

    useEffect(() => {
        const fetchFunc = async () => {
            const res = await fetch(`/api/getCountry?name=${params.name}`)
            setCountry(await res.json())
        }

        fetchFunc()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country])

    return (
        <div>
            {country && (
                <>
                    <h1>{country.name}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Continent: {country.continent}</p>
                    <p>Region: {country.region}</p>
                    <p>Population: {country.population}</p>

                    <EditForm
                        country={{
                            name: country.name,
                            capital: country.capital,
                            continent: country.continent,
                            population: country.population,
                            region: country.region,
                            id: country.id,
                        }}
                    />
                </>
            )}
        </div>
    )
}
