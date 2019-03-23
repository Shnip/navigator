import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Route from '../components/Route/Route';

describe('test Route component', () => {
  const onDragEndMock = jest.fn();

  const props = {
    route: {id: 1, value: 'Moscow'},
    index: 0
  }

  const component = mount(
    <DragDropContext onDragEnd={onDragEndMock}>
      <Droppable droppableId="1">
        {
          (provided, snapshot) =>
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Route {...props} />
            </ul>
        }
      </Droppable>
    </DragDropContext>
  );

  it('renders Draggable', () => {
    expect(component.find('Draggable')).toHaveLength(1);
  });

  it('renders li', () => {
    expect(component.find('.routes__item')).toHaveLength(1);
  });

  it('renders Delete', () => {
    expect(component.find('IoIosClose')).toHaveLength(1);
  });

  it ('renders properly', () => {
    expect(component).toMatchSnapshot();
  });
})
