'use client'

import { countries } from '@prisma/client'
import Link from 'next/link'
import { use } from 'react'
import { getBaseUrl } from '../../helpers/getBaseUrl'

const fetchFunc = async <T,>(): Promise<T> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries`)
    const data = await res.json()
    return data.countries as T
}

export default function Home() {
    const countries = use(fetchFunc<countries[]>())

    return (
        <div>
            {countries.map((country) => (
                <div key={country.name}>
                    <Link href={`/csr/${country.name}`}>
                        <p>{country.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}
