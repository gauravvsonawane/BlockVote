import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBanMCs4KtzC3fBjdQ-TCspNsBwneeBMnU",
    authDomain: "blockvote-88a9d.firebaseapp.com",
    projectId: "blockvote-88a9d",
    storageBucket: "blockvote-88a9d.appspot.com",
    messagingSenderId: "242483725955",
    appId: "1:242483725955:web:2356151bdd76d7702f7db6",
    measurementId: "G-9R4GG8LX2T"
  };
  
firebase.initializeApp(firebaseConfig);
export default firebase;