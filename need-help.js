const JSONlist = [
    {
        "UBS A": {
            "long": 1,
            "lati": 2
        }
    }
]

var points = [
    { x: 10, y: 20 },
    { x: 12, y: 18 },
    { x: 20, y: 30 },
    { x: 5, y: 40 },
    { x: 100, y: 2 }
];






function distance(lat1, long1, lat2, long2) {
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(lat2 - lat1),
        dLng = deg2rad(long2 - long1),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(lat1))
            * Math.cos(deg2rad(lat1))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c * 1000).toFixed());
}

function getClosestPoint() {
    let closest = points.slice(1).reduce(function (min, p) {
        if (d(p) < min.d) min.point = p;
        return min;
    }, { point: points[0], d: d(points[0]) }).point;

    return closest;
}

//const latitude, longitude;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Não foi possível utilizar seu GPS');
    }
}

function findUBS() {
    console.log(distance(-3.046445, -59.965886, -3.015563,-59.967514));
}

function showPosition(position) {
    console.log(position.coords);
}