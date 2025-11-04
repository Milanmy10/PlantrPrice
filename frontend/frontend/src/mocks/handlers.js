import { http, HttpResponse } from 'msw';

const traders = [
  {
    id: 1,
    name: "Green Valley Coffee",
    location: "Sakleshpur",
    contact: "+91 9945678901",
    rating: 4.8,
    type: "Premium Exporter"
  },
  {
    id: 2,
    name: "Malnad Trading Co",
    location: "Sakleshpur",
    contact: "+91 9845123456",
    rating: 4.6,
    type: "Wholesale Buyer"
  },
  {
    id: 3,
    name: "Highland Coffee Works",
    location: "Hassan",
    contact: "+91 9845678901",
    rating: 4.7,
    type: "Premium Exporter"
  },
  {
    id: 4,
    name: "Western Ghats Traders",
    location: "Hassan",
    contact: "+91 9945123456",
    rating: 4.5,
    type: "Local Buyer"
  },
  {
    id: 5,
    name: "Mountain Brew Trading",
    location: "Sakleshpur",
    contact: "+91 9845678902",
    rating: 4.9,
    type: "Premium Exporter"
  }
];

const generatePrices = (date) => {
  // Base prices
  const baseArabica = 425;
  const baseRobusta = 320;
  
  return traders.map(trader => {
    // Premium exporters offer slightly higher prices
    const premium = trader.type === "Premium Exporter" ? 15 : 0;
    
    // Add some random variation
    const arabicaVariation = Math.floor(Math.random() * 20) - 10;
    const robustaVariation = Math.floor(Math.random() * 15) - 7;

    return {
      traderId: trader.id,
      date,
      prices: {
        arabica: baseArabica + premium + arabicaVariation,
        robusta: baseRobusta + premium + robustaVariation
      }
    };
  });
};

export const handlers = [
  // Get all traders
  http.get('/api/traders', () => {
    return HttpResponse.json(traders);
  }),

  // Get published prices for a specific date
  http.get('/api/prices/published', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const now = new Date();
    const publishTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0);

    if (now < publishTime) {
      return new HttpResponse(
        JSON.stringify({ message: "Prices will be published at 11 AM" }),
        { status: 403 }
      );
    }

    return HttpResponse.json(
      generatePrices(date || new Date().toISOString().split('T')[0])
    );
  }),

  // Get prices for a specific trader
  http.get('/api/traders/:id/prices', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const traderPrices = generatePrices(date).find(p => p.traderId === parseInt(id));

    if (!traderPrices) {
      return new HttpResponse(
        JSON.stringify({ message: "Trader not found" }),
        { status: 404 }
      );
    }

    return HttpResponse.json(traderPrices);
  })
];