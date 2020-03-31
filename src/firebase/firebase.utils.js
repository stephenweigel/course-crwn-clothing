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


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (err) {
            console.log('error creating user: ', err.message);
        }
    }

    return userRef;
};



firebase.initializeApp(config);


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit()


};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;