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
    const objectList = JSONlist;
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

let latitude, longitude;
function getLocation() {
    getLocation();
}

function findUBS() {
    const name = document.getElementById('user_name').value;
    const number = document.getElementById('user_number').value;
    const age = document.getElementById('user_age').value;
    const isGroup = document.getElementById('customControlValidation2').checked;

    const isNotValid = (name == '') || (number == '') || (age == '');
    
    if (isNotValid) {
        document.getElementById('alert-button').classList.remove('d-none');
        return;
    }

    if (latitude != null) {
        document.getElementById('register-form').classList.add('d-none');
        document.getElementById('register-info').classList.remove('d-none');

        const CURRENT_UBS = getClosestPoint(latitude, longitude);
        document.getElementById('UBS-card').classList.add('d-block');
        document.getElementById('UBS-name').innerHTML = CURRENT_UBS.name;
        document.getElementById('UBS-street').innerHTML = CURRENT_UBS.street;

        document.getElementById('UBS-maps').onclick = () => {
            window.open('https://www.google.com/maps/dir/' + latitude + ',' + longitude + '/' + CURRENT_UBS.lati + ',' + CURRENT_UBS.long + '/');
        }

    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                findUBS();
            });
        } else {
            alert('N�o foi poss�vel utilizar seu GPS');
        }
    }
}