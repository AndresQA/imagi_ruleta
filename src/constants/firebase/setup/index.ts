import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDO2MfPCJm8GCQ7BLXZR4gecXnZ3CHkbMY",
    authDomain: "firebasssss.firebaseapp.com",
    databaseURL: "https://firebasssss.firebaseio.com",
    projectId: "firebasssss",
    storageBucket: "firebasssss.appspot.com",
    messagingSenderId: "473311544698",
    appId: "1:473311544698:web:c6c8b970557ff121d982c3"
  };

// Initialize Firebase
var Firebase = firebase.default.initializeApp(firebaseConfig);

export default Firebase;