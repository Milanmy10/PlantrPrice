import React from 'react';
import { render } from '@testing-library/react';
import { TraderProvider } from '../contexts/TraderContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export function renderWithProviders(ui) {
  return render(
    <TraderProvider>
      <FavoritesProvider>
        {ui}
      </FavoritesProvider>
    </TraderProvider>
  );
}