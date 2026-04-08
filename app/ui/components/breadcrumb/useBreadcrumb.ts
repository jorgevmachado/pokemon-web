import { BreadcrumbContextProps } from '@/app/ui/components/breadcrumb/types';
import React from 'react';
import {
  BreadcrumbContext
} from '@/app/ui/components/breadcrumb/BreadcrumbContext';

export const useBreadcrumb = (): BreadcrumbContextProps => {
  const context = React.useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};