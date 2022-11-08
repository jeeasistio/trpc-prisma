'use client'

import { useRouter } from 'next/navigation'

export default function SSRLoadMore({ oldCursor, newCursor }: { oldCursor?: number; newCursor?: number }) {
    const router = useRouter()
    const handleLoadMore = () => {
        oldCursor = newCursor
        router.refresh()
        console.log(oldCursor)
    }

    return <button onClick={handleLoadMore}>Load More</button>
}
