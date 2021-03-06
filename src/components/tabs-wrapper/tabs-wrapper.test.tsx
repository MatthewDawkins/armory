import React from "react";
import { shallow, mount } from "enzyme";
import { TabsWrapper } from "./tabs-wrapper";
import { RaidResults } from "../../libs/types";

describe("<TabsContainer/>", () => {
  const minRaidResults: RaidResults[] = [
    {
      name: "",
    },
  ];
  const minProps = {
    raids: minRaidResults,
  };

  const shallowWrapper = shallow(<TabsWrapper {...minProps} />);

  it("renders 1 tab when passed one set of incomplete raidResult data", () => {
    expect(shallowWrapper.find("Tab").length).toBe(1);
  });
});
