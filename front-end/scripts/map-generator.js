var geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                'iconSize': [60, 60]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-59.979644, -3.043429]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Bar',
                'iconSize': [50, 50]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-61.2158203125, -15.97189158092897]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Baz',
                'iconSize': [40, 40]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-63.29223632812499, -18.28151823530889]
            }
        }
    ]
};


mapboxgl.accessToken = 'pk.eyJ1IjoibmtrZiIsImEiOiJjazh3Y2hobG8wY3ZyM21tYzhicmhrMWUwIn0.3cjU2oLpJJbcVisCDiKFzg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-59.9653054, -3.0631661], // starting position
    zoom: 11, // starting zoom
    maxZoom: 12,
    minZoom: 11 ,
    maxBounds: [
        [-60.2653054, -3.1631661], // Southwest coordinates
        [-59.6653054, -2.9631661] // Northeast coordinates
    ]
});

geojson.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage =
        'url(https://placekitten.com/g/' +
        marker.properties.iconSize.join('/') +
        '/)';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    el.addEventListener('click', function () {
        window.alert(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});