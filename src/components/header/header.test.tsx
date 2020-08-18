import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('<header />', () => {
  const minProps = {
    text: 'test',
  };
  const wrapper = shallow(<Header {...minProps} />);
  it("renders the text passed to it", () => {
    expect(wrapper.find('header').text()).toBe('test');
  });
});
