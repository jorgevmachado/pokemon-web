'use client';

import { createContext } from 'react';

import type { AlertType } from '@/app/ui';

export type GlobalAlert = {
  id: string;
  type: AlertType;
  message: string;
};

export type ShowAlertInput = {
  type?: AlertType;
  message: string;
  durationMs?: number;
};

export type AlertContextValue = {
  alerts: GlobalAlert[];
  showAlert: (input: ShowAlertInput) => string;
  dismissAlert: (id: string) => void;
  clearAlerts: () => void;
};

export const AlertContext = createContext<AlertContextValue | null>(null);

