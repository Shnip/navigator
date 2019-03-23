import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('test App component', () => {
  const component = shallow(<App />);

  it ('renders Header component', () => {
    expect(component.find('Header')).toHaveLength(1);
  });

  it ('renders Routes component', () => {
    expect(component.find('Routes')).toHaveLength(1);
  });

  it ('renders Footer component', () => {
    expect(component.find('Footer')).toHaveLength(1);
  });

  it ('renders properly', () => {
    expect(component).toMatchSnapshot();
  });
})
