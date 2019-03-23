import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { IoIosClose as Delete } from 'react-icons/io';


const Route = (props) => {
  const { route, index } = props;
  return (
    <Draggable draggableId={route.id} index={index}>
      {
        (provided, snapshot) => (
          <li className="routes__item list__item"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps} >
            <span className="list__body">{route.value}</span>
            <span data-delete={route.id}>
              <Delete className="routes__icon" size="1.5rem" />
            </span>
          </li>
        )
      }
    </Draggable>
  );
}

Route.propTypes = {
  route: PropTypes.object.isRequired
};

export default Route;
