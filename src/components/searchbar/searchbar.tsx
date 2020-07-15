import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './searchbar.css';
import { servers, regions } from "../../placeholders";

type SearchbarProps = {
  search: (data: any) => void;
};

interface Region {
  [region: string]: string[];
}

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  const [regionInput, setRegionInput] = React.useState("");
  const [nameInput, setNameInput] = React.useState("");
  const [serverInput, setServerInput] = React.useState("");


  const handleSubmit = (event: any) => {
    if (regionInput.length && nameInput.length && serverInput.length) {
      const playerData = {
        username: nameInput,
        server: serverInput,
        region: regionInput
      };
      props.search(playerData);
    } else {
      return console.log("failed");
    }
  }

  const handleSubmitEnter = (e:any) => {

    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
    console.log(e.target.value);
  }



  return (
    <div className="searchbar">
      <InputGroup onKeyPress={(e:any) => handleSubmitEnter(e)}>
        <FormControl
          size="lg"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon2"
          onChange={e => setNameInput(e.target.value)}
        />
        <Form.Control
          size="lg"
          as="select"
          onChange={e => e && setRegionInput(e.target.value)}

        >
          <option key={"region"}>Region</option>
          {regions.map((region, idx) => <option key={`region-${idx}`}>{region}</option>)}
        </Form.Control>

        <Form.Control
          size="lg"
          as="select"
          onChange={e => e && setServerInput(e.target.value)}

        >
          <option key={"server"}>{regionInput ? "Server" : "..."}</option>
          {regionInput ? (servers[regionInput].map((server, idx) => <option key={`server-${idx}`}>{server}</option>) ): (
            (servers["US"].concat(servers["EU"]).concat(servers["OC"]).map((server, idx) => <option key={`server-${idx}`}>{server}</option>)


          ))}
        </Form.Control>
          <InputGroup.Append>
      <Button size="lg" variant="primary" onClick={handleSubmit}>Submit</Button>
      </InputGroup.Append>



      </InputGroup>
    </div>
  );

};



