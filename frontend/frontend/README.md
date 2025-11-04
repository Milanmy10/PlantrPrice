# PlantrPrice

A mobile-first React application for Sakleshpur coffee planters to view daily trader prices.

## Features

- View daily coffee prices from local traders
- Filter traders by location
- Sort by Arabica or Robusta prices
- Save favorite traders for quick access
- Detailed trader information including contact details and ratings
- Responsive, mobile-first design
- Real-time price updates (published at 11 AM daily)

## Tech Stack

- React 18
- Tailwind CSS for styling
- MSW (Mock Service Worker) for API mocking
- Context API for state management
- Jest and React Testing Library for testing
- localStorage for persistent favorites

## Getting Started

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Milanmy10/PlantrPrice.git
   cd PlantrPrice/frontend/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder.

## Testing

Run the test suite:

```bash
npm test
```

## Project Structure

```
src/
  ├── components/           # React components
  │   ├── Header.js
  │   ├── FilterBar.js
  │   ├── TraderCard.js
  │   ├── TraderDetailsModal.js
  │   └── FavoritesList.js
  ├── contexts/            # React Context providers
  │   ├── TraderContext.js
  │   └── FavoritesContext.js
  ├── mocks/              # MSW API mocks
  │   ├── browser.js
  │   └── handlers.js
  ├── services/           # API services
  │   └── api.js
  └── App.js             # Main application component
```

## Features

### Price Display Logic

- Before 11 AM: Shows "Prices will be published at 11 AM"
- After 11 AM: Displays the day's prices for each trader

### Favorites Management

- Star/unstar traders to add/remove from favorites
- Favorites persist across sessions using localStorage
- Quick access to favorite traders via the favorites view

### Filtering and Sorting

- Filter traders by location (All, Sakleshpur, Hassan)
- Sort by Arabica or Robusta prices
- Mobile-friendly filter controls

## Development Notes

### Mock API Endpoints

- GET /api/traders - List all traders
- GET /api/prices/published?date=YYYY-MM-DD - Get published prices for a date
- GET /api/traders/:id/prices - Get prices for a specific trader

### State Management

Using React Context for:
- Trader data and prices (TraderContext)
- Favorites management (FavoritesContext)

## Future Enhancements (Phase 2)

- Real API integration
- Price history charts
- Trader reviews and ratings
- Price alerts
- Offline support
- Multiple language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
