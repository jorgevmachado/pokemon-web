import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { type TSize, type TWeight } from '@/app/utils';

export type TextTag =
  | 'blockquote'
  | 'code'
  | 'div'
  | 'em'
  | 'figcaption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'legend'
  | 'mark'
  | 'p'
  | 'small'
  | 'span'
  | 'strong';

export type TextSize = TSize;

export type TextTone =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'inherit';

export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';

export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export type TextTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

export type TextLeading =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';

export type TextDecoration = 'none' | 'underline' | 'lineThrough' | 'overline';

export type TextFontFamily = 'sans' | 'serif' | 'mono';

export type TextDisplay = 'block' | 'inline' | 'inlineBlock';

export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty';

export type TextWhitespace = 'normal' | 'nowrap' | 'pre' | 'preLine' | 'preWrap' | 'breakSpaces';

export type TextBreak = 'normal' | 'words' | 'all' | 'keep';

export type TextLineClamp = 1 | 2 | 3 | 4 | 5 | 6 | 'none';

type TextOwnProps<T extends TextTag = 'p'> = {
  as?: T;
  children: ReactNode;
  size?: TextSize;
  weight?: TWeight;
  tone?: TextTone;
  align?: TextAlign;
  color?: string;
  transform?: TextTransform;
  tracking?: TextTracking;
  leading?: TextLeading;
  decoration?: TextDecoration;
  fontFamily?: TextFontFamily;
  display?: TextDisplay;
  wrap?: TextWrap;
  whitespace?: TextWhitespace;
  breakStrategy?: TextBreak;
  lineClamp?: TextLineClamp;
  italic?: boolean;
  truncate?: boolean;
  srOnly?: boolean;
  className?: string;
};

export type TextProps<T extends TextTag = 'p'> = TextOwnProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;


export type TextTagProps = {
  tone?: TextTone;
  size?: TextSize;
  color?: string;
  weight?: TWeight;
  leading?: TextLeading;
  tracking?: TextTracking;
  className?: string;
  fontFamily?: TextFontFamily;
}