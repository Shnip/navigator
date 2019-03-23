import React from 'react';
import { shallow, mount } from 'enzyme';
import Routes from '../components/Route/Routes';

describe('test App component', () => {
  const component = mount(<Routes />);
  const initialState = { routes: [], mode: 'auto' }
  const routes = [
    {
      id: 1,
      value: 'Moscow',
      geoObject: {
        balloon: 'Moscow',
        coordinates: [545.65554, 5456.656565]
      }
    },
    {
      id: 2,
      value: 'Saint-Petersburg',
      geoObject: {
        balloon: 'Saint-Petersburg',
        coordinates: [545.65554, 5456.656565]
      }
    },
    {
      id: 3,
      value: 'Murmansk',
      geoObject: {
        balloon: 'Murmansk',
        coordinates: [545.65554, 5456.656565]
      }
    }
  ];

  it ('renders RouteCreate component', () => {
    expect(component.find('RouteCreate')).toHaveLength(1);
  });

  it ('renders RouteList component', () => {
    expect(component.find('RouteList')).toHaveLength(1);
  });

  it ('renders DragDropContext component', () => {
    expect(component.find('DragDropContext')).toHaveLength(1);
  });

  it ('renders Map component', () => {
    expect(component.find('Map')).toHaveLength(1);
  });

  it ('renders 3 route', () => {
    component.setState({routes});
    expect(component.find('Route')).toHaveLength(3)
  });

  it('renders mode elements', () => {
    expect(component.find("[data-mode]")).toHaveLength(4)
  });

  it('changes mode state', () => {
    component.find("[data-mode='bus']").simulate('click', {
      target: {
        hasAttribute: () => true,
        dataset: {
          mode: 'bus'
        }
      },
      currentTarget: {}
    })
    expect(component.state().mode).toEqual('bus');
  });

  it ('delete route', () => {
    component.setState({routes});
    component.find('[data-delete]').at(0).simulate('click', {
      target: {
        hasAttribute: () => true,
        dataset: {
          delete: 1
        }
      }
    })

    const newRoutes = routes.filter(route => route.id !== 1);
    expect(component.state().routes).toEqual(newRoutes)
  });

  it ('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  afterEach(() => {
    component.setState(initialState)
  })
})
