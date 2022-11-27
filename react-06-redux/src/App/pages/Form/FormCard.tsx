import './FormCard.scss';
import React from 'react';
import { IFormCard } from 'App/types/IFormCard';

interface IFormCardProps {
  card: IFormCard;
}

export function FormCard({ card }: IFormCardProps) {
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
