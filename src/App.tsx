import React, { useState, useEffect } from "react";
import { Searchbar } from './components/searchbar/searchbar';
import { WCRAFT_API_URL } from './placeholders';
import { Header } from './components/header/header';
import { Inventory } from "./components/inventory/inventory";

export const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [player, setPlayer] = useState({
    username: '',
    server: '',
    region: ''
  });
  const [data, setData] = useState<any[]>([{}]);

  const getInventory = (results: any[]) => {
    return (
      (results.find((encounter) => (encounter.gear).find((item: any) => item.name !== "Unknown Item"))).gear
    )
  };

  useEffect(() => {
    const playerURL = `${player.username}/${player.server}/${player.region}`;
    if (player.username !== "") {
      fetch(`${WCRAFT_API_URL}parses/character/${playerURL}?timeframe=historical&api_key=${process.env.REACT_APP_WARCRAFTLOGS_API_KEY}`)
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          if (!result.error) {
            setData(getInventory(result));
            setError(null);
          } else {
            throw (new Error(result.error))
          }
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error.message);
        })
    }
  }, [player])

  const handleSearch = (playerSearch: any) => {
    const { username, server, region } = playerSearch;
    setPlayer(() => {
      return {
        username: username,
        server: server,
        region: region
      };
    });
  }

  return (
    <div className="App">
      <Header text="World of Warcraft - Classic - Armory" />
      <Searchbar search={handleSearch} />
      <div className="player">
        {(isLoaded && error) ? (
          <span>{JSON.stringify(error)}</span>
        ) : (isLoaded && !error) ? (
          <div className="player-inventory">
            <h1>{player.username}</h1>
            <h4>{`${player.server}/${player.region}`}</h4>
            <Inventory
              items={data}
            />
          </div>
        ) : (
          <span>input info to search for player</span>
        )}
      </div>
    </div>
  )
}


