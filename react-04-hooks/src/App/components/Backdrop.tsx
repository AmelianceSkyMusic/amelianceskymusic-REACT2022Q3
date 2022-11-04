import React from 'react';
import './Backdrop.css';

interface IBackdropProps {
  onClick?: () => void;
}

export function Backdrop({ onClick }: IBackdropProps) {
  return <div className="backdrop" onClick={onClick} data-testid="backdrop" />;
}
