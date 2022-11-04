import './MainCard.scss';
import React, { useState } from 'react';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { Modal } from 'App/components/Modal';

export function MainCard({ snippet, id }: IVideoItem) {
  const [isShownModal, setIsShownModal] = useState(false);

  const handlerOnPreviewClick = () => {
    setIsShownModal(true);
  };

  const handlerModalClick = () => {
    setIsShownModal(false);
  };

  return (
    <>
      <div className="main-card" onClick={handlerOnPreviewClick}>
        <img className="main-card__img" src={snippet.thumbnails.high.url} alt={snippet.title} />
      </div>
      {isShownModal && (
        <Modal className="main-card-modal" closeModal={handlerModalClick}>
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
            <div className="main-card-modal__info">
              <h3 className="h3 inverted main-card-modal__title">{snippet.title}</h3>
              <p className="p1 inverted main-card-modal__title">{snippet.channelTitle}</p>
              <p className="p1 inverted main-card-modal__title">{snippet.description}</p>
              <p className="p1 inverted main-card-modal__title">
                {snippet.publishTime.toString().split('T').at(0)?.replaceAll('-', ' ')}
              </p>
            </div>
          </>
        </Modal>
      )}
    </>
  );
}
