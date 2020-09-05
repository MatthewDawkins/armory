import React from "react";
import { shallow, mount } from "enzyme";
import { RankingContainer } from "./ranking-container";


describe("<RankingContainer/>", () => {
  jest.mock("fetch");

  const minProps = {
    classID: 1,
    encounterID: 1,
    phaseID: 1,
    rankingMetric: "dps"
  }

  const shallowWrapper = shallow(<RankingContainer {...minProps} />);


});