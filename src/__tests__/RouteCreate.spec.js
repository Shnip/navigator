import React from 'react';
import { shallow, mount } from 'enzyme';
import RouteCreate from '../components/Route/RouteCreate';

describe('test ReactCreate component', () => {
  const mockAddRoute = jest.fn();
  const props = {
    addRoute: mockAddRoute
  }

  const initialState = {
    route: ''
  }

  const mockYmaps = {
    geocode: (route) => {
      return new Promise((res, rej) => {
        const rightResult = {
          geoObjects: {
            toArray: () => [
              {
                properties: { get: text => 'Russia, Moscow' },
                geometry: {getCoordinates: () => [54.654, 65.875]}
              }
            ]
          }
        }
        const wrongResult = {
          geoObjects: { toArray: () => [] }
        }

        if (route === 'Moscow') res(rightResult);
        res(wrongResult)
      })
    },
    ready: () => {}
  }
  window.ymaps = mockYmaps;

  const component = shallow(<RouteCreate {...props} />);

  it('renders components', () => {
    expect(component.find('.form__input')).toHaveLength(1);
    expect(component.find('.btn')).toHaveLength(1);
  });

  it('renders NotificationContainer', () => {
    expect(component.find('NotificationContainer')).toHaveLength(1)
  })

  it('should change state via input', () => {
    component.find('#route__input').simulate('change', {
      target: {
        value: 'Moscow'
      }
    });

    expect(component.state().route).toEqual('Moscow');
  });

  it('shouldnt call addRoute when route is empty string', () => {
    component.find('.routes__form').simulate('submit', {
      preventDefault: jest.fn()
    })

    setTimeout(() => expect(mockAddRoute).toHaveBeenCalledTimes(0), 4000);
  });

  it('should call addRoute when route isn\'t empty', () => {
    component.setState({ route: 'Moscow'});
    component.find('.routes__form').simulate('submit', {
      preventDefault: () => {}
    })

    setTimeout(() => expect(mockAddRoute).toHaveBeenCalledTimes(1), 4000);
  });

  it('shouldn\'t call addRoute when route isn\'t found', () => {
    component.setState({ route: 'qwerty'});
    component.find('.routes__form').simulate('submit', {
      preventDefault: () => {}
    })

    setTimeout(() => expect(mockAddRoute).toHaveBeenCalledTimes(0), 4000);
  });

  it ('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  afterEach(() => {
    component.setState(initialState);
    mockAddRoute.mockClear();
  });
})
