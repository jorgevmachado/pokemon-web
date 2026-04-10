import { type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonAppearance =
  | 'solid'
  | 'outline'
  | 'outlineBorderless'
  | 'icon'
  | 'iconNoBorder';

export type ButtonTone = 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children?: ReactNode;
  appearance?: ButtonAppearance;
  tone?: ButtonTone;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};

