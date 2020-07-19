import React, { useRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { SearchHistory } from "../search-history/search-history";
import { servers, regions } from "../../placeholders";
import "./searchbar.css";


type SearchbarProps = {
  search: (data: string) => void;
  delete: (data: string) => void;
  prevSearches: any[];
};

interface Region {
  [region: string]: string[];
}

export const Searchbar: React.FC<SearchbarProps> = (props) => {

  const [regionInput, setRegionInput] = React.useState("");
  const [nameInput, setNameInput] = React.useState("");
  const [serverInput, setServerInput] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const node = useRef<HTMLHeadingElement>(null);


  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleSearch = (prevSearch: string) => {
    const [username, server, region] = prevSearch.split("_");
    setNameInput(username);
    setServerInput(server);
    setRegionInput(region);
    props.search(prevSearch);
  };

  const handleSubmit = () => {
    if (regionInput.length && nameInput.length && serverInput.length) {
      console.log(`${nameInput}_${serverInput}_${regionInput}`);
      props.search(`${nameInput}_${serverInput}_${regionInput}`);
    } else {
      return console.log("failed");
    }
    setIsOpen(false);
  };

  const handleSubmitEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    return;
  };

  const handleClick = (e: any) => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };



  return (
    <div className="searchbar" ref={node} onClick={e => setIsOpen(!isOpen)}>
      <InputGroup onKeyPress={(e: any) => handleSubmitEnter(e)} >
        <FormControl
          size="lg"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon2"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
        <FormControl
          size="lg"
          as="select"
          value={regionInput || "region"}
          onChange={e => e && setRegionInput(e.target.value)}
        >
          <option key={"region"}>Region</option>
          {regions.map((region, idx) => <option value={region} key={`region-${idx}`}>{region}</option>)}
        </FormControl>
        <FormControl
          size="lg"
          as="select"
          value={serverInput}
          onChange={e => e && setServerInput(e.target.value)}
        >
          <option key={"server"}>{regionInput ? "Server" : "..."}</option>
          {regionInput ? (servers[regionInput].map((server, idx) => <option value={server} key={`server-${idx}`}>{server}</option>)) : (
            Object.keys(servers).map((server, idx) => <option value={server} key={`server-${idx}`}>{server}</option>)
          )}
        </FormControl>
        <InputGroup.Append>
          <Button size="lg" variant="primary" onClick={handleSubmit}>Submit</Button>
        </InputGroup.Append>
      </InputGroup>
      {isOpen && (
        <SearchHistory
          delete={props.delete}
          search={handleSearch}
          searchedPlayers={props.prevSearches}
          onClick={handleClick}
        />
      )}
    </div>
  );
};



