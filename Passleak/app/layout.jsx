import { Exo_2 } from 'next/font/google'
import NavBar from './comps/navbar'
import Footer from '@comps/footer'
import './globals.css'


const exo = Exo_2({ subsets: ['latin'], weight: ['400', '700'], })

export const metadata = {
  title: 'PassLeak ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
        <body className={`${exo.className}`}>

            <NavBar />

            {children}

            <Footer />
            
        </body>
    </html>
  )
}
