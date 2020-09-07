import React from "react";
import "./App.css";
import { Header } from "./components/header/header";
import { Searchbar } from "./components/searchbar/searchbar";
import { PlayerContext } from "./hooks/playerContext";
import Spinner from "react-bootstrap/Spinner";
import { Raid, RaidResults } from "./libs/types";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "./libs/placeholders";
import { TabsWrapper } from "./components/tabs-wrapper/tabs-wrapper";
import { SearchOptions } from "./components/search-options/search-options";

const raids: Raid[] = [
  {
    name: "MC",
    raidID: 1000,
    encounterID: 673,
    phaseID: 1,
  },
  {
    name: "BWL",
    raidID: 1002,
    encounterID: 630,
    phaseID: 2,
  },
  {
    name: "AQ",
    raidID: 1005,
    encounterID: 700,
    phaseID: 3,
  },
];

const relatedSearchesError = "No related results found";

export const App: React.FC = () => {
  const [currentSearch, setCurrentSearch] = React.useState("");
  const [prevSearches, setPrevSearches] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [playerResults, setPlayerResults] = React.useState<any[]>([]);

  const doParsesFetchForEachRaid = async (raids: Raid[], search: string) => {
    setLoading(true);
    const raidRankings = raids.map((raid) => {
      return doParsesFetch(
        `${WCRAFT_API_URL}/parses/character/${search}?zone=${raid.raidID}`,
        3,
        raid
      );
    });
    const results: RaidResults[] = await Promise.all(raidRankings);
    handleResults(results, search);
  };

  const doParsesFetch = async (baseUrl: string, phases: number, raid: Raid) => {
    for (let i = phases; i >= 0; i--) {
      try {
        const res = await fetch(
          `${baseUrl}&zoneID=${raid.raidID}&partition=${i}&${WCRAFT_API_KEY}`
        );
        const results = await res.json();

        if (results.length) {
          return {
            ...raid,
            reports: results,
          };
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    return { name: raid.name };
  };

  const handleResults = (results: RaidResults[], search: string) => {
    const isValid = !!results.find((report) => report.reports);
    if (isValid) {
      setPrevSearches((prev) =>
        prev.length < 8
          ? Array.from(new Set([...prev, search]))
          : Array.from(new Set([...prev.slice(1, prev.length), search]))
      );
      setPlayerResults(results);
    } else {
      setError("Valid data for player could not be found");
    }
    setCurrentSearch(search);
    setLoading(false);
  };


  const isValidSearch = (userSearch: string) => {
    console.log(userSearch, prevSearches)
    const [name, server, region] = userSearch.split("/");
    if (userSearch === prevSearches[prevSearches.length - 1] && currentSearch !== name) {
      return false;
    }
    if (name && server && region) {
      setError("");
      return true;
    } else {
      setError("Input data was omitted");
      setCurrentSearch(userSearch);
    }
    return false;
  };

  const handleSearch = (search: string) => {
    if (isValidSearch(search)) {
      doParsesFetchForEachRaid(raids, search);
    }
    return;
  };

  const deleteSearch = (prevSearch: string) => {
    setPrevSearches(prevSearches.filter((prev) => prev !== prevSearch));
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
      {currentSearch && (
        <>
          {error ? (
            <SearchOptions
              playerSearch={currentSearch}
              search={(search) => (setCurrentSearch(""), handleSearch(search))}
              onSearchError={() =>
                setError("No character data was found for search")
              }
            />
          ) : (
            playerResults.length && (
              <PlayerContext.Provider value={currentSearch}>
                <TabsWrapper raids={playerResults} />
              </PlayerContext.Provider>
            )
          )}
        </>
      )}
      <footer className="footer">{`© 2020 Classic Wow Armory`}</footer>
    </div>
  );
};
