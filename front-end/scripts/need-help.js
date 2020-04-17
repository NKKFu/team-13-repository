let latitude, longitude;
function findUBS() {
    const name = document.getElementById('user_name').value;
    const number = document.getElementById('user_number').value;
    const age = document.getElementById('user_age').value;
    const isGroup = document.getElementById('customControlValidation2').checked;

    const isNotValid = (name == '') || (number == '') || (age == '');

    /* Validação de dados */
    if (isNotValid) {
        document.getElementById('alert-button').classList.remove('d-none');
        return;
    }

    if (latitude != null) {
        document.getElementById('register-form').classList.add('d-none');
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

        // É grupo de risco?
        if (isGroup) {
            document.getElementById('risk-group-info').classList.remove('d-none');
        }

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