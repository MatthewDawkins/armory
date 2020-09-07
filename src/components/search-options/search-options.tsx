import React from "react";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import Spinner from "react-bootstrap/Spinner";
import "./search-options.css";

const servers = require("../../libs/servers.json");
const regions = Object.keys(servers);

// const trafficErrorMsg =
//   "Sorry! We currently cannot complete your search requests";

type SimiliarPlayerProps = {
  playerSearch: string;
  onSearchError: () => void;
  search: (searchOption: string) => void;
};

export const SearchOptions: React.FC<SimiliarPlayerProps> = (props) => {
  const { playerSearch, onSearchError } = props;
  const [characterName] = playerSearch.split("/");
  const [error, setError] = React.useState<string>("Valid data was not found, searching for related results...");
  const [searchOptions, setSearchOptions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();

    let searchOptions: any[] = [];
    const isValid = async (playerURL: string) => {
      const url = `${WCRAFT_API_URL}/parses/character/${playerURL}?&${WCRAFT_API_KEY}`;
      try {
        const res = await fetch(url);
        const results = await res.json();
        if (!results.error) {
          return playerURL;
        }
      } catch (error) {
        console.log(error.message);
      }
      return false;
    };

    const checkRegion = async () => {
      regions.forEach((region) => {
        let currRegion: string;
        if (region === "NA") {
          currRegion = "US";
        } else {
          currRegion = region;
        }
        const serversOfRegion: any[] = servers[region];
        serversOfRegion.forEach((server) => {
          searchOptions.push(
            isValid(`${characterName}/${server}/${currRegion}`)
          );
        });
      });
      const results: any[] = await Promise.all(searchOptions);
      const filteredResults = results.filter((result) => result !== false);

      if (!filteredResults || !filteredResults.length) {
        setError("No related results were found with given parameters");
      } else {
        setSearchOptions(filteredResults);
        setError("")
      }
      setLoading(false);
    };

    if (characterName && !searchOptions.includes(playerSearch)) {
      checkRegion();
    }

    return () => {
      abortController.abort();
    };
  }, [characterName, onSearchError]);

  return (
    <>
      <h5 className="error-message">{error}</h5>
      {loading && (
        <div className="loader">
          <h5 className="loader-msg">
            <i>Searching for viable results...</i>
          </h5>
          <Spinner
            animation="border"
            size="sm"
            style={{ color: "grey" }}
            role="status"
          >
            <span className="sr-only">Searching for viable results...</span>
          </Spinner>
        </div>
      )}
      {!loading && searchOptions.length && (
        <div className="search-options-area">
          <h5 className="options-title">Possible character matches:</h5>
          <ul className="options-column">
            {searchOptions.map((player) => (
              <li
                className="search-option"
                key={player}
                onClick={() => props.search(player)}
              >
                <p>{player}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
