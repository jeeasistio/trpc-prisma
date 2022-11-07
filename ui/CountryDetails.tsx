'use client'

import { countries } from '@prisma/client'
import { useState } from 'react'
import { EditForm } from './EditForm'

export const CountryDetails = ({ name, capital, continent, population, region, id }: countries) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Continent: {continent}</p>
            <p>Region: {region}</p>
            <p>Population: {population}</p>

            <div>
                {isEditing && <button onClick={() => setIsEditing(false)}>Cancel</button>}
                {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
            </div>

            {isEditing && <EditForm country={{ name, capital, continent, population, region, id }} />}
        </div>
    )
}
