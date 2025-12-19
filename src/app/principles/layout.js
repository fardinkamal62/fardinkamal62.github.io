import {ThemeProvider} from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
    title: 'Principles | Fardin Kamal',
    description: 'How I approach engineering problems and make technical decisions',
}

export default function RootLayout({children}) {
    return (
        <ThemeProvider attribute={'class'}>
            {children}
            <Analytics />
        </ThemeProvider>
    )
}
