import React from "react";
import { render } from "enzyme";
import { Searchbar } from "./searchbar";

describe("<searchbar />", () => {
  let minProps = {
    servers: ["", ""],
    regions: ["", ""],
    search: () => {
      return;
    },
  };
  const wrapper = render(<Searchbar {...minProps} />);

  it("renders a form with one search field, two selection dropdowns, and one submit button", () => {
    expect(wrapper.find("Form").length).toEqual(1);
    expect(wrapper.find("select").length).toEqual(1);
    expect(wrapper.find("Button").length).toEqual(1);
  });


});
