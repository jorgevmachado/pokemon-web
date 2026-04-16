import { Image } from '@/app/ds';
import React ,{ useMemo } from 'react';

type PageContentArtworkProps = {
  image?: string;
  displayName: string;
  fallbackImage?: string;
  externalImage?: string;
}
const PageContentArtwork = ({
  image,
  displayName,
  fallbackImage = '/icon.svg',
  externalImage
}: PageContentArtworkProps) => {
  const imageSource = externalImage || image || fallbackImage;

  const fallbackImageSource = useMemo(() => {
    const fallbackSrcList: Array<string> = [];
    if (image && image !== imageSource) {
      fallbackSrcList.push(image);
    }
    if (externalImage && externalImage !== imageSource) {
      fallbackSrcList.push(externalImage);
    }
    fallbackSrcList.push(fallbackImage);
    return fallbackSrcList;
  }, [externalImage, image, imageSource, fallbackImage]);
  
  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200/60 bg-linear-to-br from-slate-100 to-slate-200 shadow-sm">
      <div
        className="relative flex min-h-80 items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)]"/>
        
        <Image
          alt={ `${ displayName } official artwork` }
          fit="contain"
          src={imageSource}
          size="xl"
          className="relative z-10 h-auto max-h-72 w-full drop-shadow-lg"
          fallbackSrcList={fallbackImageSource}
        />
      </div>
    </article>
  );
};
export default PageContentArtwork;