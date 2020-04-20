let latitude, longitude;
function findUBS() {
    if (latitude != null) {
        document.getElementById('register-info').classList.remove('d-none');

        fetch('https://saude-092.herokuapp.com/find/' + latitude + '/' + longitude)
            .then((response) => response.json())
            .then((responseData) => {
                document.getElementById('UBS-card').classList.add('d-block');
                document.getElementById('UBS-name').innerHTML = responseData.name;
                document.getElementById('UBS-street').innerHTML = responseData.street;

                document.getElementById('UBS-maps').onclick = () => {
                    window.open('https://www.google.com/maps/dir/' + latitude + ',' + longitude + '/' + responseData.lati + ',' + responseData.long + '/');
                }

                document.getElementById('UBS-card').classList.add('d-block');
            })
            .catch(error => console.warn(error));

    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                findUBS();
            });
        } else {
            alert('Não foi possível utilizar seu GPS');
        }
    }
}