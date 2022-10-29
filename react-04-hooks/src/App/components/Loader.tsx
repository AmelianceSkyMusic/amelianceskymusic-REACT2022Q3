import React, { Component } from 'react';
import { Backdrop } from './Backdrop';
import './Loader.css';
import { Portal } from './Portal';

export class Loader extends Component<unknown> {
  loaderRef: React.RefObject<HTMLDivElement>;
  backdropRef: React.RefObject<HTMLDivElement>;
  constructor(props: unknown) {
    super(props);
    this.loaderRef = React.createRef();
    this.backdropRef = React.createRef();
  }

  componentDidMount() {
    this.loaderRef.current?.classList.add('show');
  }

  render() {
    return (
      <Portal>
        <div className="loader-container" data-testid="loader" ref={this.loaderRef}>
          <Backdrop ref={this.backdropRef} />
          <div className="loader">
            <div />
            <div />
            <div />
          </div>
        </div>
      </Portal>
    );
  }
}
