import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { ICard } from 'App/types/ICard';

const cardsMock: ICard[] = [
  {
    id: '0000001',
    brand: 'nike',
    name: "Nike Air Force 1 '07",
    price: '110',
    color: 'white',
    balance: '1',
    year: '2014',
    size: '4567',
    popular: 'top',
    image: "Nike Air Force 1 '07",
  },
  {
    id: '0000011',
    brand: 'adidas',
    name: 'Duramo 10 Shoes',
    price: '65',
    color: 'blue/white',
    balance: '4',
    year: '2021',
    size: '56',
    popular: null,
    image: 'DURAMO 10 SHOES',
  },
  {
    id: '0000021',
    brand: 'reebok',
    name: "Nano X1 Grit Men'S Training Shoes",
    price: '135',
    color: 'black',
    balance: '5',
    year: '2019',
    size: '4567',
    popular: null,
    image: "Nano X1 Grit Men's Training Shoes",
  },
];

describe('Card component', () => {
  it('card render', () => {
    render(<Card {...cardsMock[0]} />);
    expect(screen.getByText(/white/i) as HTMLElement).toBeInTheDocument();
    expect(screen.getByText(/Nike Air Force 1 '07/i) as HTMLElement).toBeInTheDocument();
    expect(screen.getByText(/2014/i) as HTMLElement).toBeInTheDocument();
  });

  it('cards render mock', async () => {
    render(
      <>
        {cardsMock.map((card: ICard) => (
          <Card key={card.id} {...card} />
        ))}
      </>
    );
    expect(screen.getByText(/2014/i) as HTMLElement).toBeInTheDocument();
    expect(screen.getByText(/2021/i) as HTMLElement).toBeInTheDocument();
    expect(screen.getByText(/2019/i) as HTMLElement).toBeInTheDocument();
  });

  it('render image', async () => {
    render(
      <>
        {cardsMock.map((card: ICard) => (
          <Card key={card.id} {...card} />
        ))}
      </>
    );
    expect(screen.getByAltText(/Nike Air Force 1 '07/i) as HTMLElement).toBeInTheDocument();
    expect(screen.getByAltText(/reebok/i) as HTMLElement).toBeInTheDocument();
  });

  it('Card Snapshot', () => {
    const cards = render(
      <>
        {cardsMock.map((card: ICard) => (
          <Card key={card.id} {...card} />
        ))}
      </>
    );
    expect(cards).toMatchSnapshot();
  });
});
