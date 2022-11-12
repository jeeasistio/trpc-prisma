'use client'

import { countries } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './../styles/EditForm.module.css'

const fields = ['capital', 'continent', 'region', 'population'] as const

interface FormBody extends Omit<countries, 'id' | 'name'> {}
interface DataBody extends Omit<countries, 'name'> {}

const fetchFunc = async (body: DataBody, callback: () => void) => {
    const res = await fetch('/api/updateCountry', {
        method: 'PUT',
        body: JSON.stringify(body),
    })
    const data = await res.json()
    if (callback) callback()
    return data
}

export const EditForm = ({ country, callback }: { country: countries; callback?: () => void }) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [data, setData] = useState<FormBody>({
        capital: country.capital,
        continent: country.continent,
        population: country.population,
        region: country.region,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const mutateCallback = () => {
        if (callback) callback()
        router.refresh()
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetchFunc({ ...data, id: country.id, population: Number(data.population) }, mutateCallback)
    }

    return (
        <div>
            <div>
                {isEditing && <button onClick={() => setIsEditing(false)}>Cancel</button>}
                {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    {fields.map((field) => (
                        <div key={field} className={styles.textfieldCtn}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                            <input id={field} type="text" value={data[field]} onChange={handleChange} name={field} />
                        </div>
                    ))}

                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )
}
