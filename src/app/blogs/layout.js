import {ThemeProvider} from "@/components/ThemeProvider";

export const metadata = {
    title: 'Blogs | Fardin Kamal',
    description: 'Blogs of Fardin Kamal',
}

export default function RootLayout({children}) {
    return (
        <ThemeProvider attribute={'class'}>
            {children}
        </ThemeProvider>
    )
}