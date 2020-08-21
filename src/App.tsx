import React from "react";
import "./App.css";
import { Header } from "./components/header/header";
import { Searchbar } from "./components/searchbar/searchbar";
import { SearchResults } from "./components/search-results/search-results";
import Spinner from "react-bootstrap/Spinner";
import { Raid, RaidData } from "./libs/types";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "./libs/placeholders";

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

const initialPlayerResultsState: RaidData[] = [
  {
    name: "",
  },
];

export const App: React.FC = () => {
  const [currentSearch, setCurrentSearch] = React.useState("");
  const [prevSearches, setPrevSearches] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [playerResults, setPlayerResults] = React.useState<RaidData[]>(
    initialPlayerResultsState
  );

  const doParsesFetchForEachRaid = async (raids: Raid[], search: string) => {
    setLoading(true);
    const raidRankings = raids.map((raid) => {
      return doParsesFetch(
        `${WCRAFT_API_URL}/parses/character/${search}?zone=${raid.raidID}`,
        3,
        raid
      );
    });
    const results: RaidData[] = await Promise.all(raidRankings);
    handleResults(results, search);
    setLoading(false);
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
            results: results,
          };
        }
      } catch (error) {
        setError(error.message);
      }
    }
    return { name: raid.name };
  };

  const handleResults = (results: RaidData[], search: string) => {
    const isValid = !!results.find((report) => report.results);
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
  };

  const handleSearch = (search: string) => {
    if (search && currentSearch !== search) {
      setCurrentSearch(search);
      setError("");
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
      {!loading && error && <h5 className="error-message">{error}</h5>}
      {!error && playerResults[0].name ? (
        <SearchResults playerInfo={currentSearch} raids={playerResults} />
      ) : (
        !error && (
          <h4 className="welcome-message">
            <i>Input character/region/server of player to Search</i>
          </h4>
        )
      )}
      <footer className="footer">{`© 2020 Classic Wow Armory`}</footer>
    </div>
  );
};
