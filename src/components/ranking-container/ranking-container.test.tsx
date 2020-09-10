import React from "react";
import { shallow } from "enzyme";
import { RankingContainer } from "./ranking-container";


describe("<RankingContainer/>", () => {
  jest.mock("fetch");

  const minProps = {
    classID: 1,
    encounterID: 1,
    phaseID: 1,
    rankingMetric: "dps",
    onValidReport: () => null
  }

  const shallowWrapper = shallow(<RankingContainer {...minProps} />);

  // describe("App", () => {

  //   let props:any;
  //   let wrapper;
  //   let useEffect:any;

  //   const parsesReport = []

  //   const mockUseEffect = () => {
  //     useEffect.mockImplementationOnce((f:any) => f());
  //   };

  //   beforeEach(() => {
  //     useEffect = jest.spyOn(React, "useEffect");

  //     props = {
  //       fetchParses: jest.fn().mockResolvedValue(parses),
  //     };

  //     mockUseEffect();
  //     mockUseEffect();
  //     wrapper = shallow(<Authors {...props} />);
  //   });

  //   describe("on start", () => {
  //     it("loads the authors", () => {
  //       expect(props.fetchAuthors).toHaveBeenCalled();
  //     });
  //   });
});