import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext } from 'react-beautiful-dnd';
import RouteList from '../components/Route/RouteList';


describe('test ReactCreate component', () => {
  const mockDeleteRoute = jest.fn();
  const onDragEndMock = jest.fn();
  const props = {
    routes: [],
    mode: 'auto',
    deleteRoute: mockDeleteRoute,
    handleMode: jest.fn()
  }

  const component = mount(
    <DragDropContext onDragEnd={onDragEndMock}>
      <RouteList {...props}/>
    </DragDropContext>
  );

  it('displays text when routes are empty', () => {
    expect(component.find('.routes__empty')).toHaveLength(1);
  });

  describe('when routes are not empty', () => {
    const newProps = {
      ...props,
      routes: [
        {id: 1, value: 'Moscow'},
        {id: 2, value: 'Saint-Petersburg'},
        {id: 3, value: 'Murmansk'}
      ],
      mode: 'bus'
    }

    const component = mount(
      <DragDropContext onDragEnd={onDragEndMock}>
        <RouteList {...newProps}/>
      </DragDropContext>
    );

    it('renders Routes List components', () => {
      expect(component.find('.routes__list')).toHaveLength(1);
    });

    it('renders Route components', () => {
      expect(component.find('Route')).toHaveLength(3);
    });

    it('renders Droppable component', () => {
      expect(component.find('Droppable')).toHaveLength(1);
    });

    it('calls deleteRoute when delete button is clicked', () => {
      component.find('[data-delete]').at(0).simulate('click', {
        target: {
          hasAttribute: () => true,
          dataset: {
            delete: 1
          }
        }
      });

      expect(mockDeleteRoute).toHaveBeenCalledTimes(1);
    });

    test ('bus must have an active class', () => {
      expect(component.find("[data-mode='bus']").hasClass('route-modes__mode--active')).toBeTruthy()
    });

    it ('renders properly', () => {
      expect(component).toMatchSnapshot();
    });
  })
})
