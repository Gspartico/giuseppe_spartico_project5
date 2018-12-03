import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCms6TkW6dW_lJE-w08Uz3_NoBqQtoIcl4",
    authDomain: "videotape-vagrancy.firebaseapp.com",
    databaseURL: "https://videotape-vagrancy.firebaseio.com",
    projectId: "videotape-vagrancy",
    storageBucket: "videotape-vagrancy.appspot.com",
    messagingSenderId: "1006306575749"
};
firebase.initializeApp(config);

export default firebase;