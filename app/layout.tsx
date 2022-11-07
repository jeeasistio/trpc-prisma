import { Nav } from '../ui/Nav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head></head>
            <body>
                <Nav />
                {children}
            </body>
        </html>
    )
}
