import {Quicksand} from 'next/font/google';

import './globals.css';

import {ThemeProvider} from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const quickSand = Quicksand({subsets: ['latin'], variable: '--font-quick-sand', weight: '400', display: 'swap'})

export const metadata = {
    title: 'Fardin Kamal | Software Engineer',
    description: 'Official website of Fardin Kamal. Explore projects, blogs, experience, and achievements.',
    keywords: ['Fardin Kamal', 'Software Engineer', 'Developer', 'Blogger', 'Portfolio', 'Projects', 'Blogs', 'Experience', 'Achievements'],
    openGraph: {
        title: 'Fardin Kamal | Software Engineer',
        description: 'Official website of Fardin Kamal. Explore projects, blogs, experience, and achievements.',
        url: 'https://fardinkamal62.vercel.app',
        siteName: 'Fardin Kamal',
        images: [
            {
                url: '/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: 'Fardin Kamal Logo',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
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
