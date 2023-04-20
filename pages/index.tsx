import Image from 'next/image'
import { Inter } from 'next/font/google'
import { RandomFox } from '@/components/RandomFox'

const inter = Inter({ subsets: [ 'latin' ] })

export default function Home() {
  return (
    <div>
      {/* <head>
        <title>Platzi</title>
      </head> */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={`${inter.className}`}>
          <h1 className='text-3xl font-bold underline'>Hello Platzi</h1>
          <RandomFox />
        </div>
      </main>
    </div>
  )
}
