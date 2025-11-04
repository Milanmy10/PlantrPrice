import React from 'react';
import { useTraders } from '../contexts/TraderContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { TraderCard } from './TraderCard';

export function FavoritesList({ onShowDetails }) {
  const { traders, prices } = useTraders();
  const { favorites } = useFavorites();

  const favoriteTraders = traders.filter(trader => favorites.includes(trader.id));
  const traderPrices = prices?.reduce((acc, price) => {
    acc[price.traderId] = price.prices;
    return acc;
  }, {});

  if (favoriteTraders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No favorite traders yet. Click the star icon to add traders to your favorites.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favoriteTraders.map(trader => (
        <TraderCard
          key={trader.id}
          trader={trader}
          prices={traderPrices?.[trader.id]}
          onShowDetails={onShowDetails}
        />
      ))}
    </div>
  );
}