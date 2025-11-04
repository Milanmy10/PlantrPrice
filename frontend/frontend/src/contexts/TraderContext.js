import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const TraderContext = createContext();

export function TraderProvider({ children }) {
  const [traders, setTraders] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTraders();
  }, []);

  const loadTraders = async () => {
    try {
      const data = await api.getAllTraders();
      setTraders(data);
      setError(null);
    } catch (err) {
      setError('Failed to load traders');
    } finally {
      setLoading(false);
    }
  };

  const loadPrices = async (date) => {
    try {
      setLoading(true);
      const data = await api.getPublishedPrices(date);
      setPrices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TraderContext.Provider 
      value={{ 
        traders,
        prices,
        loading,
        error,
        loadPrices
      }}
    >
      {children}
    </TraderContext.Provider>
  );
}

export function useTraders() {
  const context = useContext(TraderContext);
  if (!context) {
    throw new Error('useTraders must be used within a TraderProvider');
  }
  return context;
}