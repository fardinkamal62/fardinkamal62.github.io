import {Quicksand} from 'next/font/google';

import './globals.css';

import NavBar from "@/components/Navbar";
import {ThemeProvider} from "@/components/ThemeProvider";

const quickSand = Quicksand({subsets: ['latin'], variable: '--font-quick-sand', weight: '400', display: 'swap'})

export const metadata = {
    title: 'Fardin Kamal',
    description: 'Official website of Fardin Kamal',
}

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${quickSand.className} bg-white dark:bg-black dark:text-white`}>
            <ThemeProvider attribute={'class'}>
                <NavBar/>
                {children}
            </ThemeProvider>
        </body>
        </html>
    )
}