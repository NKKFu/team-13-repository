const database = firebase.database();

function closeLoginPage() {
    document.getElementById('nonlogged_page').classList.add('d-none');
    document.getElementById('logged_page').classList.remove('d-none');
}

const patientList = document.getElementById('patient-list');



const newPatientListDatabase = firebase.database().ref('new-patient-list/');
const patientListDatabase = firebase.database().ref('patient-list/');

// When adds a new child
newPatientListDatabase.on('child_added', function (childSnapshot, prevChildKey) {
    const id = childSnapshot.key;
    const risk = childSnapshot.val().risk;
    const name = childSnapshot.val().name;
    const age = childSnapshot.val().age;
    const marks = childSnapshot.val().marks;
    const number = childSnapshot.val().number;

    const newPatient = firebase.database().ref('patient-list/' + id);
    newPatient.set({
        risk,
        name,
        age,
        marks,
        number
    }).then(function () {
        firebase.database().ref('new-patient-list/' + childSnapshot.key).remove()
            .then(function () {
                console.log("Remove succeeded.")
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message)
            });
    }).catch(function (error) {
        console.log('Synchronization failed');
    });
});

function loadPatients() {
    firebase.database().ref('patient-list/').once('value', function (snapshot) {
        console.log(snapshot.val());
    });

    // Ir no banco de dados
    // Fazer um foreach
    // Adicionar ao patient-list
}

function renderPatient(id, name, age) {
    // Pegar do banco de dados o item novo
    // Adicionar ao patient-list
}