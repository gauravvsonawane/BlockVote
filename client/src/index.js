import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBanMCs4KtzC3fBjdQ-TCspNsBwneeBMnU",
  authDomain: "blockvote-88a9d.firebaseapp.com",
  projectId: "blockvote-88a9d",
  storageBucket: "blockvote-88a9d.appspot.com",
  messagingSenderId: "242483725955",
  appId: "1:242483725955:web:2356151bdd76d7702f7db6",
  measurementId: "G-9R4GG8LX2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
