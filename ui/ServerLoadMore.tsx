'use client'

import { useRouter } from 'next/navigation'

export default function ServerLoadMore({ path, newPage }: { path: '/' | 'ssr' | 'isr'; newPage?: number }) {
    const router = useRouter()
    const handleLoadMore = () => {
        router.replace(`/${path}?page=${newPage}`)
    }

    return <button onClick={handleLoadMore}>Load More</button>
}
