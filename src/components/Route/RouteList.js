import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Route from './Route';
import { FaBus, FaWalking, FaBicycle, FaCar } from 'react-icons/fa'
import classnames from 'classnames';

const RouteList = (props) => {
  const {routes, deleteRoute, handleMode, mode} = props;

  const handleDelete = (e) => {
    let target = e.target;
    const ul = e.currentTarget;

    while (target !== ul) {
      if (target.hasAttribute('data-delete')) {
        const id = target.dataset.delete;

        return deleteRoute(id)
      }

      target = target.parentNode;
    }
  }

  return (
    <section className="routes__list-wrapper">
      <h2 className="title routes__list-title">
        <span className="text-bold">Route</span>
        &nbsp;
        <span className="text-thin">List</span>
      </h2>

      <section className="routes__modes">
        <ul className="list route-modes" onClick={handleMode}>
          <li className={
            classnames("route-modes__mode",
                      {"route-modes__mode--active": mode === "auto"}
            )}
              data-mode="auto">
            <FaCar />
          </li>
          <li className={
            classnames("route-modes__mode",
                      {"route-modes__mode--active": mode === "bus"})}
              data-mode="bus">
            <FaBus />
          </li>
          <li className={
            classnames("route-modes__mode",
              {"route-modes__mode--active": mode === "pedestrian"})}
              data-mode="pedestrian">
            <FaWalking />
          </li>
          <li className={
            classnames("route-modes__mode",
                  {"route-modes__mode--active": mode === "bicycle"}
              )}
              data-mode="bicycle">
            <FaBicycle />
          </li>
        </ul>
      </section>

      {
        routes && routes.length > 0 ?
          <Droppable droppableId="1">
            {
              (provided, snapshot) => {
                return (
                  <ul className="list routes__list"
                      onClick={handleDelete}
                      ref={provided.innerRef}
                      style={{ backgroundColor: snapshot.isDraggingOver ? '#8bf1c4' : '' }}
                      {...provided.droppableProps}>
                    {
                      routes.map((route, index) => (
                        <Route route={route} index={index} key={route.id}/>
                      ))
                    }
                    {provided.placeholder}
                </ul>
                )
              }
            }
          </Droppable>
        :
        <span className="routes__empty">There are no routes yet</span>
      }
    </section>
  );
}

RouteList.propTypes = {
  routes: PropTypes.array,
  mode: PropTypes.string.isRequired,
  deleteRoute: PropTypes.func.isRequired,
  handleMode: PropTypes.func.isRequired,
};

export default RouteList;
