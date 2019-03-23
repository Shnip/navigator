import React, {useEffect} from 'react';


const Map = (props) => {
  const { setYaMap } = props;

  useEffect(() => {
    initialazeMap()
  }, [])

  const initialazeMap = () => {
    const ymaps = window.ymaps;

    if (!ymaps) return false

    ymaps.ready(() => {
      const yaMap = new ymaps.Map("yaMap", {
          center: [55.76, 37.64],
          zoom: 9,
          controls: ['zoomControl', 'geolocationControl', 'rulerControl']
      });
      setYaMap(yaMap);
    });
  }

  return (
    <div id="yaMap" style={{width: '100%', height: '100%'}}></div>
  );
}

export default Map;
