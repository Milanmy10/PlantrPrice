import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { FilterBar } from '../components/FilterBar';

describe('FilterBar', () => {
  const mockSetLocation = jest.fn();
  const mockSetSortBy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders location and sort options', () => {
    render(
      <FilterBar
        location=""
        setLocation={mockSetLocation}
        sortBy="arabica"
        setSortBy={mockSetSortBy}
      />
    );

    expect(screen.getByText('Location:')).toBeInTheDocument();
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('calls setLocation when location is changed', () => {
    render(
      <FilterBar
        location=""
        setLocation={mockSetLocation}
        sortBy="arabica"
        setSortBy={mockSetSortBy}
      />
    );

    fireEvent.change(screen.getByLabelText('Location:'), {
      target: { value: 'Sakleshpur' }
    });

    expect(mockSetLocation).toHaveBeenCalledWith('Sakleshpur');
  });

  it('calls setSortBy when sort option is changed', () => {
    render(
      <FilterBar
        location=""
        setLocation={mockSetLocation}
        sortBy="arabica"
        setSortBy={mockSetSortBy}
      />
    );

    fireEvent.change(screen.getByLabelText('Sort by:'), {
      target: { value: 'robusta' }
    });

    expect(mockSetSortBy).toHaveBeenCalledWith('robusta');
  });
});