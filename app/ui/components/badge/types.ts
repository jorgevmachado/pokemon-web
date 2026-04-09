import React from 'react';
import type { TBadge ,TFont ,TRounded ,TShadow } from '../types';

export type BadgeProps = {
  name: string;
  type?: TBadge;
  icon?: React.ReactNode;
  font?: TFont;
  shadow?: TShadow;
  rounded?: TRounded;
  textColor?: string;
  backgroundColor?: string;
};