import {ThemeProvider} from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
    title: 'Projects | Fardin Kamal',
    description: 'Projects of Fardin Kamal',
}

export default function RootLayout({children}) {
    return (
        <ThemeProvider attribute={'class'}>
            {children}
            <Analytics />
        </ThemeProvider>
    )
}
