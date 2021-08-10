import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
      this.db = app.firestore();
    };

    /* On met le return car comme y a les accolades, la fonction est considérée
    sur plusieurs lignes donc faut obligatoirement un return.
    D'autant que on doit récupérer les messages d'erreurs */

    // Inscritpion 
    signupUser = (email, password) => {
      return this.auth.createUserWithEmailAndPassword(email, password);
    };

    // connexion

    loginUser = (email, password) => {
      return this.auth.signInWithEmailAndPassword(email, password);
    };

    // déconnexion

    signoutUser = () => {
      return this.auth.signOut();
    };

    // Récupérer MDP

    passwordReset = (email) => {
      return this.auth.sendPasswordResetEmail(email);
    };

    // Méthode pour envoyer des users à la collection "users"

    user = (uid) => {
      return this.db.doc(`users/${uid}`)
    };

  
  };

  export default Firebase;
