import firebase from "firebase/app";
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "your - key",
  authDomain: "web-fx-da8ba.firebaseio.com/",
  databaseURL: "https://web-fx-da8ba-default-rtdb.firebaseio.com/",
  projectId: "web-fx-da8ba",
  storageBucket: "https://web-fx-da8ba.com/",
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;