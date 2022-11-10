'use client'

import { countries } from '@prisma/client'
import { EditForm } from '../../../ui/EditForm'
import { useEffect, useState } from 'react'

interface Props {
    params: { name: string }
}
export default function Country({ params }: Props) {
    const [country, setCountry] = useState<countries>()
    const [, setRerender] = useState(false)

    useEffect(() => {
        const fetchFunc = async () => {
            const res = await fetch(`/api/getCountry?name=${params.name}`)
            setCountry(await res.json())
        }

        fetchFunc().then(() => setRerender(true))
    }, [params.name])

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
