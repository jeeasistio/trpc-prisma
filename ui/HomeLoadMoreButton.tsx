'use client'

export const HomeLoadMoreButton = ({ children, cursor }: { cursor?: string | number}) => {
    return (
        <div>
            <button onClick={() => {cursor}}>Load more</button>
        </div>
    )
}
