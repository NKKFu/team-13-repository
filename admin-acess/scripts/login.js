
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCbwy-skAkBeb6Afuuqn4x9VxZXUDQGakE",
    authDomain: "saude-092.firebaseapp.com",
    databaseURL: "https://saude-092.firebaseio.com",
    projectId: "saude-092",
    storageBucket: "saude-092.appspot.com",
    messagingSenderId: "399265689265",
    appId: "1:399265689265:web:59a54329653243925ffc90",
    measurementId: "G-WDHLXWJV78"
};

firebase.initializeApp(firebaseConfig);

function login() {
    const userEmail = document.getElementById('email_field').value;
    const userPass = document.getElementById('password_field').value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode + ' : ' + errorMessage);

        alert('Falha ao tentar realizar o login.');
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        closeLoginPage();
        userProfile = user;

        user.providerData.forEach(function (profile) {
            localStorage.setItem("email", profile.email);
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
        document.getElementById('myName').innerHTML = userProfile.email.substring(0, userProfile.email.lastIndexOf("@")).toUpperCase();

        console.log('Login success');
    } else {
        // User is signed out.
        // ...
        console.log('Logout success');
    }
});


function logout() {
    firebase.auth().signOut();
}