import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { CardImageProps } from '@/app/ui/components/card/image/types';

const IMAGE_SIZE_CONFIG = {
  sm: {
    frameClassName: 'max-h-56',
    imageClassName: 'max-h-32',
    width: 168,
    height: 132,
  },
  md: {
    frameClassName: 'max-h-72',
    imageClassName: 'max-h-48',
    width: 220,
    height: 180,
  },
  lg: {
    frameClassName: 'max-h-80',
    imageClassName: 'max-h-60',
    width: 280,
    height: 220,
  },
} as const;

const CardImage = ({
  image,
  showImage,
  displayName,
  fallbackImage = '/icon.svg',
  externalImage,
  size = 'md',
}: CardImageProps) => {
  const imageSources = useMemo(() => {
    return [externalImage, image, fallbackImage].filter((source, index, sources): source is string => {
      return Boolean(source) && sources.indexOf(source) === index;
    });
  }, [externalImage, fallbackImage, image]);


  const [failedImageSources, setFailedImageSources] = useState<string[]>([]);
  const activeImageSource = !showImage ? fallbackImage : imageSources.find((source) => !failedImageSources.includes(source));


  const shouldRenderPokemonImage = Boolean(activeImageSource);
  const imageSizeConfig = IMAGE_SIZE_CONFIG[size];


  const passthroughImageLoader = ({ src }: { src: string }) => src;

  return (
    <div className='rounded-[1.35rem] bg-slate-100/90 p-4'>
      <div className={`relative flex aspect-[1.2/1] w-full items-center justify-center overflow-hidden rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(226,232,240,0.72))] ${imageSizeConfig.frameClassName}`}>
        <div className='absolute inset-x-8 bottom-3 h-5 rounded-full bg-slate-300/35 blur-xl transition duration-300 group-hover:bg-blue-300/35' />
        {shouldRenderPokemonImage && (
          <Image
            src={activeImageSource!}
            alt={`${displayName} artwork`}
            className={`relative z-10 h-full w-full object-contain transition duration-300 group-hover:scale-[1.03] ${imageSizeConfig.imageClassName}`}
            loading='lazy'
            width={imageSizeConfig.width}
            height={imageSizeConfig.height}
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

export default React.memo(CardImage);