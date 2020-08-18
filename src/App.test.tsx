import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

it('renders App', () => {
  const wrapper = shallow(<App />);
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper).toBeTruthy;
});
