import * as admin from 'firebase-admin';
import serviceAccount from "../intenta-c06ab-firebase-adminsdk-8yunu-a9d08389f7.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://intenta-c06ab.firebaseio.com",
    databaseAuthVariableOverride: null
  });
  
var db = admin.firestore();
  
export {db, admin};