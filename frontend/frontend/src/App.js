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
      robusta: Math.floor(Math.random() * (350 - 280) + 280),
      arabicaParchment: Math.floor(Math.random() * (520 - 450) + 450),
      robustaParchment: Math.floor(Math.random() * (420 - 350) + 350),
      arabicaCherry: Math.floor(Math.random() * (150 - 120) + 120),
      robustaCherry: Math.floor(Math.random() * (130 - 100) + 100),
      pepper: Math.floor(Math.random() * (800 - 650) + 650)
    }
  }));
}

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`header ${!isVisible ? 'hidden' : ''}`} onClick={scrollToTop}>
      <div className="container header-content">
        <div className="title-group">
          <div className="home-button">
            <svg className="home-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 12h3v9h7v-6h2v6h7v-9h3L12 2zm0 2.84L19.5 12H18v7h-4v-6H10v6H6v-7H4.5L12 4.84z"/>
            </svg>
          </div>
          <div className="title-text">
            <div className="title-line">
              <h1>PlantrPrice</h1>
              <span className="subtitle">Market Prices from Traders</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FilterBar({ location, setLocation, sortBy, setSortBy, showFavorites, setShowFavorites }) {
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
          <option value="arabica">Arabica</option>
          <option value="arabicaParchment">Arabica Parchment</option>
          <option value="arabicaCherry">Arabica Cherry</option>
          <option value="robusta">Robusta</option>
          <option value="robustaParchment">Robusta Parchment</option>
          <option value="robustaCherry">Robusta Cherry</option>
          <option value="pepper">Black Pepper</option>
        </select>
      </div>
      <div className="favorite-filter">
        <label>
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={e => setShowFavorites(e.target.checked)}
          />
          Show Favorites Only
        </label>
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
          <div className="price-group">
            <h4 className="price-group-title">Arabica</h4>
            <div className="price-item">
              <div className="price-label">Raw</div>
              <div className="price-value">₹{prices.arabica}/kg</div>
            </div>
            <div className="price-item">
              <div className="price-label">Parchment</div>
              <div className="price-value">₹{prices.arabicaParchment}/bag</div>
            </div>
            <div className="price-item">
              <div className="price-label">Cherry</div>
              <div className="price-value">₹{prices.arabicaCherry}/bag</div>
            </div>
          </div>
          
          <div className="price-group">
            <h4 className="price-group-title">Robusta</h4>
            <div className="price-item">
              <div className="price-label">Raw</div>
              <div className="price-value">₹{prices.robusta}/kg</div>
            </div>
            <div className="price-item">
              <div className="price-label">Parchment</div>
              <div className="price-value">₹{prices.robustaParchment}/bag</div>
            </div>
            <div className="price-item">
              <div className="price-label">Cherry</div>
              <div className="price-value">₹{prices.robustaCherry}/bag</div>
            </div>
          </div>

          <div className="price-item pepper-price">
            <div className="price-label">Black Pepper</div>
            <div className="price-value">₹{prices.pepper}/kg</div>
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
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!trader) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <div className="trader-header">
            <h2 className="trader-name">{trader.name}</h2>
            <div className="trader-contact-info">
              <p className="location"><strong>Location:</strong> {trader.location}</p>
              <p className="contact">
                <strong>Contact:</strong>{" "}
                <a href={`tel:${trader.contact}`} className="phone-link">
                  {trader.contact}
                </a>
              </p>
            </div>
          </div>

          <div className="modal-section prices-section">
            <h3 className="section-title">Current Prices</h3>
            {prices && (
              <div className="prices">
                <div className="price-group">
                  <h4 className="price-group-title">Arabica</h4>
                  <div className="price-item">
                    <div className="price-label">Raw</div>
                    <div className="price-value">₹{prices.arabica}/kg</div>
                  </div>
                  <div className="price-item">
                    <div className="price-label">Parchment</div>
                    <div className="price-value">₹{prices.arabicaParchment}/bag</div>
                  </div>
                  <div className="price-item">
                    <div className="price-label">Cherry</div>
                    <div className="price-value">₹{prices.arabicaCherry}/bag</div>
                  </div>
                </div>
                
                <div className="price-group">
                  <h4 className="price-group-title">Robusta</h4>
                  <div className="price-item">
                    <div className="price-label">Raw</div>
                    <div className="price-value">₹{prices.robusta}/kg</div>
                  </div>
                  <div className="price-item">
                    <div className="price-label">Parchment</div>
                    <div className="price-value">₹{prices.robustaParchment}/bag</div>
                  </div>
                  <div className="price-item">
                    <div className="price-label">Cherry</div>
                    <div className="price-value">₹{prices.robustaCherry}/bag</div>
                  </div>
                </div>

                <div className="price-item pepper-price">
                  <div className="price-label">Black Pepper</div>
                  <div className="price-value">₹{prices.pepper}/kg</div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-section trader-details">
            <h3 className="section-title">Trader Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Rating</span>
                <span className="detail-value rating">
                  {trader.rating} <span className="star">★</span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Experience</span>
                <span className="detail-value">15+ Years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment Methods</span>
                <span className="detail-value">Cash, UPI, Bank Transfer</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Business Hours</span>
                <span className="detail-value">Mon-Sat: 9AM - 6PM</span>
              </div>
            </div>
            <div className="trader-description">
              <p>Established coffee trader with expertise in premium coffee bean trading. 
              Specializing in high-quality Arabica and Robusta varieties from the Western Ghats region. 
              Direct relationships with local farmers ensuring fair prices and quality products.</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [traders] = useState(mockTraders);
  const [prices, setPrices] = useState(null);
  
  // Add padding to main content when component mounts
  useEffect(() => {
    const header = document.querySelector('.header');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.body.style.paddingTop = `${headerHeight}px`;
    }
  }, []);
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('arabica');
  const [showFavorites, setShowFavorites] = useState(false);
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
    .filter(trader => (!location || trader.location === location) && 
                     (!showFavorites || favorites.includes(trader.id)))
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
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
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
