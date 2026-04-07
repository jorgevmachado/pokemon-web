import { CSSProperties } from 'react';

export type CardTagTone = 'primary' | 'secondary' | 'info' | 'warning' | 'neutral';

export type PokedexCardTagProps = {
  key: string;
  name: string;
  tone?: CardTagTone;
  style?: CSSProperties;
}