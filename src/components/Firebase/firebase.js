import app from 'firebase/app';
import 'firebase/auth';

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
      this.auth = app.auth();
    };

    /* On met le return car comme y a les accolades, la fonction est considérée
    sur plusieurs lignes donc faut obligatoirement un return.
    D'autant que on doit récupérer les messages d'erreurs */

    signupUser = (email, password) => {
      return this.auth.createUserWithEmailAndPassword(email, password);
    };

    loginUser = (email, password) => {
      return this.auth.signInWithEmailAndPassword(email, password);
    };

    signoutUser = () => {
      return this.auth.signOut();
    };
  
  };

  export default Firebase;
