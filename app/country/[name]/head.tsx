interface Props {
    params: { name: string }
}

export default function Head({ params }: Props) {
    return <title>{params.name}</title>
}
