import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(response => response.json())
      .then(data => setBeers(data));
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Beer Catalog</h1>
        <input
          type="text"
          placeholder="Search for a beer..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </header>
      <div className="beer-list">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} className="beer-image" />
            <div className="beer-details">
              <h2>{beer.name}</h2>
              <p className="tagline">{beer.tagline}</p>
              <p className="description">{beer.description}</p>
              <p className="abv-ibu">
                ABV: {beer.abv}% | IBU: {beer.ibu}
              </p>
              <p className="food-pairing">
                Food Pairing: {beer.food_pairing.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
