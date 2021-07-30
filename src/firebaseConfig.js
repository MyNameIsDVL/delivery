import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA8vk-2nl2Nsw4t_yHRDFxbYGFdoFLhkas",
    authDomain: "deliveryfoodapp-62868.firebaseapp.com",
    databaseURL: "https://deliveryfoodapp-62868-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "deliveryfoodapp-62868",
    storageBucket: "deliveryfoodapp-62868.appspot.com",
    appId: ""
};

const fireB = firebase.initializeApp(firebaseConfig);

const auth = fireB.auth();
const db = fireB.firestore();
const storage = fireB.storage();
const rdb = fireB.database();

export default fireB;
export { auth, db, storage, rdb };