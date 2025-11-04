import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

export function TraderCard({ trader, prices, onShowDetails }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(trader.id);

  return (
    <div className="trader-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{trader.name}</h3>
          <p className="text-sm text-gray-600">{trader.location}</p>
        </div>
        <button
          onClick={() => favorite ? removeFavorite(trader.id) : addFavorite(trader.id)}
          className="text-2xl focus:outline-none"
        >
          {favorite ? '★' : '☆'}
        </button>
      </div>

      {prices ? (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Arabica</p>
            <p className="text-lg font-semibold">₹{prices.arabica}/kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Robusta</p>
            <p className="text-lg font-semibold">₹{prices.robusta}/kg</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">Prices will be published at 11 AM</p>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-yellow-400">{'★'.repeat(Math.round(trader.rating))}</span>
          <span className="text-gray-400">{'★'.repeat(5 - Math.round(trader.rating))}</span>
          <span className="ml-1 text-sm text-gray-600">{trader.rating}</span>
        </div>
        <button
          onClick={() => onShowDetails(trader)}
          className="text-primary hover:text-opacity-80 text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
}