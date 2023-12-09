import { Quicksand } from 'next/font/google';

import './globals.css';

import NavBar from "@/components/navbar";

const quickSand = Quicksand({ subsets: ['latin'], variable: '--font-quick-sand', weight: '400', display: 'swap' })

export const metadata = {
  title: 'Fardin Kamal',
  description: 'Official website of Fardin Kamal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quickSand.className}`}>
        <NavBar />{children}
      </body>
    </html>
  )
}