'use client'

import { countries } from '@prisma/client'
import { use, useState } from 'react'
import { getBaseUrl } from '../../helpers/getBaseUrl'
import { CountryList } from '../../ui/CountryList'
import ClientLoadMore from '../../ui/ClientLoadMore'

const fetchFunc = async <T,>(page?: number): Promise<T> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries?page=${page}`)
    const data = await res.json()
    return data.countries as T
}

export default function Home() {
    const [page, setPage] = useState(1)
    const countries = use(fetchFunc<countries[]>(page))

    const handleLoadMore = () => {
        setPage((prev) => prev + 1)
    }

    return (
        <div>
            <CountryList path="csr" countries={countries} />
            <ClientLoadMore handleLoadMore={handleLoadMore} />
        </div>
    )
}
