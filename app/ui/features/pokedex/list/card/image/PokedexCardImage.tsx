import Image from 'next/image';
import { POKEDEX_FALLBACK_IMAGE } from '@/app/ui/features/pokedex/constants';
import React ,{ useMemo ,useState } from 'react';

type PokedexCardImageProps = {
  id: string;
  image?: string;
  discovered?: boolean;
  displayName?: string;
  external_image?: string;
}

const PokedexCardImage = ({ id, image, discovered, displayName, external_image }: PokedexCardImageProps) => {
  
  const imageSources = useMemo(() => {
    return [external_image, image, POKEDEX_FALLBACK_IMAGE].filter((source, index, sources): source is string => {
      return Boolean(source) && sources.indexOf(source) === index;
    });
  }, [external_image, image]);

  const [failedImageSources, setFailedImageSources] = useState<string[]>([]);
  const activeImageSource = !discovered ? POKEDEX_FALLBACK_IMAGE : imageSources.find((source) => !failedImageSources.includes(source));

  const shouldRenderPokemonImage = Boolean(activeImageSource);


  const passthroughImageLoader = ({ src }: { src: string }) => src;
  
  return (
    <div className='rounded-[1.35rem] bg-slate-100/90 p-4'>
      <div className='relative flex aspect-[1.2/1] items-center justify-center overflow-hidden rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(226,232,240,0.72))]'>
        <div className='absolute inset-x-8 bottom-3 h-5 rounded-full bg-slate-300/35 blur-xl transition duration-300 group-hover:bg-blue-300/35' />

        {shouldRenderPokemonImage && (
          <Image
            key={id}
            src={activeImageSource!}
            alt={`${displayName} artwork`}
            className='relative z-10 h-full max-h-48 w-full object-contain transition duration-300 group-hover:scale-[1.03]'
            loading='lazy'
            width={220}
            height={180}
            unoptimized
            loader={passthroughImageLoader}
            onError={() => {
              setFailedImageSources((previousSources) => {
                if (!activeImageSource || previousSources.includes(activeImageSource)) {
                  return previousSources;
                }

                return [...previousSources, activeImageSource];
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(PokedexCardImage);