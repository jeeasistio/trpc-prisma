'use client'

import { countries } from '@prisma/client'
import { EditForm } from '../../../ui/EditForm'
import { use } from 'react'

interface Props {
    params: { name: string }
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

const fetchFunc = async <T,>(name: string): Promise<T> => {
    const res = await fetch(`${baseUrl}/api/getCountry?name=${name}`, { cache: 'no-store' })
    return await res.json()
}

const cachedFetches = new Map<string, Promise<any>>()

const queryClient = <QueryResult,>(name: string, query: () => Promise<QueryResult>): Promise<QueryResult> => {
    if (!cachedFetches.has(name)) cachedFetches.set(name, query())
    return cachedFetches.get(name)!
}

interface Props {
    params: { name: string }
}
export default function Country({ params }: Props) {
    const { name, capital, continent, id, population, region } = use(
        queryClient(`${params.name}`, () => fetchFunc<countries>(params.name))
    )

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
