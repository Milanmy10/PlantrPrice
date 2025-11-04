import React, { useState, useEffect } from 'react';
import './App.css';

// Mock data for development
const mockTraders = [
  {
    id: 1,
    name: "Krishna Coffee Works",
    location: "Sakleshpur",
    contact: "+91 9876543210",
    rating: 4.5
  },
  {
    id: 2,
    name: "Malnad Traders",
    location: "Sakleshpur",
    contact: "+91 9876543211",
    rating: 4.2
  },
  {
    id: 3,
    name: "Western Ghats Trading Co",
    location: "Hassan",
    contact: "+91 9876543212",
    rating: 4.8
  }
];

function generatePrices() {
  return mockTraders.map(trader => ({
    traderId: trader.id,
    prices: {
      arabica: Math.floor(Math.random() * (450 - 380) + 380),
      robusta: Math.floor(Math.random() * (350 - 280) + 280)
    }
  }));
}

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>PlantrPrice</h1>
        <p>Coffee Market Prices from Traders</p>
      </div>
    </header>
  );
}

function FilterBar({ location, setLocation, sortBy, setSortBy }) {
  return (
    <div className="filter-bar">
      <div>
        <label>Location: </label>
        <select value={location} onChange={e => setLocation(e.target.value)}>
          <option value="">All</option>
          <option value="Sakleshpur">Sakleshpur</option>
          <option value="Hassan">Hassan</option>
        </select>
      </div>
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="arabica">Arabica Price</option>
          <option value="robusta">Robusta Price</option>
        </select>
      </div>
    </div>
  );
}

function TraderCard({ trader, prices, onShowDetails, isFavorite, onToggleFavorite }) {
  return (
    <div className="trader-card">
      <div className="flex justify-between items-center">
        <h3>{trader.name}</h3>
        <button 
          className="favorite-button"
          onClick={() => onToggleFavorite(trader.id)}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <p className="location">{trader.location}</p>
      {prices ? (
        <div className="prices">
          <div className="price-item">
            <div className="price-label">Arabica</div>
            <div className="price-value">₹{prices.arabica}/kg</div>
          </div>
          <div className="price-item">
            <div className="price-label">Robusta</div>
            <div className="price-value">₹{prices.robusta}/kg</div>
          </div>
        </div>
      ) : (
        <p className="text-center">Prices will be published at 11 AM</p>
      )}
      <button className="btn btn-primary w-full mt-4" onClick={() => onShowDetails(trader)}>View Details</button>
    </div>
  );
}

function TraderModal({ trader, prices, onClose }) {
  if (!trader) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-lg font-semibold mb-4">{trader.name}</h2>
        <p className="mb-2"><strong>Location:</strong> {trader.location}</p>
        <p className="mb-4"><strong>Contact:</strong> {trader.contact}</p>
        {prices && (
          <div className="prices mb-4">
            <div className="price-item">
              <div className="price-label">Arabica</div>
              <div className="price-value">₹{prices.arabica}/kg</div>
            </div>
            <div className="price-item">
              <div className="price-label">Robusta</div>
              <div className="price-value">₹{prices.robusta}/kg</div>
            </div>
          </div>
        )}
        <button className="btn btn-primary w-full" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [traders] = useState(mockTraders);
  const [prices, setPrices] = useState(null);
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('arabica');
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const now = new Date();
    const publishTime = new Date();
    publishTime.setHours(11, 0, 0, 0);

    if (now >= publishTime) {
      setPrices(generatePrices());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (traderId) => {
    setFavorites(prev => {
      if (prev.includes(traderId)) {
        return prev.filter(id => id !== traderId);
      } else {
        return [...prev, traderId];
      }
    });
  };

  const filteredTraders = traders
    .filter(trader => !location || trader.location === location)
    .sort((a, b) => {
      const priceA = prices?.find(p => p.traderId === a.id)?.prices[sortBy] || 0;
      const priceB = prices?.find(p => p.traderId === b.id)?.prices[sortBy] || 0;
      return priceB - priceA;
    });

  return (
    <div className="App">
      <Header />
      <main className="container">
        <FilterBar
          location={location}
          setLocation={setLocation}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="grid">
          {filteredTraders.map(trader => (
            <TraderCard
              key={trader.id}
              trader={trader}
              prices={prices?.find(p => p.traderId === trader.id)?.prices}
              onShowDetails={setSelectedTrader}
              isFavorite={favorites.includes(trader.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
        {selectedTrader && (
          <TraderModal
            trader={selectedTrader}
            prices={prices?.find(p => p.traderId === selectedTrader.id)?.prices}
            onClose={() => setSelectedTrader(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
