import './Backdrop.scss';
import React from 'react';

interface IBackdropProps {
  onClick?: () => void;
}

export function Backdrop({ onClick }: IBackdropProps) {
  return <div className="backdrop" onClick={onClick} data-testid="backdrop" />;
}
