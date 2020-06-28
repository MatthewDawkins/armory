import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import { Searchbar } from './searchbar';
import Form from 'react-bootstrap/Form';


describe('<Searchbar />', () => {
  let minProps = {
    servers: ['', ''],
    regions: ['', ''],
    submitData: (() => {
      return
    })
  };
    const wrapper = render(<Searchbar {...minProps} />);

    it('renders a form with one search field, two selection dropdowns, and one submit button', () => {
      expect(wrapper.find('Form').length).toEqual(1);
      expect(wrapper.find('select').length).toEqual(2);
      expect(wrapper.find('Button').length).toEqual(1);
    });

    it('renders a number selectable <option> elements based on prop vals', () => {
      expect(wrapper.find('option').length).toEqual(6);
    });

    it('should call a function on input field change, passing the event', () => {
      const event = {
        preventDefault() {},
        target: { value: 'the-value' }
      };
      const mockSetInput = jest.fn();
      const component = shallow(<Form.Control onChange={mockSetInput} />);
      component.find('input').simulate('change', event);
      expect(mockSetInput).toBeCalledWith(event);

      

    });

    it ('should init with no input values stored in state', () => {

      
    })


});
    
    