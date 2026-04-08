'use client';
import React from 'react';
import { BreadcrumbContextProps } from '@/app/ui/components/breadcrumb/types';

export const BreadcrumbContext = React.createContext<BreadcrumbContextProps | undefined>(undefined);