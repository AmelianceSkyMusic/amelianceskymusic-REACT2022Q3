import React, { useState } from 'react';
import './Card.css';
import { Modal } from './Modal';
import { IVideoItem } from 'App/types/IYoutubeResponse';

export function Card({ snippet, id }: IVideoItem) {
  const [isShownModal, setIsShownModal] = useState(false);

  const handlerOnPreviewClick = () => {
    setIsShownModal(true);
  };

  const handlerModalClick = () => {
    setIsShownModal(false);
  };

  return (
    <>
      <div className="card" onClick={handlerOnPreviewClick}>
        <img className="card__img" src={snippet.thumbnails.high.url} alt={snippet.title} />
      </div>
      {isShownModal && (
        <Modal closeModal={handlerModalClick}>
          <>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${id.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="h3 card-modal__title">{snippet.title}</h3>
            <p className="p1 card-modal__title">{snippet.channelTitle}</p>
            <p className="p1 card-modal__title">{snippet.description}</p>
            <p className="p1 card-modal__title">
              {snippet.publishTime.toString().split('T').at(0)?.replaceAll('-', ' ')}
            </p>
          </>
        </Modal>
      )}
    </>
  );
}
