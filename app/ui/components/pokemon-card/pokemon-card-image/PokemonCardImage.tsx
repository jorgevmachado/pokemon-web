/**
 * Created by jorge.machado as 16/04/2026
 **/
import React ,{ useMemo } from 'react';
import { TImageSize, Image } from '@/app/ds';
import { joinClass } from '@/app/utils';

type PokemonCardImageProps = {
  size?: TImageSize;
  image?: string;
  showImage?: boolean;
  displayName: string;
  fallbackImage?: string;
  externalImage?: string;
};

const IMAGE_SIZE_FRAME_CLASS_MAP: Record<TImageSize, string> = {
  sm: 'max-h-56',
  md: 'max-h-72',
  lg: 'max-h-80',
};

const PokemonCardImage = ({
  size = 'md',
  image,
  showImage,
  displayName,
  externalImage,
}:PokemonCardImageProps) => {

  const imageSource = useMemo(() => {
    return showImage ? externalImage ?? image : undefined;
  }, [externalImage, image, showImage]);
  
  const fallbackImageSource = useMemo(() => {
    const fallbackSrcList: Array<string> = [];
    if (showImage && image && image !== imageSource) {
      fallbackSrcList.push(image);
    }
    if (showImage && externalImage && externalImage !== imageSource) {
      fallbackSrcList.push(externalImage);
    }
    fallbackSrcList.push('/icon.svg');
    return fallbackSrcList;
  }, [externalImage, image, imageSource, showImage]);

  const classNameListFrame = useMemo(() => {
    const classNames: Array<string> = [
      'relative',
      'flex',
      'aspect-[1.2/1]',
      ' w-full',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'rounded-[1.1rem]',
      'bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(226,232,240,0.72))]',
      IMAGE_SIZE_FRAME_CLASS_MAP[size],
    ];
    return joinClass(classNames);
  }, [size]);

  return (
    <div className='rounded-[1.35rem] bg-slate-100/90 p-4'>
      <div className={classNameListFrame}>
        <Image
          alt={`${displayName} artwork`}
          fit="contain"
          src={imageSource}
          size={size}
          className="relative z-10 transition duration-300 group-hover:scale-[1.03]"
          fallbackSrcList={fallbackImageSource}
        />
      </div>
    </div>
  );
};

export default PokemonCardImage;