import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBMj3AnGQf1OZzRQRyby8o8ganatxcdTmU",
    authDomain: "course-crwn-clothing.firebaseapp.com",
    databaseURL: "https://course-crwn-clothing.firebaseio.com",
    projectId: "course-crwn-clothing",
    storageBucket: "course-crwn-clothing.appspot.com",
    messagingSenderId: "1081649969918",
    appId: "1:1081649969918:web:7d8b8074ce357786aec3af",
    measurementId: "G-Q69SNFE18D"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;