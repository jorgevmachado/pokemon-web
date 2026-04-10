import React from 'react';

import { joinClass } from '@/app/utils';

import {
  type ButtonAppearance,
  type ButtonProps,
  type ButtonSize,
  type ButtonTone,
} from './types';

const APPEARANCE_CLASS_MAP: Record<ButtonAppearance, Record<ButtonTone, string>> = {
  solid: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    neutral: 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400',
  },
  outline: {
    primary: 'border border-blue-600 bg-white text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'border border-slate-500 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-500',
    danger: 'border border-red-600 bg-white text-red-700 hover:bg-red-50 focus:ring-red-500',
    success: 'border border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500',
    neutral: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
  },
  outlineBorderless: {
    primary: 'border-0 bg-transparent text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'border-0 bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    danger: 'border-0 bg-transparent text-red-700 hover:bg-red-50 focus:ring-red-500',
    success: 'border-0 bg-transparent text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500',
    neutral: 'border-0 bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
  },
  icon: {
    primary: 'rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'rounded-full bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-500',
    danger: 'rounded-full bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    neutral: 'rounded-full bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400',
  },
  iconNoBorder: {
    primary: 'rounded-full border-0 bg-transparent text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
    secondary: 'rounded-full border-0 bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    danger: 'rounded-full border-0 bg-transparent text-red-700 hover:bg-red-50 focus:ring-red-500',
    success: 'rounded-full border-0 bg-transparent text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500',
    neutral: 'rounded-full border-0 bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
  },
};

const SIZE_CLASS_MAP: Record<ButtonSize, { default: string; iconOnly: string }> = {
  sm: {
    default: 'h-9 px-3 text-sm',
    iconOnly: 'h-9 w-9',
  },
  md: {
    default: 'h-10 px-4 text-sm',
    iconOnly: 'h-10 w-10',
  },
  lg: {
    default: 'h-11 px-5 text-base',
    iconOnly: 'h-11 w-11',
  },
};

const Button = ({
  children,
  appearance = 'solid',
  tone = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  isLoading = false,
  loadingText = 'Loading...',
  className,
  disabled,
  type = 'button',
  ...buttonProps
}: ButtonProps) => {
  const hasContent = Boolean(children);
  const hasSingleIcon = !hasContent && Boolean(iconLeft || iconRight);
  const isIconVariant = appearance === 'icon' || appearance === 'iconNoBorder';
  const sizeClassName = hasSingleIcon || isIconVariant
    ? SIZE_CLASS_MAP[size].iconOnly
    : SIZE_CLASS_MAP[size].default;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={joinClass([
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-60',
        'cursor-pointer',
        APPEARANCE_CLASS_MAP[appearance][tone],
        sizeClassName,
        fullWidth && 'w-full',
        className,
      ])}
    >
      {isLoading ? (
        <>
          <span
            aria-hidden='true'
            className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'
          />
          {hasContent ? loadingText : null}
        </>
      ) : (
        <>
          {iconLeft ? <span aria-hidden='true' className='inline-flex shrink-0'>{iconLeft}</span> : null}
          {children ? <span>{children}</span> : null}
          {iconRight ? <span aria-hidden='true' className='inline-flex shrink-0'>{iconRight}</span> : null}
        </>
      )}
    </button>
  );
};

export default React.memo(Button);

