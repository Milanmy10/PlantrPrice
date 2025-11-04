import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import { TraderCard } from '../components/TraderCard';

describe('TraderCard', () => {
  const mockTrader = {
    id: 1,
    name: 'Test Trader',
    location: 'Sakleshpur',
    rating: 4.5
  };

  const mockPrices = {
    arabica: 400,
    robusta: 300
  };

  it('renders trader information correctly', () => {
    renderWithProviders(<TraderCard trader={mockTrader} prices={mockPrices} />);
    
    expect(screen.getByText(mockTrader.name)).toBeInTheDocument();
    expect(screen.getByText(mockTrader.location)).toBeInTheDocument();
    expect(screen.getByText(`₹${mockPrices.arabica}/kg`)).toBeInTheDocument();
    expect(screen.getByText(`₹${mockPrices.robusta}/kg`)).toBeInTheDocument();
  });

  it('displays loading message when prices are not available', () => {
    renderWithProviders(<TraderCard trader={mockTrader} />);
    
    expect(screen.getByText('Prices will be published at 11 AM')).toBeInTheDocument();
  });

  it('calls onShowDetails when View Details is clicked', () => {
    const mockShowDetails = jest.fn();
    renderWithProviders(
      <TraderCard 
        trader={mockTrader} 
        prices={mockPrices} 
        onShowDetails={mockShowDetails} 
      />
    );
    
    fireEvent.click(screen.getByText('View Details'));
    expect(mockShowDetails).toHaveBeenCalledWith(mockTrader);
  });
});