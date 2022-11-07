import { countries } from '@prisma/client'
import { getBaseUrl } from '../../../helpers/getBaseUrl'
import { CountryDetails } from '../../../ui/CountryDetails'

const fetchFunc = async <T,>(name: string): Promise<{ country: T; time: string }> => {
    const res = await fetch(`${getBaseUrl()}/api/getCountry?name=${name}`, { cache: 'no-store' })
    const data = await res.json()
    return {
        country: data.country as T,
        time: new Date().toLocaleString(),
    }
}

interface Props {
    params: { name: string }
}
export default async function Country({ params }: Props) {
    const { country, time } = await fetchFunc<countries[][number]>(params.name)

    return (
        <div>
            <h3>{time}</h3>
            <CountryDetails {...country} />
        </div>
    )
}
