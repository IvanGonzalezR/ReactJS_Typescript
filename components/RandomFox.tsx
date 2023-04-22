import { log } from 'console';
import React from 'react'

type LazyImageProps = {
  src: string,
  alt: string,
  onLazyLoad?: (img: HTMLImageElement) => void;
};
type ImageNativeTypes = React.ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNativeTypes; // suma de tipos

let options = {
  root: null, // debe apuntar al parent del objeto a observar
  rootMargin: '0px',
  threshold: 1, // si es 1 es hasta que el objeto se muestre al 100%, o 0.5 si se muestra la mitad
}

const LazyImage = ({ src, alt, onLazyLoad, ...props }: Props): JSX.Element => {
  const node = React.useRef<HTMLImageElement>(null);
  const [ currentSrc, setCurrentSrc ] = React.useState<string>("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");
  const [ isLazyLoaded, setIsLazyLoaded ] = React.useState<boolean>(false);

  // aseguramos que pase solo en el lado del cliente con useEffect
  // con el [] aseguramos que solo se ejecute cuando se monte el componente
  // es decir, que ya existe una referencia a una imagen que sea observable

  React.useEffect(() => {
    if (isLazyLoaded) {
      return;
    }
    // nuevo observador
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || !node.current) {
          setCurrentSrc(src);
          observer.disconnect();
          setIsLazyLoaded(true);
        }
      })
    }/*, options*/);

    // observe node
    if (node.current) {
      observer.observe(node.current);
      if (typeof onLazyLoad === 'function') {
        onLazyLoad(node.current);
      }
    }

    // desconectar observer
    return () => {
      observer.disconnect();
    }
  }, [ src, onLazyLoad, isLazyLoaded ])


  return (
    <img
      ref={node}
      src={currentSrc}
      alt={alt}
      {...props}
    />
  )
}

export { LazyImage }
