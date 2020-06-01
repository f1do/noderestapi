import * as admin from 'firebase-admin';
import serviceAccount from "../intenta-ds-firebase-adminsdk-dlndn-4e832ac78a.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://intenta-ds.firebaseio.com",
    databaseAuthVariableOverride: null
  });
  
var db = admin.firestore();
  
export {db, admin};