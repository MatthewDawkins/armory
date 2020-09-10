import React, { useRef } from "react";
import { SearchHistory } from "../search-history/search-history";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./searchbar.css";

type SearchbarProps = {
  search: (data: string) => void;
  delete: (data: string) => void;
  prevSearches: any[];
};

const serversByRegion = require("../../libs/servers.json");

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  const [nameInput, setNameInput] = React.useState("");
  const [serverInput, setServerInput] = React.useState("");
  const [regionInput, setRegionInput] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const node = useRef<HTMLHeadingElement>(null);

  const formatName = (name: string): string => {
    return (
      name.charAt(0).toUpperCase() + name.slice(1, name.length).toLowerCase()
    );
  };

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
    if (nameInput && regionInput !== "Region" && serverInput) {
      const search = `${formatName(nameInput)}/${serverInput
        .split(" ")
        .join("-")}/${regionInput === "EU" ? regionInput : "US"}`;
      props.search(search);
    } else {
      props.search(formatName(nameInput));
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

  return (
    <div className="searchbar" ref={node} onClick={(e) => setIsOpen(!isOpen)}>
      <InputGroup onKeyPress={(e: any) => handleSubmitEnter(e)}>
        <FormControl
          size="sm"
          placeholder="Character name"
          aria-label="Character name"
          aria-describedby="basic-addon2"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <FormControl
          size="sm"
          as="select"
          value={regionInput || "Region"}
          onChange={(e) =>
            e && (setRegionInput(e.target.value), setServerInput("Server"))
          }
        >
          <option value="Region" key="default-region">
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
          value={serverInput || "Server"}
          onChange={(e) => e && setServerInput(e.target.value)}
        >
          <option value="Server" key="default-server">
            Server
          </option>
          {regionInput &&
            regionInput !== "Region" &&
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
