import React, { Component } from 'react';
import { Backdrop } from './Backdrop';
import { Portal } from './Portal';
import './Modal.css';

interface IModalProps {
  children: React.ReactElement;
  closeModal: () => void;
}

// interface IStateProps {
//   isShown: boolean;
// }

export class Modal extends Component<IModalProps> {
  modalRef: React.RefObject<HTMLDivElement>;
  backdropRef: React.RefObject<HTMLDivElement>;
  constructor(props: IModalProps) {
    super(props);
    this.modalRef = React.createRef();
    this.backdropRef = React.createRef();
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
  }

  backdropClickHandler() {
    this.modalRef.current?.classList.remove('show');
    this.modalRef.current?.addEventListener('animationend', () => {
      this.props.closeModal();
      document.body.style.overflow = 'visible';
    });
  }

  componentDidMount() {
    this.modalRef.current?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  render() {
    return (
      <Portal>
        <div className="modal" ref={this.modalRef}>
          <Backdrop onClick={this.backdropClickHandler} ref={this.backdropRef} />
          <div className="modal__content">{this.props.children}</div>
        </div>
      </Portal>
    );
  }
}
