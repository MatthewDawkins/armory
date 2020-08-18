import React, { useRef } from "react";
import { SearchHistory } from "../search-history/search-history";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./searchbar.scss";

type SearchbarProps = {
  search: (data: string) => void;
  delete: (data: string) => void;
  prevSearches: any[];
};

const serversByRegion = require("../../libs/servers.json");

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  const [nameInput, setNameInput] = React.useState("");
  const [serverInput, setServerInput] = React.useState("Server");
  const [regionInput, setRegionInput] = React.useState("Region");
  const [isOpen, setIsOpen] = React.useState(false);

  const node = useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e: any) => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (regionInput.length && nameInput.length && serverInput.length) {
      props.search(`${formatName(nameInput)}/${serverInput.split(" ").join("-")}/${regionInput}`);
    } else {
      return console.log("failed");
    }
    setIsOpen(false);
  };

  const handleSubmitEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
    return;
  };

  const formatName = (name: string): string => {
    return (
      name.charAt(0).toUpperCase() + name.slice(1, name.length).toLowerCase()
    );
  };

  return (
    <div className="searchbar" ref={node} onClick={(e) => setIsOpen(!isOpen)}>
      <InputGroup onKeyPress={(e: any) => handleSubmitEnter(e)}>
        <FormControl
          size="sm"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon2"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <FormControl
          size="sm"
          as="select"
          value={regionInput}
          onChange={(e) => e && setRegionInput(e.target.value)}
        >
          <option value="" key="default-region">
            Region
          </option>
          {Object.keys(serversByRegion).map((region: string, idx: number) => (
            <option value={region} key={`region-${idx}`}>
              {region}
            </option>
          ))}
        </FormControl>
        <FormControl
          size="sm"
          as="select"
          value={serverInput}
          onChange={(e) => e && setServerInput(e.target.value)}
        >
          <option value="" key="default-server">
            Server
          </option>
          {regionInput !== "Region" &&
            serversByRegion[regionInput].map((server: string, idx: number) => (
              <option value={server} key={`server-${idx}`}>
                {server}
              </option>
            ))}
        </FormControl>
        <InputGroup.Append>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Submit
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {isOpen && (
        <SearchHistory
          delete={props.delete}
          search={props.search}
          searchedPlayers={props.prevSearches}
        />
      )}
    </div>
  );
};
