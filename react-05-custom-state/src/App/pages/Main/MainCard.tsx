import './MainCard.scss';
import React, { useState } from 'react';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { MainCardModal } from './MainCardModal';

export function MainCard({ snippet, id }: IVideoItem) {
  const [isShownModal, setIsShownModal] = useState(false);

  const handlerOnPreviewClick = () => {
    setIsShownModal(true);
  };

  const handlerModalClick = () => {
    setIsShownModal(false);
  };

  const modalCardData = {
    videoId: id.videoId,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    description: snippet.description,
    publishTime: snippet.publishTime.toString().split('T').at(0)?.replaceAll('-', ' ') as string,
  };

  return (
    <>
      <div className="main-card" onClick={handlerOnPreviewClick}>
        <img className="main-card__img" src={snippet.thumbnails.high.url} alt={snippet.title} />
      </div>
      {isShownModal && <MainCardModal onClose={handlerModalClick} {...modalCardData} />}
    </>
  );
}
