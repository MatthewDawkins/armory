import React from 'react';
import { shallow } from 'enzyme';
import { Timestamp } from './timestamp';

describe('<Timestamp/>', () => {
  const minProps = {
    milliseconds: 1,
  };

  const wrapper = shallow(<Timestamp {...minProps} />);
  it("renders a local date string without GMT from the number  passed to it", () => {
    expect(wrapper.find('h5').text()).toBe('Wed Dec 31 1969 16:00:00 GMT-0800 (Pacific Standard Time)');
  });
});
