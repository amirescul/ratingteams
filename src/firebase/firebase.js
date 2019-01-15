
import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyCGYz-3ZuN1ERiOF-rfYGFpRnWtCRiUaxY",
    authDomain: "ratingteams.firebaseapp.com",
    databaseURL: "https://ratingteams.firebaseio.com",
    projectId: "ratingteams",
    storageBucket: "ratingteams.appspot.com",
    messagingSenderId: "956470703373"
  };
 
  export const fire = firebase.initializeApp(config);
  
  
  const database = firebase.database();
 
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth(); 
  console.log('firebase auth', auth);  
  export { firebase, database as default };

