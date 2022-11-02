import styles from './FormCard.module.css';
import React from 'react';
import { IFormCardData } from './IFormCardData';

interface IFormCard {
  card: IFormCardData;
}

export function FormCard({ card }: IFormCard) {
  const { form_card, form_card__image } = styles;
  return (
    <div className={form_card} data-testid="card">
      <h2 className="h2">Your Name: {card.firstName}</h2>
      <p className="p1">Your Birthday: {card.birthday}</p>
      <p className="p1">Favorite framework: {card.framework}</p>
      <p className="p1">Your sex: {card.sex}</p>
      {card.avatar && <img className={form_card__image} src={card.avatar} alt={card.avatar} />}
    </div>
  );
}
