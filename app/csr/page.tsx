'use client'

import { countries } from '@prisma/client'
import { use } from 'react'
import { getBaseUrl } from '../../helpers/getBaseUrl'
import { CountryList } from '../../ui/CountryList'

const fetchFunc = async <T,>(): Promise<T> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountries`)
    const data = await res.json()
    return data.countries as T
}

export default function Home() {
    const countries = use(fetchFunc<countries[]>())

    return (
        <div>
            <CountryList page="csr" countries={countries} />
        </div>
    )
}
