import './MainCardModal.scss';
import { Modal } from 'App/components/Modal';
import React from 'react';

interface IMainModalProps {
  onClose: () => void;
  videoId: string;
  title: string;
  channelTitle: string;
  description: string;
  publishTime: string;
}

export function MainCardModal({
  onClose,
  videoId,
  title,
  channelTitle,
  description,
  publishTime,
}: IMainModalProps) {
  return (
    <Modal className="main-card-modal" onClose={onClose}>
      <>
        <div className="main-card-modal__video">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="main-card-modal__info">
          <h3 className="h3 inverted main-card-modal__title">{title}</h3>
          <p className="p1 inverted main-card-modal__title">{channelTitle}</p>
          <p className="p1 inverted main-card-modal__title">{description}</p>
          <p className="p1 inverted main-card-modal__title">{publishTime}</p>
        </div>
      </>
    </Modal>
  );
}
