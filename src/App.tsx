import React from "react";
import "./App.css";
import { Searchbar } from "./components/searchbar/searchbar";
import { DisplayArea } from "./components/display-area";
import axios from "axios";
import { API, placeholderData } from "./libs/placeholders";

type submitDataProps = {
  name: string;
  server: string;
  region: string;
};

const App = () => {
  const [submitData, setSubmitData] = React.useState<submitDataProps>({
    name: "",
    server: "",
    region: "",
  });

  const [waitingOnResult, toggleWaitingOnResults] = React.useState<boolean>(
    false
  );

  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const [gearData, setGearData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const reqURL =
      API +
      `parses/character/${submitData.name}/${submitData.server}/${submitData.region}?timeframe=historical&api_key=${process.env.REACT_APP_WARCRAFTLOGS_API_KEY}`;

    axios
      .get(reqURL)
      .then((response) => {
        let results = response.data;
        const parsed = JSON.stringify(results);
        console.log("results & string results:", results, parsed);
        console.log("results:", results);
        setSearchResults(results);
        toggleWaitingOnResults((value) => true);
      })
      .catch((error) => {
        return console.log(error);
      });
  }, [submitData]);

  React.useEffect(() => {
    if (searchResults.length) {
      const reqPlayerGear = getFirstEncounterWithValidGear().gear;
      console.log("GEARDATA:", reqPlayerGear);
      setGearData(reqPlayerGear);
    }
  }, [searchResults]);

  const getFirstEncounterWithValidGear = () => {
    const result = searchResults.find((encounter) => {
      return isValid(encounter.gear) === true;
    });
    return result;
  };

  const isValid = (gearSet: any[]) => {
    for (let peice of gearSet) {
      if (peice["name"] === "Unknown Item") {
        return false;
      }
    }
    return true;
  };

  const handleSubmittedData = (submittedData: any) => {
    const { name, server, region } = submittedData;
    setSubmitData(() => {
      return {
        name: name,
        server: server,
        region: region,
      };
    });
  };

  return (
    <div className="App">
      <div className="searchbar">
        <Searchbar
          submitData={handleSubmittedData}
          servers={placeholderData.servers}
          regions={placeholderData.regions}
        />
      </div>

      <div className="display-area">
        <DisplayArea searchResults={gearData} />
      </div>
    </div>
  );
};

export default App;
