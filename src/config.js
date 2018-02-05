import firebase from 'firebase';

export const appName = 'advanced-react';
export const firebaseConfig = {
    apiKey: "AIzaSyAMfoOVR1OAynQCqy1XzGWeF8N6OKWll4E",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "265586555181"
};

firebase.initializeApp(firebaseConfig);