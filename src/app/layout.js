import {Quicksand} from 'next/font/google';

import './globals.css';

import {ThemeProvider} from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const quickSand = Quicksand({subsets: ['latin'], variable: '--font-quick-sand', weight: '400', display: 'swap'})

export const metadata = {
    title: 'Fardin Kamal',
    description: 'Official website of Fardin Kamal',
}

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="icon" href="/favicon.ico"/>
        </head>
        <body className={`${quickSand.className} bg-white dark:bg-black dark:text-white`}>
            <ThemeProvider attribute={'class'}>
                {children}
                <Analytics />
            </ThemeProvider>
        </body>
        </html>
    )
}
