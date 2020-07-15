import React, { useState, useEffect } from "react";
import { Searchbar } from './components/searchbar/searchbar';
import { WCRAFT_API_URL } from './placeholders';
import { Header } from './components/header/header';
import { Player } from './components/player/player';
import Spinner from 'react-bootstrap/Spinner'
import "./App.css";


export const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState({
    username: '',
    server: '',
    region: '',
  });
  const [playerResults, setPlayerResults] = useState<any[]>([{}]);


  const getInventory = (results: any[]) => {
    const result = results.find((encounter) => (encounter.gear).find((item: any) => item.name !== "Unknown Item"));
    return ([{
      items: result.gear,
      class: result.class,
      spec: result.spec,
      percentile: result.percentile
    }]);
  };

  useEffect(() => {
    const playerURL = `${player.username}/${player.server}/${player.region}`;
    if (player.username !== "") {
      setLoading(true);
      fetch(`${WCRAFT_API_URL}parses/character/${playerURL}?timeframe=historical&api_key=${process.env.REACT_APP_WARCRAFTLOGS_API_KEY}`)
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          if (!result.error) {
            setPlayerResults(getInventory(result));
            setError(null);
            setLoading(false);
          } else {
            throw (new Error(result.error))
          }
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error.message);
          setLoading(false);
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
      <Header text="Classic Wow Armory" />
      <Searchbar search={handleSearch} />
      {(isLoaded && error) ? (
        <h4 className="error-message">{error}</h4>
      ) : (isLoaded && !error) ? (
        playerResults.map(result => (
          <Player
            name={player.username}
            server={player.server}
            items={result.items}
            class={result.class}
            spec={result.spec}
            percentile={result.percentile}
          />
        ))) : loading ? (
          <Spinner animation="border" style={{ color: "#0382C1" }} role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
              <h4 className="welcome-message"><i>Input username/region/server of player to Search</i></h4>
            )
      }
      <footer className="footer">Classic Wow Armory</footer>
    </div>
  );
}


