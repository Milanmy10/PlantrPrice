import React from 'react';

export function TraderDetailsModal({ trader, prices, onClose }) {
  if (!trader) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{trader.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Location</h3>
            <p className="text-gray-900">{trader.location}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700">Contact</h3>
            <p className="text-gray-900">{trader.contact}</p>
          </div>

          {prices && (
            <div>
              <h3 className="text-sm font-medium text-gray-700">Today's Prices</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Arabica</p>
                  <p className="text-lg font-semibold">₹{prices.arabica}/kg</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Robusta</p>
                  <p className="text-lg font-semibold">₹{prices.robusta}/kg</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-700">Rating</h3>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">{'★'.repeat(Math.round(trader.rating))}</span>
              <span className="text-gray-400">{'★'.repeat(5 - Math.round(trader.rating))}</span>
              <span className="ml-1 text-sm text-gray-600">{trader.rating}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}