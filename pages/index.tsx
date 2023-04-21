import { Inter } from 'next/font/google'
import { RandomFox } from '@/components/RandomFox'
import React from 'react';

const inter = Inter({ subsets: [ 'latin' ] })

// generate a random function between 1 and 123
const randomNumber = () => Math.floor(Math.random() * 123) + 1;
// generate unique id's from a function
const generateId = () => Math.random().toString(36).substring(2, 9);

type ImageItem = {
  id: string,
  url: string
};

export default function Home() {

  const [ images, setImages ] = React.useState<ImageItem[]>([]);

  const addNewFox: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newImageItem: ImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${randomNumber()}.jpg`
    }
    setImages([
      ...images,
      newImageItem
    ]);
  }

  return (
    <>
      {/* <head>
        <title>Platzi</title>
      </head> */}
      <div>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div >
            <h1 className={`text-4xl font-bold underline ${inter.className}`}>Hello Platzi</h1>
            <button onClick={addNewFox}>Add new fox</button>
            {
              images.map((image) => {
                return (
                  <div key={image.id} className="p-4">
                    <RandomFox alt="dasd" image={image.url} />
                  </div>
                );
              })
            }
          </div>
        </main>
      </div>
    </>
  )
}
