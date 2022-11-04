import './Loader.scss';
import React from 'react';
import { Backdrop } from './Backdrop';
import { Portal } from './Portal';

export function Loader() {
  return (
    <Portal>
      <div className="loader-container show" data-testid="loader">
        <Backdrop />
        <div className="loader">
          <div />
          <div />
          <div />
        </div>
      </div>
    </Portal>
  );
}
