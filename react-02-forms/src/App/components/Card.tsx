import './Card.css';
import React, { Component } from 'react';
import { ICard } from 'App/types/ICard';

export class Card extends Component<ICard> {
  render() {
    const { brand, color, name, popular, price, size, year, image } = this.props;

    return (
      <div className="card">
        <div className="card__visual">
          <img className="card__brand" src={`assets/svg/${brand}.svg`} alt={brand || 'brand'} />
          <img className="card__img" src={`assets/img/${image}.png`} alt={image || 'img'} />
        </div>
        <div className="card__info">
          <h2>{name}</h2>
          <p>COLOR: {color}</p>
          <p>{popular}</p>
          <p>PRICE: ${price}</p>
          <p>SIZE: {size}</p>
          <p>{year}</p>
        </div>
      </div>
    );
  }
}
