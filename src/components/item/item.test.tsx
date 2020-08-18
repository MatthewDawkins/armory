import React from 'react';
import { shallow } from 'enzyme';
import { Item } from './item';

describe('<Item />', () => {
  const minProps = {
    img: "",
    id: 0
  };
  const wrapper = shallow(<Item {...minProps} />);
  it("renders 1 frame img element and 1 item img element", () => {
    expect(wrapper.find('img').length).toEqual(2);
  });
});
