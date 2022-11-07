'use client'

import { countries } from '@prisma/client'
import { use } from 'react'
import { getBaseUrl } from '../../../helpers/getBaseUrl'
import { CountryDetails } from '../../../ui/CountryDetails'

const fetchFunc = async <T,>(name: string): Promise<T> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountry?name=${name}`)
    const data = await res.json()
    return data.country as T
}

interface Props {
    params: { name: string }
}
export default function Country({ params }: Props) {
    const country = use(fetchFunc<countries[][number]>(params.name))

    return (
        <div>
            <CountryDetails {...country} />
        </div>
    )
}
