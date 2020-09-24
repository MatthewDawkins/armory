import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

jest.mock("./")

describe('<App/>', () => {
  it("renders", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy;
  });

  describe('when a user submits form inputs', () => {
    it('should mount search-options component on invalid form data', () => {


    })
  })



});


