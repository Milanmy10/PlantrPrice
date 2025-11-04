import React from 'react';

export function FilterBar({ location, setLocation, sortBy, setSortBy }) {
  const locations = ['All', 'Sakleshpur', 'Hassan'];
  const sortOptions = ['arabica', 'robusta'];

  return (
    <div className="filter-bar">
      <div className="container">
        <div className="flex justify-between">
          <div>
            <label>Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map(loc => (
                <option key={loc} value={loc === 'All' ? '' : loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)} Price
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}