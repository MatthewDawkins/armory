import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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

  return (
    <div className="searchbar">
      <Form.Row>
        <Col>
          <Form.Control
            size="lg"
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="username"
          />
        </Col>
        <Col>
          <Form.Control
            size="lg"
            as="select"
            onChange={e => setRegionInput(e.target.value)}
          >
            <option key={"region"}>region</option>
            {regions.map((region, idx) => <option key={`region-${idx}`}>{region}</option>)}
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            size="lg"
            as="select"
            onChange={e => setServerInput(e.target.value)}
          >
            <option key={"server"}>{regionInput ? "server" : "..."}</option>
            {regionInput && (servers[regionInput].map((server, idx) => <option key={`server-${idx}`}>{server}</option>))}
          </Form.Control>
        </Col>
        <Button size="lg" onClick={handleSubmit} variant="outline-primary" >
          Submit
            </Button>

      </Form.Row>
    </div>
  );
};


