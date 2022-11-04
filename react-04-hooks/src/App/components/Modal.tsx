import './Modal.scss';
import React, { useEffect, useState } from 'react';
import { Backdrop } from './Backdrop';
import { Portal } from './Portal';
import asm from 'asmlib/asm-scripts';

interface IModalProps {
  children: React.ReactElement;
  className?: string;
  closeModal: () => void;
}

export function Modal({ children, className, closeModal }: IModalProps) {
  const [show, setShow] = useState('show');

  const backdropClickHandler = () => {
    setShow('');
  };

  const handleAnimationend = () => {
    if (show !== 'show') {
      closeModal();
      document.body.style.overflow = 'visible';
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const modalClass = asm.joinClasses('modal', className, show);

  return (
    <Portal>
      <div className={modalClass} onAnimationEnd={handleAnimationend}>
        <Backdrop onClick={backdropClickHandler} data-testid="backdrop" />
        <div className="modal__content">{children}</div>
      </div>
    </Portal>
  );
}
