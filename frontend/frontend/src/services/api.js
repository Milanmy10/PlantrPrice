const API_BASE_URL = '/api';

export const api = {
  async getAllTraders() {
    const response = await fetch(`${API_BASE_URL}/traders`);
    if (!response.ok) throw new Error('Failed to fetch traders');
    return response.json();
  },

  async getPublishedPrices(date) {
    const response = await fetch(`${API_BASE_URL}/prices/published?date=${date}`);
    if (!response.ok) {
      if (response.status === 403) {
        const error = await response.json();
        throw new Error(error.message);
      }
      throw new Error('Failed to fetch prices');
    }
    return response.json();
  },

  async getTraderPrices(traderId, date) {
    const response = await fetch(`${API_BASE_URL}/traders/${traderId}/prices?date=${date}`);
    if (!response.ok) throw new Error('Failed to fetch trader prices');
    return response.json();
  }
};