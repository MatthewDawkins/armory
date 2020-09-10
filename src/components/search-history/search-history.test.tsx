import React from "react";
import { SearchHistory, DeleteIcon } from "./search-history";
import { mount } from "enzyme";

describe("<SearchHistory/>", () => {
  describe("<DeleteIcon/>", () => {
    it("calls delete function with search when delete icon is clicked", () => {
      const deleteMock = jest.fn();
      const props = {
        delete: deleteMock,
        playerSearch: "player-test-search",
      };
      const wrapper = mount(<DeleteIcon {...props} />);
      const i = wrapper.find("i");
      i.simulate("click");
      expect(deleteMock).toBeCalledWith("player-test-search");
    });
  });
  describe("SearchSpan", () => {
    const deleteMock = jest.fn();
    const submitMock = jest.fn();
    const props = {
      search: submitMock,
      delete: deleteMock,
      searchedPlayers: ["player-test-search-1", "player-test-search-2"],
    };

    const wrapper = mount(<SearchHistory {...props} />);
    it("should render a number search spans equal to the number of searched players", () => {
      expect(wrapper.find("span").length).toBe(2);
    });
    it("calls search function with search when search span is clicked", () => {
      const p = wrapper.find("p").at(0);
      p.simulate("click");
      expect(submitMock).toBeCalledWith("player-test-search-1");
    });
  });
});
