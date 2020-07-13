import React, { useState, useEffect } from "react";
import { Searchbar } from './components/searchbar/searchbar';
import { WCRAFT_API_URL } from './placeholders';
import { Header } from './components/header/header';
import { Player } from './components/player/player';
import "./App.css";


export const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
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
    }]

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

            setPlayerResults(getInventory(result));
            console.log("inventory:", getInventory(result))



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
      <Header text="Classic Wow Armory" />
      <Searchbar search={handleSearch} />
      <div className="main-container">



        {(isLoaded && error) ? (
          <span>{JSON.stringify(error)}</span>
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

          ))) : (
              <span>input info to search for player</span>
            )}

      </div>
      <footer>Wow Armory</footer>
    </div>




  );
}


