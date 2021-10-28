import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB6-zXGgkr8dsI7CvhWg7bdyaP-Qc3mgrs",
  authDomain: "imagiruleta.firebaseapp.com",
  projectId: "imagiruleta",
  storageBucket: "imagiruleta.appspot.com",
  messagingSenderId: "692875033431",
  appId: "1:692875033431:web:3db8f900cb74cdacc29c12"
};

// Initialize Firebase
var Firebase = firebase.default.initializeApp(firebaseConfig);

export default Firebase;