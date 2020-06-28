import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type SearchbarProps = {
  regions: string[];
  servers: string[];
  submitData: (data: any) => void;
};

export const Searchbar: React.FC<SearchbarProps> = (props) => {
  const [regionInput, setRegionInput] = React.useState("");
  const [nameInput, setNameInput] = React.useState("");
  const [serverInput, setServerInput] = React.useState("");

  const getCheckCase = () => {
    return regionInput && nameInput && serverInput
      ? 6
      : regionInput && nameInput
      ? 5
      : regionInput && serverInput
      ? 4
      : regionInput
      ? 3
      : serverInput
      ? 2
      : nameInput
      ? 1
      : 0;
  };

  const validateSubmit = () => {
    let caseNumber = getCheckCase();
    let result;

    switch (caseNumber) {
      case 6:
        result = "valid";
        break;
      case 5:
        result = "missing server input";
        break;
      case 4:
        result = "missing name input";
        break;
      case 3:
        result = "missing server and name input";
        break;
      case 2:
        result = "missing region and name input";
        break;
      case 1:
        result = "missing region and server input";
        break;
      case 0:
        result = "missing all input fields";
    }
    return result;
  };

  const handleSubmitClick = () => {
    const result = validateSubmit();

    return (result === "valid" ? props.submitData(
      {
          region: regionInput,
          name: nameInput,
          server: serverInput,
      }
    ) : (
      console.log(result)
    )
    )};

  return (
    <div className="searchbar">
      <Form>
        <Form.Row>
          <div className="col-lg-2" test-data="input-01">
            <Form.Control
              size="lg"
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Character name"
            />
          </div>
          <div className="col-lg-2" test-data="input-02">
            <Form.Control
              as="select"
              onChange={(e) => setServerInput(e.target.value)}
              size="lg"
            >
              <option key="server-label">Server</option>
              {props.servers.map((server, idx) => (
                <option key={idx}>{server}</option>
              ))}
            </Form.Control>
          </div>
          <div className="col-lg-.4" test-data="input-03">
            <Form.Control
              as="select"
              onChange={(e) => setRegionInput(e.target.value)}
              size="lg"
            >
              <option key="region-label">Region</option>
              {props.regions.map((region, idx) => (
                <option key={idx}>{region}</option>
              ))}
            </Form.Control>
          </div>
          <Button size="lg" onClick={handleSubmitClick} variant="outline-primary">
            Submit
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
};

export default Searchbar;
