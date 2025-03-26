import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

import { CartProvider } from './[slug]/menu/contexts/cart'

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'NX Donalds',
    description: 'Powered by NAXX',
    icons: {
        icon: 'https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <head>
                <link
                    rel="icon"
                    href="https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy"
                />
            </head>
            <body className={`${poppins.className} antialiased`}>
                <CartProvider>{children}</CartProvider>

                <Toaster />
            </body>
        </html>
    )
}
