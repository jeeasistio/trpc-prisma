'use client'

import { countries } from '@prisma/client'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

const cachedFetches: Record<string, countries[]> = {}
const cachedFetch = async (url: string) => {
    if (!cachedFetches[url]) {
        cachedFetches[url] = await fetchFunc<countries[]>(url)
    }
    return cachedFetches[url]
}

const fetchFunc = async <T,>(url: string): Promise<T> => {
    const res = await fetch(url)
    return await res.json()
}

export default function CSR() {
    const [page, setPage] = useState(1)
    const countries = use(cachedFetch(`${baseUrl}/api/getCountries?page=${page}`))

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

// export default function Home() {
//     const [page, setPage] = useState(1)
//     const [countries, setCountries] = useState<countries[]>([])

//     useEffect(() => {
//         const fetchFunc = async () => {
//             const res = await fetch(`/api/getCountries?page=${page}`)
//             setCountries(await res.json())
//         }

//         fetchFunc()
//     }, [page])

//     const handleLoadMore = () => {
//         setPage((prev) => prev + 1)
//     }

//     return (
//         <div>
//             {countries.map((country) => (
//                 <Link key={country.name} href={`/csr/${country.name}`}>
//                     <p>{country.name}</p>
//                 </Link>
//             ))}
//             <button onClick={handleLoadMore}>Load More</button>
//         </div>
//     )
// }
