import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB_8CZaN3PGq-hTfxb7IXZTm5chnzlU4aQ",
    authDomain: "shopping-a4066.firebaseapp.com",
    databaseURL: "https://shopping-a4066.firebaseio.com",
    projectId: "shopping-a4066",
    storageBucket: "shopping-a4066.appspot.com",
    messagingSenderId: "274333709044",
    appId: "1:274333709044:web:361c84a05137edbd45e4a1",
    measurementId: "G-2B15J06SJR"
  };

  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    // console.log(snapshot);

    if(!snapshot.exists){
      const {displayName,email} = userAuth;
      const createAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user',error.message);
      }
    }

    return userRef;
    // console.log(firestore.doc('users/1283635dddff'));
  }

  firebase.initializeApp(config);
  // firebase.analytics();
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;