import { Inter } from 'next/font/google'
import { LazyImage } from '@/components/RandomFox'
import _ from 'lodash';
import React from 'react';
import Head from 'next/head';


const inter = Inter({ subsets: [ 'latin' ] });

// generate a random function between 1 and 123
const randomNumber = () => _.random(1, 123)
// generate unique id's from a function
const generateId = () => Math.random().toString(36).substring(2, 9);



export default function Home() {

  const [ images, setImages ] = React.useState<IFoxItem[]>([]);

  const addNewFox: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newImageItem: IFoxItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${randomNumber()}.jpg`
    }
    setImages([
      ...images,
      newImageItem
    ]);
    window.plausible("add_fox");
  }

  return (
    <>
      <Head>
        <title>Platzi</title>
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <div>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div >
            <h1 className={`text-4xl font-bold underline ${inter.className}`}>Hello Platzi</h1>
            <button onClick={addNewFox}>Add new fox</button>
            {
              images.map((image, index) => {
                return (
                  <div className="p-4" key={image.id}>
                    <LazyImage
                      onClick={() => console.log('hey')}
                      alt="dasd"
                      src={image.url}
                      width={320}
                      height='auto'
                      className='rounded'
                      onLazyLoad={(img) => {
                        console.log(`Image #${index + 1} cargada. Nodo:`, img)
                      }}
                    />
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
