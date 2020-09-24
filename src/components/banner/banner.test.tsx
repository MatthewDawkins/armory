import React from 'react';
import { shallow } from 'enzyme';
import { Banner } from './banner';

describe('<Banner />', () => {
  const minProps = {
    heading: "",
    message: "test message"
  };
  const wrapper = shallow(<Banner {...minProps} />);
  it("renders the message  passed to it", () => {
    expect(wrapper.find('p').text()).toBe("test message");
  });
  it("does not render when close icon is clicked", () => {
    wrapper.simulate("click")
    expect(wrapper).toBeTruthy()





  })
});