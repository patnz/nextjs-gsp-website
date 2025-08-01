import {
  Geist,
  Geist_Mono,
  Amatic_SC,
  Orbitron,
  Press_Start_2P,
  Courier_Prime,
} from 'next/font/google'
import './globals.css'

import localFont from 'next/font/local'

// FONT THINGS

const amaticSc = Amatic_SC({
  variable: '--font-amatic-sc',
  weight: '700',
  subsets: ['latin'],
})

const orbitron = Orbitron({
  variable: '--font-orbitron',
  weight: 'variable',
  subsets: ['latin'],
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const pressStart = Press_Start_2P({
  variable: '--font-press-start',
  weight: '400',
  subsets: ['latin'],
})

const courierPrime = Courier_Prime({
  variable: '--font-courier-prime',
  weight: '400',
  subsets: ['latin'],
})

const gspFont = localFont({
  src: '../../public/fonts/GspFont-Regular.ttf',
  variable: '--font-gspFont',
})

const fonts = {
  amaticSc,
  orbitron,
  geistSans,
  geistMono,
  pressStart,
  courierPrime,
  gspFont,
}

export default fonts
