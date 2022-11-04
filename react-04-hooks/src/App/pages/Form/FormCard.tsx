import './FormCard.scss';
import React from 'react';
import { IFormCardData } from './IFormCardData';

interface IFormCard {
  card: IFormCardData;
}

export function FormCard({ card }: IFormCard) {
  return (
    <div className="form-card col-3" data-testid="card">
      {card.avatar && <img className="form-card__image" src={card.avatar} alt={card.avatar} />}
      <h2 className="h2">
        <b>{card.firstName}</b>
      </h2>
      <p className="p1">
        <b>{card.good && 'Good Person'}</b>
      </p>
      <p className="p1">
        Birthday: <b>{card.birthday}</b>
      </p>
      <p className="p1">
        Framework: <b>{card.framework}</b>
      </p>
      <p className="p1">
        Sex: <b>{card.sex}</b>
      </p>
    </div>
  );
}
