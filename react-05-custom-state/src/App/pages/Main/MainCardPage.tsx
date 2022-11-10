import './MainCardPage.scss';
import { useMainPageContext } from 'App/store/MainPageState';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IVideoItem } from 'App/types/IYoutubeResponse';

export function MainCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useMainPageContext();
  console.log('state:', state);
  console.log(id);

  const [card, setCard] = useState<IVideoItem>();

  useEffect(() => {
    const index = state.cards.findIndex((item) => item.id.videoId === id);

    if (index < 0) {
      navigate('/');
      return;
    } else {
      setCard(state.cards[index]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!card) return null;

  return (
    <div className="main-card-page">
      <div className="main-card-page__content"></div>
      {/* <button onClick={() => navigate(-1)}>←</button> */}
      <div className="main-card-page__content">
        <div className="main-card-page__video">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${card.id.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="main-card-page__info">
          <h3 className="h3 inverted main-card-page__title">{card.snippet.title}</h3>
          <p className="p1 inverted main-card-page__title">{card.snippet.channelTitle}</p>
          <p className="p1 inverted main-card-page__title">{card.snippet.description}</p>
          <p className="p1 inverted main-card-page__title">{card.snippet.publishTime}</p>
        </div>
      </div>
    </div>
  );
}
