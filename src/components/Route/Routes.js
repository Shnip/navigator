import React from 'react';
import RouteCreate from './RouteCreate';
import RouteList from './RouteList';
import { DragDropContext } from 'react-beautiful-dnd';
import Map from '../Map/Map';


export default class Routes extends React.Component {
  state = {
    routes: [],
    mode: 'auto'
  }

  yaMap = null
  multiRoute = null

  addRoute = (route) => {
    const {routes} = this.state;

    if (routes.length > 0) {
      return this.setState({ routes: [...this.state.routes, route] }, this.updateMap.bind(this, true));
    }

    this.setState({ routes: [...this.state.routes, route] }, this.createMultiRoute);
  }

  deleteRoute = (id) => {
    const new_routes = this.state.routes.filter(route => route.id !== id);

    this.setState({ routes: new_routes }, this.updateMap);
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const routes = this.reorder(
      this.state.routes,
      result.source.index,
      result.destination.index
    );

    this.setState({ routes }, this.updateMap)
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  createMultiRoute = () => {
    const {routes, mode} = this.state;
    const points = routes.map(route => route.geoObject.coordinates);
    const ymaps = window.ymaps;

    if (!ymaps) return false

    this.multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: points,
      params: {
        routingMode: mode
      }
    }, {
      boundsAutoApply: true
    });

    this.yaMap.geoObjects.add(this.multiRoute);
    this.setBalloon(points.length-1);
    this.multiRoute.editor.start();

    this.multiRoute.events.add("dragend", () => {
      this.centerMap();
    });
  }

  updateMap = (shouldsetBalloon = false) => {
    const points = this.state.routes.map(route => route.geoObject.coordinates);

    if(!this.multiRoute) return false

    this.multiRoute.model.setReferencePoints(points);

    if (points.length > 0) {
      this.multiRoute.events.once("boundschange", this.centerMap);
    }

    if (shouldsetBalloon) {
      this.setBalloon(points.length-1);
    }
  }

  setBalloon = (index) => {
    const ymaps = window.ymaps;

    this.multiRoute.model.events.once("requestsuccess", () => {
      const wayPoint = this.multiRoute.getWayPoints().get(index);

      ymaps.geoObject.addon.balloon.get(wayPoint);
      wayPoint.properties.set({
        balloonContentBody: this.state.routes[index].geoObject.balloon
      });
    });
  }

  setYaMap = (map) => {
    this.yaMap = map;
  }

  centerMap = () => {
    this.yaMap.setBounds(this.multiRoute.getBounds(), {
        checkZoomRange: true
    });
  }

  handleMode = (e) => {
    let target = e.target;
    const ul = e.currentTarget;
    while(target !== ul) {
      if (target.hasAttribute('data-mode')) {
        return this.setState({ mode: target.dataset.mode }, this.setRoutingModeToMap)
      }
      target = target.parentNode;
    }
  }

  setRoutingModeToMap = () => {
    if (!this.multiRoute) return false;

    this.multiRoute.model.setParams({
      routingMode: this.state.mode
    });
  }

  render() {
    return (
      <div className="container__content">
        <section className="routes">
          <RouteCreate addRoute={this.addRoute} />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <RouteList  routes={this.state.routes}
                        deleteRoute={this.deleteRoute}
                        handleMode={this.handleMode}
                        mode={this.state.mode} />
          </DragDropContext>
        </section>
        <section className="map">
          <Map setYaMap={this.setYaMap} />
        </section>
      </div>
    );
  }
}
