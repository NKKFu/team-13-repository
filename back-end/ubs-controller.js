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

function getClosestPoint(lat, long) {
    const objectList = require('./ubs-list.js').JSONlist;
    let closestPoint;

    let smallestDistance = 100000;
    for (let i = 0; i < objectList.listOfUbs.length; i++) {
        const element = objectList.listOfUbs[i];
        const elementDistance = parseInt(distance(element.lati, element.long, lat, long));

        if (elementDistance < smallestDistance) {
            closestPoint = element;
            smallestDistance = elementDistance;
        }
    }
    return closestPoint;
}

module.exports = { getClosestPoint };