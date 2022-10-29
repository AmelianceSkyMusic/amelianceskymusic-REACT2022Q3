import React from 'react';
import './Backdrop.css';

interface IBackdropProps {
  onClick?: () => void;
  ref: React.RefObject<HTMLDivElement>;
}

export const Backdrop = React.forwardRef<HTMLDivElement, IBackdropProps>((props, ref) => (
  <div className="backdrop" onClick={props.onClick} ref={ref} data-testid="backdrop" />
));
