import {ThemeProvider} from "@/components/ThemeProvider";

export const metadata = {
    title: 'Blogs | Fardin Kamal',
    description: 'Blogs of Fardin Kamal',
}

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider attribute={'class'}>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}