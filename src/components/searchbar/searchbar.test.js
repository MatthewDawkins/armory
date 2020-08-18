import * as React from 'react';
import { Searchbar, setNameInput} from './searchbar';
import { mount } from 'enzyme';

describe("Searchbar", () => {
  const minProps = {
    search: (search) => null,
    delete: (search) => null,
    prevSearches: [""]
  }
  const wrapper = mount(<Searchbar {...minProps}/>);

  it('should render 3 input fields', () => {
    expect((wrapper).find("FormControl").length).toBe(3);
  });

  const state = [""];


});


