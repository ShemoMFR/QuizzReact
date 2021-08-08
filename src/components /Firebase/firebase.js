import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyCKlBNjGqSJ9QrpZKgbG92uA19VTumh9Ss",
    authDomain: "marvelquizz-4257a.firebaseapp.com",
    projectId: "marvelquizz-4257a",
    storageBucket: "marvelquizz-4257a.appspot.com",
    messagingSenderId: "64898480622",
    appId: "1:64898480622:web:c1fd1cad649f95bebbb6ff"
  };

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
};

export default Firebase;