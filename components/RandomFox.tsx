import React from 'react'

type Props = {
  image: string,
  alt: string
};

let options = {
  root: null, // debe apuntar al parent del objeto a observar
  rootMargin: '0px',
  threshold: 1, // si es 1 es hasta que el objeto se muestre al 100%, o 0.5 si se muestra la mitad
}

const RandomFox = ({ image, alt }: Props): JSX.Element => {
  const node = React.useRef<HTMLImageElement>(null);
  const [ src, setSrc ] = React.useState<string>("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

  // aseguramos que pase solo en el lado del cliente con useEffect
  // con el [] aseguramos que solo se ejecute cuando se monte el componente
  // es decir, que ya existe una referencia a una imagen que sea observable

  React.useEffect(() => {
    // nuevo observador
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSrc(image);
        }
      })
    }/*, options*/);

    // observe node
    if (node.current) {
      observer.observe(node.current);
    }

    // desconectar observer
    return () => {
      observer.disconnect();
    }
  }, [ image ])


  return (
    <img
      ref={node}
      width={320}
      height='auto'
      src={src}
      className='rounded'
      alt={alt}
    />
  )
}

export { RandomFox }
