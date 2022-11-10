'use client'

import { countries } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
    const [page, setPage] = useState(1)
    const [countries, setCountries] = useState<countries[]>([])

    useEffect(() => {
        const fetchFunc = async () => {
            const res = await fetch(`/api/getCountries?page=${page}`)
            setCountries(await res.json())
        }

        fetchFunc()
    }, [page])

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
