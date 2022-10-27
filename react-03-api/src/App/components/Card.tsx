import React, { Component } from 'react';
import { ICard } from 'App/types/ICard';
import './Card.css';
import { Modal } from './Modal';

type ICardProps = ICard;
interface ICardState {
  isShownModal: boolean;
}

export class Card extends Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);
    this.handlerOnPreviewClick = this.handlerOnPreviewClick.bind(this);
    this.handlerModalClick = this.handlerModalClick.bind(this);
    this.state = {
      isShownModal: false,
    };
  }
  handlerOnPreviewClick() {
    this.setState({ isShownModal: true });
  }

  handlerModalClick() {
    this.setState({ isShownModal: false });
  }

  render() {
    const { title, server, id, secret } = this.props;
    const { isShownModal } = this.state;

    return (
      <>
        <div className="card" onClick={this.handlerOnPreviewClick}>
          <img
            className="card__img"
            src={`https://live.staticflickr.com/${server}/${id}_${secret}_q.jpg`}
            alt={title}
            loading="lazy"
          />
        </div>
        {isShownModal && (
          <Modal closeModal={this.handlerModalClick}>
            <>
              <img
                className="card-modal__img"
                src={`https://live.staticflickr.com/${server}/${id}_${secret}_b.jpg`}
                alt={title}
              />
              <span className="card-modal__title">{title}</span>
            </>
          </Modal>
        )}
      </>
    );
  }
}
