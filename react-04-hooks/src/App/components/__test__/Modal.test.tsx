import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '../Modal';

const handlerModalClick = jest.fn();

describe('Modal component', () => {
  it('should render component', () => {
    render(
      <Modal closeModal={handlerModalClick}>
        <span>test</span>
      </Modal>
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
