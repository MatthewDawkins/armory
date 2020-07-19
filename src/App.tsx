import React, { useState, useEffect } from "react";
import { Header } from "./components/header/header";
import { Searchbar } from "./components/searchbar/searchbar";
import { Player } from "./components/player/player";
import Spinner from "react-bootstrap/Spinner"
import { WCRAFT_API_URL } from "./placeholders";
import "./App.css";

type playerInfo = {
  username: string;
  server: string;
  region: string;
}

const playerInitialState: playerInfo = {
  username: "",
  server: "",
  region: "",
};


export const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<playerInfo>(playerInitialState);
  const [playerResults, setPlayerResults] = useState<any[]>([{}]);
  const [prevSearches, setPrevSearches] = useState<string[]>([]);


  const getInventory = (results: any[]) => {
    const result = results.find((encounter) => (encounter.gear).find((item: any) => item.name !== "Unknown Item"));
    return ([{
      items: result.gear,
      class: result.class,
      spec: result.spec,
      percentile: result.percentile,
      name: result.characterName,
      server: result.server,
    }]);
  };

  useEffect(() => {
    const playerURL = `${player.username}/${player.server}/${player.region}`;
    if (player.username !== "") {
      setLoading(true);
      fetch(`${WCRAFT_API_URL}parses/character/${playerURL}?&api_key=${process.env.REACT_APP_WARCRAFTLOGS_API_KEY}`)
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          if (!result.error) {
            setPlayerResults(getInventory(result));
            setError(null);
            setLoading(false);
          } else {
            throw (new Error(result.error));
          }
        })
        .catch((error) => {
          setIsLoaded(true);
          setLoading(false);
          setError(error.message);
          setPrevSearches(prevSearches => prevSearches.slice(0, -1));
        })
    }
  }, [player]);


  const handleSearch = (search: string) => {
    console.log(Array.from(new Set([...prevSearches, search])));
    setPrevSearches(Array.from(new Set([...prevSearches, search])));

    const [username, server, region] = search.split("_");
    setPlayer({ username: username, server: server, region: region });
  };

  const deleteSearch = (prevSearch: any) => {
    setPrevSearches(prevSearches.filter(prev => prev !== prevSearch));
  };

  return (
    <div className="App">
      <Header text="Classic Wow Armory" />
      <Searchbar
        delete={deleteSearch}
        search={handleSearch}
        prevSearches={prevSearches}
      />
      {loading && (
        <Spinner animation="border" style={{ color: "#0382C1" }} role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {(!loading && error) && (
        <h4 className="error-message">{error}</h4>
      )}
      {(isLoaded && prevSearches.length) && (
        playerResults.map(result => (
          <Player
            name={result.name}
            server={result.server}
            items={result.items}
            class={result.class}
            spec={result.spec}
            percentile={result.percentile}
            region={player.region}
          />
        ))
      )}
      {(!loading && !prevSearches.length) && (
        <h4 className="welcome-message">
          <i>Input username/region/server of player to Search</i>
        </h4>
      )}
      <footer className="footer">Classic Wow Armory</footer>
    </div>
  );
}


