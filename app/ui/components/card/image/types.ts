export type CardImageSize = 'sm' | 'md' | 'lg';

export type CardImageProps = {
  image?: string;
  showImage?: boolean;
  displayName: string;
  fallbackImage?: string;
  externalImage?: string;
  size?: CardImageSize;
};
