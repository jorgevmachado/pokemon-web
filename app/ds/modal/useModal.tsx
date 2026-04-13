'use client';
import { useState } from 'react';
import { ModalContextProps } from './types';
import Modal from './Modal';

export function useModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [config, setConfig] = useState<ModalContextProps | undefined>(undefined);

  const open = (config: ModalContextProps) => {
    setConfig(config);
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
    setConfig(undefined);
  };

  const modal = isVisible && config
    ? (
      <Modal {...config} isOpen={isVisible} onClose={close}>
        {config.body}
      </Modal>
    )
    : null;

  return {
    modal,
    openModal: open,
    closeModal: close,
  };
}