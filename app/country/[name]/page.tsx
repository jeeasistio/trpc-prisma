import { getCountry } from '../../../helpers/queries'
import { CountryDetails } from '../../../ui/CountryDetails'

interface Props {
    params: { name: string }
}
export default async function Country({ params }: Props) {
    const country = await getCountry(params.name)
    return (
        <div>
            <CountryDetails {...country} />
        </div>
    )
}
