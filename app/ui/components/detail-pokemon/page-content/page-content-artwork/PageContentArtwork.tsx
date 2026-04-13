import Image from 'next/image';
import React from 'react';

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
  return (
    <article
      className="overflow-hidden rounded-2xl border border-slate-200/60 bg-linear-to-br from-slate-100 to-slate-200 shadow-sm">
      <div
        className="relative flex min-h-80 items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)]"/>
        <Image
          src={ imageSource }
          alt={ `${ displayName } official artwork` }
          width={ 400 }
          height={ 400 }
          unoptimized
          className="relative z-10 h-auto max-h-72 w-full object-contain drop-shadow-lg"
        />
      </div>
    </article>
  );
};
export default PageContentArtwork;