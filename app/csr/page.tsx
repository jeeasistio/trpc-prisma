'use client'

import { countries } from '@prisma/client'
import Link from 'next/link'
import { use, useState } from 'react'

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

const fetchFunc = async <T,>(page?: number): Promise<T> => {
    const res = await fetch(`${baseUrl}/api/getCountries?page=${page}`, { cache: 'no-store' })
    return await res.json()
}

const cachedFetches = new Map<number, Promise<any>>()

const queryClient = <QueryResult,>(page: number, query: () => Promise<QueryResult>): Promise<QueryResult> => {
    if (!cachedFetches.has(page)) cachedFetches.set(page, query())
    return cachedFetches.get(page)!
}

export default function CSR() {
    const [page, setPage] = useState(1)
    const countries = use(queryClient<countries[]>(page, () => fetchFunc<countries[]>(page)))

    const handleLoadMore = () => {
        setPage((prev) => prev + 1)
    }

    return (
        <div>
            {countries.map((country) => (
                <Link key={country.name} href={`/csr/${country.name}`}>
                    <p>{country.name}</p>
                </Link>
            ))}
            <button onClick={handleLoadMore}>Load More</button>
        </div>
    )
}
