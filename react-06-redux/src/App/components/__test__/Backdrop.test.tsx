import React from 'react';
import { render, screen } from '@testing-library/react';
import { Backdrop } from '../Backdrop';
import userEvent from '@testing-library/user-event';

const handlerModalClick = jest.fn();

describe('Backdrop component', () => {
  it('click should work', () => {
    render(<Backdrop onClick={handlerModalClick} />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('backdrop'));
    expect(handlerModalClick).toHaveBeenCalledTimes(1);
  });
});
