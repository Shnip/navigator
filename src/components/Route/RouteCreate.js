import React from 'react';
import PropTypes from 'prop-types';
import Route from './routeFactory';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class RouteCreate extends React.Component {
  state = {
    route: ''
  }

  componentDidMount() {
    this.createYaSearch()
  }

  createYaSearch = () => {
    const ymaps = window.ymaps;

    if (!ymaps) return false;

    ymaps.ready(() => {
      const suggestView = new ymaps.SuggestView(
        'route__input',
        {
            results: '5',
            provider: 'yandex#map',
        }
      );

      suggestView.events.add('select', (e) => {
        const selected = e.get('item').value;
        if (this.state.route !== selected) {
          this.setState({route: selected});
        }
      })
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    let {route} = this.state;
    if (!route.trim()) return this.createNotification('error', 'Route is empty');

    let points = [];

    await this.geocode(route)
              .then(res => points = res.geoObjects.toArray())
              .catch(e => console.log(e))

    if (points.length === 0) return this.createNotification('error', 'Sorry, we can\'t find the address');

    const isCoordinates = route.match(/\d+\.?\d*,?\s?\d+\.?\d*/gi);
    if (isCoordinates) route = points[0].properties.get('text');

    const geoObject = Object.assign({},
      {coordinates: points[0].geometry.getCoordinates()},
      {balloon: points[0].properties.get('balloonContent')}
    );

    this.props.addRoute(new Route(route, geoObject));
    this.setState({route: ''});
  }

  geocode = (route) => {
    const ymaps = window.ymaps;
    if (!ymaps) return false

    return ymaps.geocode(route, {
      json: false,
      provider: 'yandex#map',
      results: 1
    })
  }

  createNotification = (type, message) => {
    switch (type) {
      case 'error':
        NotificationManager.error('Sorry, we can\'t find the address', 'Error', 6000);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <NotificationContainer/>
        <div className="routes__create">
          <h2 className="title title--white routes__title">
            <span className="text-bold">Create</span>
            &nbsp;
            <span className="text-thin">Route</span>
          </h2>
          <form name="routes__form" className="form routes__form" onSubmit={this.onSubmit}>
            <div className="form__input-group">
              <input type="text"
                     id="route__input"
                     className="form__input"
                     value={this.state.route}
                     placeholder="Москва, метро Арбатская или 55.753595 37.621031"
                     onChange={e => this.setState({route: e.target.value})}
                     />
              <button className="btn btn--light-theme">Add</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

RouteCreate.propTypes = {
  addRoute: PropTypes.func.isRequired
}

export default RouteCreate;
