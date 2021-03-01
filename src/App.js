import React, { useState, useEffect } from "react";

import "./App.css";
import api from "./utils/api";

import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get()
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    // get input value
    setSearch(e.target.value);
  };

  // change in the searchbar
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder="Search"
            onChange={handleChange}
          />
        </form>
      </div>

      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
