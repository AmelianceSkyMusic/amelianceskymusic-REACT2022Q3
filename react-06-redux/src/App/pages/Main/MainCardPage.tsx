import './MainCardPage.scss';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import asm from 'asmlib/asm-scripts';
import { useTypedSelector } from 'App/store/hooks/useTypedSelector';
import { useTypedDispatch } from 'App/store/hooks/useTypedDispatch';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { mainPageSlice } from 'App/store/mainPage/mainPageSlice';

export function MainCardPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const state = useTypedSelector((state) => state.mainPageReducer);
  const { actions } = mainPageSlice;
  const dispatch = useTypedDispatch();

  const handlerOnPinInfoClick = () => dispatch(actions.toggleIsPinInfo());

  useEffect(() => {
    const index = state.cards.findIndex((item: IVideoItem) => item.id.videoId === id);

    if (index < 0) {
      navigate('/');
      return;
    } else {
      dispatch(actions.setCurrentCard(state.cards[index]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.currentCard) return null;

  const mainCardPageInfo = asm.joinClasses('main-card-page__info', state.isPinInfo ? 'show' : null);

  return (
    <div className="main-card-page">
      <div className="container">
        <div className="main-card-page__content">
          <div className="main-card-page__video">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                (state.currentCard as IVideoItem).id.videoId // ! HOW CAN I FIX THIS?
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className={mainCardPageInfo}>
            <div className="main-card-page__title-container">
              <h3 className="h3 inverted main-card-page__title">
                {(state.currentCard as IVideoItem).snippet.title}
              </h3>
              {state.isPinInfo ? (
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
            <p className="p1 inverted main-card-page__title">
              {(state.currentCard as IVideoItem).snippet.channelTitle}
            </p>
            <p className="p1 inverted main-card-page__title">
              {(state.currentCard as IVideoItem).snippet.description}
            </p>
            <p className="p1 inverted main-card-page__title">
              {(state.currentCard as IVideoItem).snippet.publishTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
