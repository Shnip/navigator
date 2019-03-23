const uuid = require('uuidv4');

class Route {
  constructor(value, geoObject) {
    this.id = uuid()
    this.value = value
    this.geoObject = geoObject
  }
}

export default Route;
