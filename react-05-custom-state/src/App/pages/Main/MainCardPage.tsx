import './MainCardPage.scss';
import { useMainPageContext } from 'App/store/MainPageState';
import React, { useEffect, useState } from 'react';
import { useMatches, useNavigate, useParams } from 'react-router-dom';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import asm from 'asmlib/asm-scripts';

export function MainCardPage() {
  // const matches = useMatches();
  // const crumbs = matches;

  const { id } = useParams();
  const navigate = useNavigate();
  const state = useMainPageContext();
  // console.log('crumbs:', crumbs);

  const [card, setCard] = useState<IVideoItem>();

  const [isPinInfo, setIsPinInfo] = useState(false);

  const handlerOnPinInfoClick = () => setIsPinInfo((prev) => !prev);

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

  const mainCardPageInfo = asm.joinClasses('main-card-page__info', isPinInfo ? 'show' : null);

  return (
    <div className="main-card-page">
      <div className="container">
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
          <div className={mainCardPageInfo}>
            <div className="main-card-page__title-container">
              <h3 className="h3 inverted main-card-page__title">{card.snippet.title}</h3>
              {isPinInfo ? (
                <button
                  onClick={handlerOnPinInfoClick}
                  className="icon inverted click icon--pin main-card-page__icon-pin"
                />
              ) : (
                <button
                  onClick={handlerOnPinInfoClick}
                  className="icon inverted click icon--not-pin main-card-page__icon-pin"
                />
              )}
            </div>
            <p className="p1 inverted main-card-page__title">{card.snippet.channelTitle}</p>
            <p className="p1 inverted main-card-page__title">{card.snippet.description}</p>
            <p className="p1 inverted main-card-page__title">{card.snippet.publishTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
