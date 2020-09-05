import React from "react";
import { WCRAFT_API_URL, WCRAFT_API_KEY } from "../../libs/placeholders";
import Spinner from "react-bootstrap/Spinner";
import "./search-options.css";

const servers = require("../../libs/servers.json");
const regions = Object.keys(servers);

const initialFailureMessage = "Valid player results could not be found";
const trafficErrorMsg =
  "Sorry! We currently cannot complete your search requests";

type SimiliarPlayerProps = {
  playerSearch: string;
  search: (searchOption: string) => void;
};

export const SearchOptions: React.FC<SimiliarPlayerProps> = (props) => {
  const { playerSearch } = props;
  const [characterName] = playerSearch.split("/");

  const [searchOptions, setSearchOptions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [errorMsg, setError] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
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
        if (!errorMsg) {
          setError(error.message);
        }
      }
      return false;
    };

    const checkRegion = async () => {
      regions.forEach((region) => {
        let currRegion: string;
        if (region === "NA") {
          currRegion = "US";
        }
        const serversOfRegion: any[] = servers[region];
        serversOfRegion.forEach((server) => {
          searchOptions.push(
            isValid(`${characterName}/${server}/${currRegion}`)
          );
        });
      });
      const results: any[] = await Promise.all(searchOptions);
      setSearchOptions(results.filter((result) => result !== false));
      setLoading(false);
    };

    if (characterName) {
      checkRegion();
    }
  }, [characterName]);

  return (
    <div className="search-options-area">
      {loading && !errorMsg && !searchOptions.length && (
        <div className="loader">
          {!searchOptions.length && !errorMsg && (
            <h5 className="initial-error">{initialFailureMessage}</h5>
          )}
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
      {searchOptions.length && !errorMsg && (
        <h5 className="options-title">Related characters:</h5>
      )}
      {!loading && searchOptions.length ? (
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
      ) : (
        <h5>{errorMsg}</h5>
      )}
    </div>
  );
};
