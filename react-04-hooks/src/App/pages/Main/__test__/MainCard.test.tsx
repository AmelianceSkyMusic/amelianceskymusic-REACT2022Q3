import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainCard } from '../MainCard';
import { responseMock } from '../../../../__mocks__/responseMock';
import { IVideoItem } from '../../../../App/types/IYoutubeResponse';

const cardsMock: IVideoItem[] = responseMock.items;

describe('Card component', () => {
  it('card render', () => {
    expect(screen.queryByRole('img')).toBeNull();
    render(<MainCard {...cardsMock[0]} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('cards render mock', async () => {
    render(
      <>
        {cardsMock.map((card: IVideoItem) => (
          <MainCard key={card.id} {...card} />
        ))}
      </>
    );
    expect(screen.getAllByRole('img')).toHaveLength(5);
  });
});
