'use client';

import { type MouseEvent, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

import { ModalProps } from './types';
import './Modal.scss';
import { TWidth } from '@/app/ui';

const WIDTH_CLASS_MAP: Record<TWidth, string> = {
  '3xs': 'max-w-3xs',
  '2xs': 'max-w-2xs',
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
  screen: 'max-w-screen',
};

const defaultCloseIcon = <IoClose size={24} />;

const Modal = ({
  title,
  subtitle,
  children,
  isOpen,
  width = '2xl',
  onClose,
  maxHeight = '80vh',
  closeOnEsc = true,
  closeOnOutsideClick = true,
  customCloseIcon,
  submitButton,
  closeButton,
}: ModalProps) => {

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='modal-fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4'
      onClick={handleOutsideClick}
      role='presentation'
    >
      <div
        className={`modal-scale-in relative w-full rounded-lg bg-white shadow-2xl ${WIDTH_CLASS_MAP[width]}`}
        style={{ maxHeight }}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        aria-describedby={subtitle ? 'modal-description' : undefined}
      >
        <div className='flex items-start justify-between border-b border-gray-200 px-6 py-4'>
          <div className='flex-1'>
            <h2 id='modal-title' className='text-xl font-bold text-gray-900'>
              {title}
            </h2>
            {subtitle && (
              <p
                id='modal-description'
                className='mt-1 text-sm text-gray-600'
              >
                {subtitle}
              </p>
            )}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className='ml-4 inline-flex cursor-pointer items-center justify-center rounded-md p-1 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              aria-label='Close modal'
              type='button'
            >
              {customCloseIcon || defaultCloseIcon}
            </button>
          )}
        </div>

        <div
          className='overflow-y-auto px-6 py-4'
          style={{ maxHeight: `calc(${maxHeight} - 140px)` }}
        >
          {children}
        </div>

        {(submitButton || closeButton) && (
          <div className='flex justify-between gap-3 border-t border-gray-200 px-6 py-4'>
            {closeButton && (
              <button
                onClick={closeButton.onClick || onClose}
                className='inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
                type='button'
              >
                {closeButton.label}
              </button>
            )}

            {submitButton && (
              <button
                onClick={submitButton.onClick}
                disabled={submitButton.disabled || submitButton.isLoading}
                className='inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400'
                type='button'
              >
                {submitButton.isLoading ? (
                  <>
                    <span
                      className='mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'
                    />
                    Loading...
                  </>
                ) : (
                  submitButton.label
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
