export type TSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type TFont = 'medium' | 'bold' | 'semibold';
export type TRounded = 'full' | 'md' | 'lg' | '2xl';
export type TShadow = 'sm' | 'md' | 'lg';

export type TextProps = {
  text: string;
  size?: TSize;
  font?: TFont;
  textColor?: string;
  className?: string;
}

export type TOption = { label: string; value: string };
export type TWidth = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'screen';