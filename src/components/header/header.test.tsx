import React from "react";
import { render, shallow } from "enzyme";
import { Header } from "./header";

describe("<header />", () => {
  let minProps = {
      text: ''
    }

  const wrapper = shallow(<Header {...minProps} />);

  it("appears", () => {
    expect(wrapper.find("header").length).toEqual(1);
  });


});
