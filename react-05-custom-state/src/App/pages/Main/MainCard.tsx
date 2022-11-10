import './MainCard.scss';
import React from 'react';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import asm from 'asmlib/asm-scripts';
import { Link } from 'react-router-dom';

export function MainCard({ snippet, id }: IVideoItem) {
  return (
    <Link
      to={'card/' + id.videoId}
      className="main-card col10-2 col10-xl-3 col10-lg-5 col10-md-8 col10-xs-10"
    >
      <img className="main-card__img" src={snippet.thumbnails.high.url} alt={snippet.title} />
      <h4 className="h4 main-card__title">{asm.stringTrunc(snippet.title, 22)}</h4>
    </Link>
  );
}
